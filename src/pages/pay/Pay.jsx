import Cancel from '../../components/pay/Cancel';
import Coupon from '../../components/pay/Coupon';
import Payment from '../../components/pay/Payment';
import PaymentInfo from '../../components/pay/PaymentInfo';
import ReservationTerms from '../../components/pay/ReservationTerms';

const Pay = () => {
    const reservationForm = JSON.parse(localStorage.getItem('reservationForm'));
    const { resType } = reservationForm;

    return (
        <>
            <section id="reservation_top">
                <ul className="res_nav">
                    <li className={resType === 'hotel' ? 'active' : ''}>Hotel 예약</li>
                    <li className={resType === 'grooming' ? 'active' : ''}>Grooming 예약</li>
                </ul>
            </section>
            <PaymentInfo resType={resType} form={reservationForm} />
            <Coupon />
            <ReservationTerms />
            <Cancel />
            <Payment />
        </>
    );
};

export default Pay;
