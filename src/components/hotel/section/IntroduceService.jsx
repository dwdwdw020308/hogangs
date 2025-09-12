import HotelIntroduceSwiper from '../swiper/HotelIntroduceSwiper';
import CurveHeadLine from '../partials/CurveHeadLine';

const IntroduceService = () => {
    return (
        <section id="introduce_hotel_service">
            <div className="inner">
                <div className="title">
                    <CurveHeadLine />
                </div>
                <span>집 떠나도 행복하게, 호강스에서 편안하게</span>
                <HotelIntroduceSwiper />
            </div>
        </section>
    );
};
export default IntroduceService;
