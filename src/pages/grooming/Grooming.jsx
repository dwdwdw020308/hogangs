import { useEffect, useState } from 'react';
import CareService from '../../components/grooming/section/CareService';
import GroomingInteraction from '../../components/grooming/section/GroomingInteraction';
import IntroduceService from '../../components/grooming/section/IntroduceService';
import Photo from '../../components/grooming/section/Photo';
import Price from '../../components/grooming/section/Price';
import Reservation from '../../components/grooming/section/Reservation';
import Scroll from '../../components/grooming/section/Scroll';
import Visual from '../../components/grooming/section/Visual';
import GroomingInteractionMobile from '../../components/grooming/section/GroomingInteractionMobile';
import ScrollMobile from '../../components/grooming/section/ScrollMobile';

const Grooming = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 600);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <>
            <Visual />
            <Reservation />
            <IntroduceService />
            <CareService />
            <Price />
            {isMobile ? <ScrollMobile /> : <Scroll />}
            {isMobile ? <GroomingInteractionMobile /> : <GroomingInteraction />}
            <Photo />
        </>
    );
};

export default Grooming;
