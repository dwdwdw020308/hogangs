import { useEffect, useState } from 'react';
import Agree from './hotel/Agree';
import Calendar from './hotel/Calendar';
import CheckGroomingService from './hotel/CheckGroomingService';
import CheckOutService from './hotel/CheckOutService';
import CheckWeight from './hotel/CheckWeight';
import Request from './hotel/Request';
import useReservationStore from '../../store/useReservationStore';

const Hotel = ({ setModalShow }) => {
    const [form, setForm] = useState({});
    const init = useReservationStore((s) => s.init);

    return (
        <>
            <Calendar setForm={setForm} setModalShow={setModalShow} />
            <CheckOutService />
            <CheckWeight />
            <CheckGroomingService />
            <Request />
            <Agree />
        </>
    );
};

export default Hotel;
