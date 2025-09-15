import CareService from "../../components/grooming/section/CareService";
import GroomingInteraction from "../../components/grooming/section/GroomingInteraction";
import IntroduceService from "../../components/grooming/section/IntroduceService";
import Photo from "../../components/grooming/section/Photo";
import Price from "../../components/grooming/section/Price";
import Reservation from "../../components/grooming/section/Reservation";
import Visual from "../../components/grooming/section/Visual";
import HogangsCursor from "../../components/util/HogangsCursor";

const Grooming = () => {
  return (
    <>
      <Visual />
      <Reservation />
      <IntroduceService />
      <CareService />
      <Price />
      <GroomingInteraction />
      <Photo />
    </>
  );
};

export default Grooming;
