import Splitting from 'splitting';
import { useEffect } from 'react';
import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';
const Visual = () => {
    useEffect(() => {
        Splitting();

        const root = document.querySelector('#hotel_visual .headline');
        if (!root) return;

        const colorEl = root.querySelector('.color');
        const chars = root.querySelectorAll('.char');
        if (!colorEl || !chars.length) return;

        // 가장 늦게 끝나는 char 찾기 (delay + duration이 가장 큰 것)
        let lastChar = null;
        let maxEnd = -1;
        chars.forEach((ch) => {
            const cs = getComputedStyle(ch);
            const delay = parseFloat(cs.animationDelay || '0');
            const dur = parseFloat(cs.animationDuration || '0');
            const endTime = delay + dur;
            if (endTime > maxEnd) {
                maxEnd = endTime;
                lastChar = ch;
            }
        });

        const onEnd = () => {
            colorEl.classList.add('show-dots');
        };

        if (lastChar) {
            lastChar.addEventListener('animationend', onEnd, { once: true });
        } else {
            // 폴백(안전장치)
            setTimeout(onEnd, 1200);
        }
    }, []);
    return (
        <section id="hotel_visual">
            <div data-splitting className="headline">
                나 오늘 <span className="color">호강</span>했개!
            </div>
            <span className="sub">강아지에게 최고의 하루를 선물하는 공간, 호강스</span>
        </section>
    );
};

export default Visual;
