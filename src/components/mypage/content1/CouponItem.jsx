import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const CouponItem = ({ data }) => {
    const { name, type, expiresAt, status } = data;

    return (
        <div
            className={status === 0 ? 'couponItem' : 'ExpiredCouponItem'}
            id={status === 0 ? 'couponItem' : 'ExpiredCouponItem'}
        >
            <div className="couponImg">
                <div className="txt">
                    <span>{type === 'pass' ? '이용권' : '할인권'}</span>
                    <h3>{name}</h3>
                    {status === 0 && (
                        <p>
                            {format(new Date(expiresAt), 'M월 d일', { locale: ko })}일 까지 이용가능
                        </p>
                    )}
                    {status === 1 && <p>사용완료</p>}
                </div>
            </div>
        </div>
    );
};

export default CouponItem;
