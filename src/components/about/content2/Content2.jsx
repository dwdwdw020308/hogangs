import React, { useLayoutEffect, useRef, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Content2 = () => {
  const rootRef = useRef(null);

  // AOS 초기화
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out', once: false, offset: 0 });
    AOS.refresh();
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // 1) .textline 수집
    const lines = Array.from(root.querySelectorAll('.texttitle .textline'));

    // 유틸: 배열 셔플 (랜덤 스태거용)
    const shuffle = (arr) => {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };

    // 2) 단어 분할
    lines.forEach((line) => {
      if (line.dataset.split === 'done') return;

      const original = line.textContent; // 공백 보존
      line.setAttribute('aria-label', original);
      line.textContent = '';

      const tokens = original.split(/(\s+)/); // ["안녕","   ","세상"]

      const wordIndices = tokens
        .map((t, i) => ({ i, t }))
        .filter((x) => x.t.trim() !== '');

      const order = shuffle(wordIndices.map((_, idx) => idx));
      let wordCounter = 0;

      tokens.forEach((tok) => {
        if (tok.trim() === '') {
          const nbsp = '\u00A0'.repeat(tok.length);
          line.appendChild(document.createTextNode(nbsp));
        } else {
          const span = document.createElement('span');
          span.className = 'word';
          span.style.setProperty('--i', String(order[wordCounter] ?? 0));
          span.textContent = tok;
          line.appendChild(span);
          wordCounter += 1;
        }
      });

      line.dataset.split = 'done';
    });

    // 3) IntersectionObserver로 is-in 토글 (모바일 안정)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.classList.add('is-in');
          } else {
            el.classList.remove('is-in');
          }
        });
      },
      {
        root: null,
        // 아래쪽 여유 조금 줘서 살짝 일찍 발동
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.01,
      }
    );

    lines.forEach((el) => io.observe(el));

    // 4) 혹시 IO가 늦게 붙거나 초기에 이미 화면 안인 케이스 강제 처리
    //    (일부 브라우저/웹뷰에서 첫 콜백 늦게 오는 경우 대비)
    setTimeout(() => {
      lines.forEach((el) => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        if (r.top < vh && r.bottom > 0) el.classList.add('is-in');
      });
    }, 100);

    return () => {
      io.disconnect();
    };
  }, []);

  return (
    <section id="content2" ref={rootRef}>
      <div className="slogan">
        <img src="/about/TitleBox.png" alt="" />
        <span
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="2000"
          data-aos-easing="ease-out"
        >
          HOGANGS
        </span>
        <h3
          data-aos="fade-up"
          data-aos-delay="600"
          data-aos-duration="2000"
          data-aos-easing="ease-out"
        >
          Brandstory
        </h3>
      </div>

      <ul className="texttitle">
        <li className="textline">
          호강스는 ‘반려견도 가족이다’ 라는 마음으로 시작되었습니다.
        </li>
        <li className="textline">
          우리 아이가 집처럼 편안하게 머물고, 보호자가 안심할 수 있는 공간을 만들고자 합니다.
        </li>
        <li className="textline">
          맞춤형 호텔 서비스와 전문적인 미용을 통해 단순한 돌봄이 아닌 특별한 경험을 제공합니다.
        </li>
        <li className="textline">
          작은 발자국 하나에도 행복이 묻어나는 순간, 호강스는 반려견과 보호자가 함께하는 모든 시간을
          더욱 특별하게 만듭니다.
        </li>
      </ul>

      <div className="dogicon">
        <span data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
          <img src="/about/01.png" alt="" />
        </span>
        <span data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800">
          <img src="/about/02.png" alt="" />
        </span>
        <span data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1000">
          <img src="/about/03.png" alt="" />
        </span>
      </div>
    </section>
  );
};

export default Content2;
