import { useRef, useEffect, useMemo } from 'react';

/**
 * BubbleCanvas
 * - 색/크기/흔들림/하이라이트 + "가장자리 페더(Feather)"로 자연스러운 림 처리
 */
export default function BubbleCanvas({
    // 렌더 타입/수/속도
    variant = 'glossy',
    count = 12,
    speed = 0.4,
    zIndex = 1,
    style = {},

    // 색상 (민트 파스텔 기본값)
    baseHue = 174,
    hueSpread = 6,
    sat = 28,
    light = 94,
    rimSat = 26,
    rimLight = 88,
    ringHueShift = 4,
    ringHueSpread = 12,
    ringsBlend = 'normal',
    ringAlpha = 0.16,
    outlineAlpha = 0.035,

    // 크기
    smallMin = 62,
    smallMax = 78,
    bigMin = 90,
    bigMax = 120,
    bigRatio = 0.18,
    scale = 1.0,
    responsive = true,
    baseWidth = 1440,

    // 흔들림(진폭/속도/표류)
    wobbleAmpScale = 1.0,
    wobbleFreqScale = 1.0,
    driftXScale = 1.0,

    // (옵션) 캡 하이라이트(윗부분만 살짝 밝게)
    capEnabled = false,
    capAngleDeg = 135,
    capWidthDeg = 70,
    capOuter = 1.04,
    capInner = 0.7,
    capAlpha = 0.45,
    capBlend = 'screen',

    // ★ 가장자리 자연스러움(페더) 옵션
    edgeFeather = 0.12, // 페더 폭 비율(반지름 대비), 0.08~0.18 추천
    edgeFeatherAlpha = 0.55, // 페더 강도, 0.35~0.7
    edgeElliptic = 0.06, // (클로저 버전에서는 미사용)
    edgeRotateDeg = 25, // (클로저 버전에서는 미사용)
    edgeJitter = 0.03, // (클로저 버전에서는 미사용)
}) {
    const canvasRef = useRef(null);
    const rafRef = useRef(null);

    const dpr = useMemo(
        () => (typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1),
        []
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });

        const fit = () => {
            const { clientWidth, clientHeight } = canvas;
            canvas.width = Math.floor(clientWidth * dpr);
            canvas.height = Math.floor(clientHeight * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        if (!canvas.style.width) {
            canvas.style.width = '100%';
            canvas.style.height = '100%';
        }
        fit();

        let w = canvas.clientWidth;
        let h = canvas.clientHeight;

        const autoScale = responsive ? clamp(w / baseWidth, 0.6, 1.25) : 1.0;
        const R_SCALE = scale * autoScale;

        // ★ 클로저로 props 캡처한 버전의 가장자리 페더 함수
        const applyEdgeFeather = (ctx, b) => {
            if (!edgeFeather || edgeFeather <= 0) return;

            ctx.save();
            ctx.globalCompositeOperation = 'destination-out';

            // 페더 시작/끝 반지름
            const featherStart = b.r * (1 - edgeFeather);
            const featherEnd = b.r;

            // 방사형 그라데이션 (안쪽은 영향 없음 → 바깥으로 갈수록 강하게 지움)
            const gradient = ctx.createRadialGradient(b.x, b.y, featherStart, b.x, b.y, featherEnd);
            gradient.addColorStop(0, `rgba(0,0,0,0)`); // 내부: 그대로 유지
            gradient.addColorStop(1, `rgba(0,0,0,${edgeFeatherAlpha})`); // 가장자리: 가장 많이 지움

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(b.x, b.y, featherEnd, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        };

        class Bubble {
            constructor() {
                this.reset(true);
            }
            reset(initial = false) {
                this.x = Math.random() * w;
                this.y = initial ? h + Math.random() * h : h + 20 + Math.random() * 60;

                const isBig = Math.random() < bigRatio;
                const baseR = isBig ? rand(bigMin, bigMax) : rand(smallMin, smallMax);
                this.r = baseR * R_SCALE;

                this.vy = rand(0.2, 0.7) * speed;
                this.vx = rand(-0.2, 0.2) * speed * driftXScale;

                this.opacity = rand(0.25, 0.55);

                this.wobbleAmp = rand(4, 14) * wobbleAmpScale;
                this.wobbleFreq = rand(0.25, 0.7);
                this.phase = Math.random() * Math.PI * 2;

                this.hue = wrapHue(rand(baseHue - hueSpread, baseHue + hueSpread));
            }

            update(dt) {
                this.y -= this.vy * dt;
                this.x += (Math.sin(this.phase) * this.wobbleAmp * 0.02 + this.vx) * dt;
                this.phase += this.wobbleFreq * 0.02 * wobbleFreqScale * dt;

                if (this.y + this.r < -10) this.reset();
                if (this.x < -this.r) this.x = w + this.r;
                if (this.x > w + this.r) this.x = -this.r;
            }

            draw(ctx) {
                if (variant === 'simple') drawSimple(ctx, this);
                else drawGlossy(ctx, this);
            }
        }

        const bubbles = Array.from({ length: count }, () => new Bubble());

        function drawSimple(ctx, b) {
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${b.hue}, ${sat}%, ${light}%, ${b.opacity})`;
            ctx.fill();
            // ★ 클로저 버전 페더 적용
            applyEdgeFeather(ctx, b);
        }

        function drawGlossy(ctx, b) {
            // 1) 본체 코어
            const core = ctx.createRadialGradient(
                b.x - b.r * 0.28,
                b.y - b.r * 0.36,
                b.r * 0.05,
                b.x,
                b.y,
                b.r
            );
            core.addColorStop(0.0, `hsla(0,0%,100%,${0.35 * b.opacity})`);
            core.addColorStop(
                0.35,
                `hsla(${b.hue}, ${Math.max(20, sat - 8)}%, ${Math.min(96, light + 2)}%, ${
                    0.16 * b.opacity
                })`
            );
            core.addColorStop(
                0.65,
                `hsla(${b.hue}, ${Math.max(18, sat - 10)}%, ${Math.max(70, light - 8)}%, ${
                    0.08 * b.opacity
                })`
            );
            core.addColorStop(1.0, `rgba(255,255,255,0)`);
            ctx.fillStyle = core;
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
            ctx.fill();

            // 2) 하얀 림 (안쪽 0 → 바깥쪽 흰색) - 수정
            ctx.save();

            const rimLW = Math.max(0.5, b.r * 0.03); // 얇은 두께
            ctx.lineWidth = rimLW;

            // 방사형 그라데이션: 안쪽은 항상 투명(0), 바깥은 더 강한 흰색
            const rimGrad = ctx.createRadialGradient(
                b.x,
                b.y,
                b.r - rimLW, // 시작 반지름
                b.x,
                b.y,
                b.r // 끝 반지름
            );
            rimGrad.addColorStop(0, `hsla(0,0%,100%,0)`); // 중심: 무조건 알파 0
            rimGrad.addColorStop(1, `hsla(0,0%,100%,${0.55 * b.opacity})`); // 바깥: 흰색, 좀 더 강한 알파

            ctx.strokeStyle = rimGrad;

            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r - rimLW * 0.5, 0, Math.PI * 2);
            ctx.stroke();

            ctx.restore();
            ////////////////////////////////////////////

            // 4) 컬러 링(은은)
            ctx.save();
            if (ringsBlend !== 'normal') ctx.globalCompositeOperation = ringsBlend;
            const ringCount = 3;
            for (let i = 0; i < ringCount; i++) {
                const t = i / (ringCount - 1 || 1);
                const hue = wrapHue(b.hue + ringHueShift + ringHueSpread * t);
                const lw = Math.max(0.6, b.r * (0.025 + 0.01 * i));
                ctx.lineWidth = lw;
                ctx.strokeStyle = `hsla(${hue}, ${rimSat}%, ${rimLight - i * 6}%, ${
                    ringAlpha * b.opacity
                })`;
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r - lw * (1.2 + i * 0.5), 0, Math.PI * 2);
                ctx.stroke();
            }
            ctx.restore();

            // 5) 포인트 하이라이트
            const hl1x = b.x - b.r * 0.34,
                hl1y = b.y - b.r * 0.44,
                hl1r = Math.max(1.2, b.r * 0.18);
            const hl1 = ctx.createRadialGradient(hl1x, hl1y, 0, hl1x, hl1y, hl1r);
            hl1.addColorStop(0, `rgba(255,255,255,${0.9 * b.opacity})`);
            hl1.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = hl1;
            ctx.beginPath();
            ctx.arc(hl1x, hl1y, hl1r, 0, Math.PI * 2);
            ctx.fill();

            const hl2x = b.x + b.r * 0.18,
                hl2y = b.y + b.r * 0.05,
                hl2r = Math.max(0.8, b.r * 0.1);
            const hl2 = ctx.createRadialGradient(hl2x, hl2y, 0, hl2x, hl2y, hl2r);
            hl2.addColorStop(0, `rgba(255,255,255,${0.55 * b.opacity})`);
            hl2.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = hl2;
            ctx.beginPath();
            ctx.arc(hl2x, hl2y, hl2r, 0, Math.PI * 2);
            ctx.fill();

            // 6) (옵션) 캡 하이라이트
            if (capEnabled) {
                drawCapHighlight(ctx, b, {
                    angleDeg: capAngleDeg,
                    widthDeg: capWidthDeg,
                    rOuter: b.r * capOuter,
                    rInner: b.r * capInner,
                    alpha: capAlpha * b.opacity,
                    blend: capBlend,
                });
            }

            // 7) ★ 클로저 버전 페더 적용
            applyEdgeFeather(ctx, b);
        }

        // 루프
        let last = performance.now();
        const loop = (now) => {
            const dt = Math.min(50, now - last);
            last = now;
            ctx.clearRect(0, 0, w, h);
            for (let i = 0; i < bubbles.length; i++) {
                const b = bubbles[i];
                b.update(dt);
                b.draw(ctx);
            }
            rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);

        const onResize = () => {
            w = canvas.clientWidth;
            h = canvas.clientHeight;
            fit();
        };
        const ro = new ResizeObserver(onResize);
        ro.observe(canvas);

        return () => {
            cancelAnimationFrame(rafRef.current);
            ro.disconnect();
        };
    }, [
        variant,
        count,
        speed,
        dpr,
        baseHue,
        hueSpread,
        sat,
        light,
        rimSat,
        rimLight,
        ringHueShift,
        ringHueSpread,
        ringsBlend,
        ringAlpha,
        outlineAlpha,
        smallMin,
        smallMax,
        bigMin,
        bigMax,
        bigRatio,
        scale,
        responsive,
        baseWidth,
        wobbleAmpScale,
        wobbleFreqScale,
        driftXScale,
        capEnabled,
        capAngleDeg,
        capWidthDeg,
        capOuter,
        capInner,
        capAlpha,
        capBlend,
        edgeFeather,
        edgeFeatherAlpha,
        edgeElliptic,
        edgeRotateDeg,
        edgeJitter,
    ]);

    return (
        <canvas
            ref={canvasRef}
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex, ...style }}
        />
    );
}

/* ===== Helpers ===== */
function rand(min, max) {
    const lo = Math.min(min, max);
    const hi = Math.max(min, max);
    return Math.random() * (hi - lo) + lo;
}
function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
}
function wrapHue(h) {
    let x = h % 360;
    if (x < 0) x += 360;
    return x;
}

/** 부분 섹터 그라데이션(옵션) */
function drawCapHighlight(ctx, b, { angleDeg, widthDeg, rOuter, rInner, alpha, blend }) {
    const angCenter = (angleDeg * Math.PI) / 180;
    const half = (widthDeg * Math.PI) / 180 / 2;
    const a1 = angCenter - half;
    const a2 = angCenter + half;

    ctx.save();
    if (blend && blend !== 'normal') ctx.globalCompositeOperation = blend;

    ctx.beginPath();
    ctx.arc(b.x, b.y, rOuter, a1, a2, false);
    ctx.arc(b.x, b.y, rInner, a2, a1, true);
    ctx.closePath();

    const x1 = b.x + Math.cos(angCenter) * rOuter;
    const y1 = b.y + Math.sin(angCenter) * rOuter;
    const x2 = b.x + Math.cos(angCenter) * rInner;
    const y2 = b.y + Math.sin(angCenter) * rInner;

    const g = ctx.createLinearGradient(x1, y1, x2, y2);
    g.addColorStop(0.0, `rgba(255,255,255,${alpha})`);
    g.addColorStop(1.0, `rgba(255,255,255,0)`);
    ctx.fillStyle = g;
    ctx.fill();

    ctx.restore();
}
