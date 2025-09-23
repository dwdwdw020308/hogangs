import { useEffect, useState } from 'react';
import Hotel from '../../components/reservation/Hotel';
import Grooming from '../../components/reservation/Grooming';
import RequireLogin from '../../components/reservation/RequireLogin';
import useReservationStore from '../../store/useReservationStore';
import PriceModal from '../../components/reservation/partials/PriceModal';

const Reservation = () => {
    const [hotel, setHotel] = useState(true);
    const [modalShow, setModalShow] = useState(false);
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
            {hotel && <Hotel setModalShow={setModalShow} />}
            {!hotel && <Grooming setModalShow={setModalShow} />}
            {modalShow && <PriceModal hotel={hotel} onClose={() => setModalShow(false)} />}
        </>
    );
};

export default Reservation;
