import { useEffect, useState } from 'react';
import {
    addPriceByGroomingOption,
    HotelBasicPrice,
    HotelLateCheckOut,
    priceByGroomingService,
} from '../../../../utils/Calc';

const Receipt = ({ resType, form, totalPrice, setTotalPrice }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (!form) return;
        const {
            size = '',
            nights = 0,
            checkOut = '',
            checkOutTime = '',
            groomingService = '',
            type = '',
            option = '',
        } = form;

        const nextItems = [];
        let total = 0;

        if (resType === 'hotel') {
            const price = Number(HotelBasicPrice(size, nights) || 0);
            nextItems.push({ label: `객실 기본 요금: ${size}`, price });
            total += price;
        }

        if (checkOut === 'extend') {
            const price = Number(HotelLateCheckOut(size, checkOutTime) || 0);
            nextItems.push({ label: '객실 추가 요금: 퇴실연장', price });
            total += price;
        }

        if (groomingService === 'beauty') {
            const price = Number(priceByGroomingService(size, type, option) || 0);
            nextItems.push({ label: `미용 서비스: ${type}`, price });
            total += price;
        }

        if (option) {
            const price = Number(addPriceByGroomingOption(option) || 0);
            nextItems.push({ label: `추가옵션: ${option}`, price });
            total += price;
        }

        setItems(nextItems);
        setTotalPrice(total);
    }, [
        resType,
        form?.size,
        form?.nights,
        form?.checkOut,
        form?.checkOutTime,
        form?.groomingService,
        form?.type,
        form?.option,
    ]);
    return (
        <div className="receipt">
            <div className="receipt_inner">
                <h3 className="receipt_title">최종 결제금액</h3>
                <ul className="receipt_info">
                    {items.map((item, idx) => (
                        <li key={idx}>
                            <span className="receipt_label">{item.label}</span>
                            <span className="receipt_price">{item.price.toLocaleString()}원</span>
                        </li>
                    ))}
                </ul>
                <span className="receipt_line"></span>
                <div className="receipt_total">
                    <span className="receipt_total_text">총 결제금액</span>
                    <span className="receipt_total_text">{totalPrice.toLocaleString()}원</span>
                </div>
            </div>
        </div>
    );
};

export default Receipt;
