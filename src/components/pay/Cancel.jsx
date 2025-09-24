import { useEffect, useState } from "react";
import useReservationStore from "../../store/useReservationStore";

const Cancel = () => {
  const [cancelAgree, setCancelAgree] = useState(false);
  const setPaymentProcesses = useReservationStore((s) => s.setPaymentProcesses);

  const clickCheckBox = () => {
    setCancelAgree(!cancelAgree);
  };

  useEffect(() => {
    setPaymentProcesses("cancel", cancelAgree);
  }, [cancelAgree, setPaymentProcesses]);
  return (
    <section id="pay_cancel">
      <div className="inner">
        <div className="cancel_context">
          <h3 className="title">취소/환불 규정에 대한 동의</h3>
          <ul className="table">
            <li>
              <span className="left">이용 7일 전</span>
              <span className="right">총 결제금액의 30% 차감</span>
            </li>
            <li>
              <span className="left">이용 6일 전</span>
              <span className="right">총 결제금액의 40% 차감</span>
            </li>
            <li>
              <span className="left">이용 5일 전</span>
              <span className="right">총 결제금액의 50% 차감</span>
            </li>
            <li>
              <span className="left">이용 4일 전</span>
              <span className="right">총 결제금액의 70% 차감</span>
            </li>
            <li>
              <span className="left">이용 3일 전</span>
              <span className="right">총 결제금액의 90% 차감</span>
            </li>
            <li>
              <span className="left">이용 2일 전</span>
              <span className="right">환불 불가능</span>
            </li>
            <li>
              <span className="left">이용 1일 전</span>
              <span className="right">환불 불가능</span>
            </li>
            <li>
              <span className="left">이용 당일</span>
              <span className="right">환불 불가능</span>
            </li>
          </ul>
          <div className={`check__line ${cancelAgree ? "inputCheck" : ""}`}>
            <input
              id="cancelAgree"
              type="checkbox"
              checked={cancelAgree}
              onChange={clickCheckBox}
            />
            <label
              htmlFor="cancelAgree"
              className={cancelAgree ? "checked" : ""}
            >
              <span>취소/환불 규정에 대해 확인하였으며, 이에 동의합니다</span>
            </label>
          </div>
        </div>
        <div className="block"></div>
      </div>
    </section>
  );
};

export default Cancel;
