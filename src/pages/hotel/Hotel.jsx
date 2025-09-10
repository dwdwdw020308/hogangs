import CareService from "../../components/hotel/section/CareService";
import Price from "../../components/hotel/section/Price";
import Reservation from "../../components/hotel/section/Reservation";
import Visual from "../../components/hotel/Visual";

const Hotel = () => {
  return (
    <>
      <Visual />
      <Reservation />
      <CareService />
      {/* <Price /> */}
    </>
  );
};

export default Hotel;
