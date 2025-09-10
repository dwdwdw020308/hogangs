import CareService from '../../components/hotel/section/CareService';
import HotelInteraction from '../../components/hotel/section/HotelInteraction';
import Price from '../../components/hotel/section/Price';
import Reservation from '../../components/hotel/section/Reservation';
import Visual from '../../components/hotel/Visual';

const Hotel = () => {
    return (
        <>
            <Visual />
            <Reservation />
            <CareService />
            {/* <Price /> */}
            <HotelInteraction />
        </>
    );
};

export default Hotel;
