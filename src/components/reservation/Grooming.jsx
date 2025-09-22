import Calendar from './grooming/Calendar';
import CheckGroomingService from './grooming/CheckGroomingService';
import CheckWeight from './grooming/CheckWeight';
import Request from './grooming/Request';
import Time from './grooming/Time';
import Agree from './grooming/Agree';
import useReservationStore from '../../store/useReservationStore';

const Grooming = () => {
    const init = useReservationStore((s) => s.init);

    return (
        <>
            <Calendar />
            <Time />
            <CheckWeight />
            <CheckGroomingService />
            <Request />
            <Agree />
        </>
    );
};

export default Grooming;
