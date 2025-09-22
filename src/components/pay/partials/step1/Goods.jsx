import { format, isValid, parse } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { TotalPrice } from '../../../../utils/Calc';
const getWeekDay = (value) => {
    if (!value) return '';
    const d = value instanceof Date ? value : parse(String(value), 'yyyy-MM-dd', new Date()); // 로컬 자정

    if (!isValid(d)) return '';
    return format(d, 'EEE', { locale: ko }); // '금', '토' ...
};
const toKoMeridiem24h = (time) => {
    if (time == null) return '';
    const m = String(time).match(/^\s*(\d{1,2})\s*:?\s*(\d{0,2})\s*$/);
    if (!m) return '';
    let h = Number(m[1]);
    let min = m[2] ? Number(m[2]) : 0;

    h = ((h % 24) + 24) % 24; // 24시 이상/음수 방어
    min = Math.min(Math.max(min, 0), 59);

    const period = h >= 12 ? '오후' : '오전';
    const hh = String(h).padStart(2, '0');
    const mm = String(min).padStart(2, '0');

    return `${period} ${hh}:${mm}`;
};

const Goods = ({ resType, form }) => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        if (!form) return;
        const {
            startDate = '',
            endDate = '',
            type = '',
            option = '',
            size = '',
            groomingService = '',
            checkOut = '',
            checkOutTime = '',
            resTime = '',
        } = form;

        const nextItems = [];
        let serviceType = '';
        switch (resType) {
            case 'hotel':
                serviceType = '객실';
                break;
            case 'grooming':
                serviceType = '미용';
                break;
        }
        nextItems.push({
            label: `${serviceType} 기본 요금: ${size}`,
            class: 'b500',
        });

        if (resType === 'hotel') {
            nextItems.push({
                label: `일정 : ${startDate}(${getWeekDay(startDate)}) ~ ${endDate}(
                    ${getWeekDay(endDate)})`,
                class: 'b500',
            });
            if (checkOut === 'extend') {
                nextItems.push({
                    label: `퇴실연장: ${checkOutTime.split(' ')[0]}시`,
                    class: 'g500',
                });
            } else {
                nextItems.push({
                    label: `퇴실연장: 없음`,
                    class: 'g500',
                });
            }
            if (groomingService === 'beauty') {
                nextItems.push({
                    label: `미용 서비스: ${type}`,
                    class: 'g500',
                });
            }
            if (option !== '선택 안함') {
                nextItems.push({
                    label: `추가옵션: ${option}`,
                    class: 'g500',
                });
            }
        } else {
            nextItems.push({
                label: `일정 : ${startDate}(${getWeekDay(startDate)})/${toKoMeridiem24h(resTime)} `,
                class: 'b500',
            });
            nextItems.push({
                label: `미용 서비스: ${type}`,
                class: 'g500',
            });
            if (groomingService === 'beauty') {
                nextItems.push({
                    label: `미용 서비스: ${type}`,
                    class: 'g500',
                });
            }
            if (option !== '선택 안함') {
                nextItems.push({
                    label: `추가옵션: ${option}`,
                    class: 'g500',
                });
            }
        }
        nextItems.push({
            label: `${TotalPrice(form).toLocaleString()}원`,
            class: 'goods_price',
        });

        setItems(nextItems);
    }, []);

    return (
        <div className="pay_goods">
            <div className="goods_inner">
                <h3 className="goods_label">예약 상품 정보</h3>
                <span className="goods_line"></span>
                <div className="goods_context">
                    {items.map((item, idx) => (
                        <span key={idx} className={item.class}>
                            {item.label}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Goods;
