import CareService from '../../components/hotel/section/CareService';
import HotelInteraction from '../../components/hotel/section/HotelInteraction';
import IntroduceService from '../../components/hotel/section/IntroduceService';
import Photo from '../../components/hotel/section/Photo';
import Price from '../../components/hotel/section/Price';
import Reservation from '../../components/hotel/section/Reservation';
import Visual from '../../components/hotel/Visual';

const Hotel = () => {
    return (
        <>
            <Visual />
            <Reservation />
            <IntroduceService />
            <CareService />
            <Price />
            <HotelInteraction />
            <Photo />
        </>
    );
};

export default Hotel;
