import Step1 from '../../components/pay/Step1';

const Pay = () => {
    const reservationForm = JSON.parse(localStorage.getItem('reservationForm'));
    const { resType } = reservationForm;
    console.log(resType);

    return (
        <>
            <section id="reservation_top">
                <ul className="res_nav">
                    <li
                        // onClick={() => {
                        //     setHotel(true);
                        // }}
                        className={resType === 'hotel' ? 'active' : ''}
                    >
                        Hotel 예약
                    </li>
                    <li
                        // onClick={() => {
                        //     setHotel(false);
                        // }}
                        className={resType === 'grooming' ? 'active' : ''}
                    >
                        Grooming 예약
                    </li>
                </ul>
            </section>
            <Step1 resType={resType} form={reservationForm} />
        </>
    );
};

export default Pay;
