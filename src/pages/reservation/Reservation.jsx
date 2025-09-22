import { useEffect, useState } from 'react';
import Hotel from '../../components/reservation/Hotel';
import Grooming from '../../components/reservation/Grooming';
import RequireLogin from '../../components/reservation/RequireLogin';
import useReservationStore from '../../store/useReservationStore';

const Reservation = () => {
    const [hotel, setHotel] = useState(true);
    const init = useReservationStore((s) => s.init);

    useEffect(() => {
        init();
    }, [hotel]);
    return (
        <>
            <RequireLogin />
            <section id="reservation_top">
                <ul className="res_nav">
                    <li
                        onClick={() => {
                            setHotel(true);
                        }}
                        className={hotel ? 'active' : ''}
                    >
                        Hotel 예약
                    </li>
                    <li
                        onClick={() => {
                            setHotel(false);
                        }}
                        className={!hotel ? 'active' : ''}
                    >
                        Grooming 예약
                    </li>
                </ul>
            </section>
            {hotel && <Hotel />}
            {!hotel && <Grooming />}
        </>
    );
};

export default Reservation;
