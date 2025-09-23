import { useEffect, useState } from "react";
import CareService from "../../components/hotel/section/CareService";
import HotelInteractionMobile from "../../components/hotel/section/HotelInteractionMobile";
import IntroduceService from "../../components/hotel/section/IntroduceService";
import Photo from "../../components/hotel/section/Photo";
import Price from "../../components/hotel/section/Price";
import Reservation from "../../components/hotel/section/Reservation";
import Visual from "../../components/hotel/Visual";
import HotelInteraction from "../../components/hotel/section/HotelInteraction";

const Hotel = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Visual />
      <Reservation />
      <IntroduceService />
      <CareService />
      <Price />
      {isMobile ? <HotelInteractionMobile /> : <HotelInteraction />}
      <Photo />
    </>
  );
};

export default Hotel;
