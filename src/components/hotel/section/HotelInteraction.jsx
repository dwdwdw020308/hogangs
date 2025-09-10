const col1 = ["/dogs/1.jpg", "/dogs/2.jpg", "/dogs/3.jpg", "/dogs/4.jpg"];
const col2 = ["/dogs/5.jpg", "/dogs/6.jpg", "/dogs/7.jpg", "/dogs/8.jpg"];
const col3 = ["/dogs/9.jpg", "/dogs/10.jpg", "/dogs/11.jpg", "/dogs/12.jpg"];

const HotelInteraction = () => {
  return (
    <section id="hotel_interaction">
      <div className="rolling_area">
        <div className="col up">
          <div className="track">
            {[...col1, ...col1].map((src, i) => (
              <img key={i} src={src} alt="" />
            ))}
          </div>
        </div>

        <div className="col down">
          <div className="track">
            {[...col2, ...col2].map((src, i) => (
              <img key={i} src={src} alt="" />
            ))}
          </div>
        </div>

        <div className="col up">
          <div className="track">
            {[...col3, ...col3].map((src, i) => (
              <img key={i} src={src} alt="" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelInteraction;
