import HotelIntroduceSwiper from '../swiper/HotelIntroduceSwiper';
import CurveHeadLine from '../partials/CurveHeadLine';

const IntroduceService = () => {
    return (
        <section id="introduce_hotel_service">
            <div className="inner">
                <div className="title">
                    <CurveHeadLine />
                </div>
                <span>집 떠나도 두려움 0% 행복은 100% 호강스에서 오늘도 호강하게!</span>
                <HotelIntroduceSwiper />
            </div>
        </section>
    );
};

export default IntroduceService;
