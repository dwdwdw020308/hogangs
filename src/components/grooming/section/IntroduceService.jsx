import CurveHeadLine from "../partials/CurveHeadLine";
import GroomingIntroduceSwiper from "../swiper/GroomingIntroduceSwiper";

const IntroduceService = () => {
  return (
    <section id="introduce_grooming_service">
      <div className="inner">
        <div className="title">
          <CurveHeadLine />
        </div>
        <span>오늘도 예쁘게 변신했어요! 엄마 아빠가 보면 깜짝 놀랄 걸요?</span>
        <span className="mobileTitle">
          오늘도 예쁘게 변신했어요! <br /> 엄마 아빠가 보면 깜짝 놀랄 걸요?
        </span>
        <GroomingIntroduceSwiper />
      </div>
    </section>
  );
};
export default IntroduceService;
