const Coupon = () => {
    return (
        <section id="pay_coupon">
            <div className="inner">
                <div className="coupon_context">
                    <h3 className="title">쿠폰</h3>
                    <span className="coupon_line"></span>
                    {/* <span className="none_coupon">사용하실 쿠폰이 없습니다.</span> */}
                    <div className="coupon_area">
                        <div className="coupon">
                            <div className="coupon_info">
                                <span className="badge">이용권</span>
                                <span className="coupon_name">웰컴 귀 건강 체크</span>
                                <span className="coupon_period">9월 24일 까지 이용가능</span>
                            </div>
                        </div>
                    </div>

                    <select className="sel_coupon" name="selCoupon" id="selCoupon">
                        <option value="">사용하실 쿠폰을 선택해주세요.</option>
                    </select>
                </div>
                <div className="block"></div>
            </div>
        </section>
    );
};

export default Coupon;
