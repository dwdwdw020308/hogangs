const Reservation = () => {
  return (
    <section id="reservation" className="res">
      <svg
        className="res-arc"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,220 C360,70 1080,70 1440,220 L1440,0 L0,0 Z"
          fill="#ffffff"
        />
      </svg>

      <div className="res-body"></div>
    </section>
  );
};

export default Reservation;
