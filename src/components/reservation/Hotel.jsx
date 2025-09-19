import { useEffect, useState } from 'react';
import Agree from './hotel/Agree';
import Calendar from './hotel/Calendar';
import CheckGroomingService from './hotel/CheckGroomingService';
import CheckOutService from './hotel/CheckOutService';
import CheckWeight from './hotel/CheckWeight';
import Request from './hotel/Request';

const Hotel = () => {
    const [form, setForm] = useState({});

    return (
        <>
            <Calendar setForm={setForm} />
            <CheckOutService />
            <CheckWeight />
            <CheckGroomingService />
            <Request />
            <Agree />
        </>
    );
};

export default Hotel;
