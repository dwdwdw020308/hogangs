const col = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png'];

const HotelInteraction = () => {
    const srcUrl = '/hotel/roll';
    return (
        <section id="hotel_interaction">
            <div className="rolling_area">
                <div className="col up">
                    <div className="track">
                        {[...col, ...col].map((src, i) => (
                            <img key={i} src={srcUrl + '/col1/' + src} alt="" />
                        ))}
                    </div>
                </div>

                <div className="col down">
                    <div className="track">
                        {[...col, ...col].map((src, i) => (
                            <img key={i} src={srcUrl + '/col2/' + src} alt="" />
                        ))}
                    </div>
                </div>

                <div className="col up">
                    <div className="track">
                        {[...col, ...col].map((src, i) => (
                            <img key={i} src={srcUrl + '/col3/' + src} alt="" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HotelInteraction;
