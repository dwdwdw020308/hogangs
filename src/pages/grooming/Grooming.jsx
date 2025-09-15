import CareService from "../../components/grooming/section/CareService";
import GroomingInteraction from "../../components/grooming/section/GroomingInteraction";
import IntroduceService from "../../components/grooming/section/IntroduceService";
import Photo from "../../components/grooming/section/Photo";
import Price from "../../components/grooming/section/Price";
import Reservation from "../../components/grooming/section/Reservation";
import Scroll from "../../components/grooming/section/Scroll";
import Visual from "../../components/grooming/section/Visual";

const Grooming = () => {
  return (
    <>
      <Visual />
      <Reservation />
      <IntroduceService />
      <CareService />
      <Price />
      <Scroll />
      <GroomingInteraction />
      <Photo />
    </>
  );
};

export default Grooming;
