import { useState } from 'react';
import Hotel from '../../components/reservation/Hotel';
import Grooming from '../../components/reservation/Grooming';
import RequireLogin from '../../components/reservation/RequireLogin';

const Reservation = () => {
    const [hotel, setHotel] = useState(true);

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
