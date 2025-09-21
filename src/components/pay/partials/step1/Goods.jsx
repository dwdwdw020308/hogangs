import { format, parse } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { TotalPrice } from '../../../../utils/Calc';
const getWeekDay = (date) => {
    const d = parse(date, 'yyyy-MM-dd', new Date()); // 로컬 자정으로 파싱
    return format(d, 'EEE', { locale: ko }); // 'EEE' = 금, 'EEEE' = 금요일
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
