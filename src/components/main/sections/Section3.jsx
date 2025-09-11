const Section3 = () => {
    return (
        <section id="section3">
            <div className="inner">
                <div className="textcontent">
                    <h2>PawFlix</h2>
                    <p>소중한 반려견과 함께하는 달콤한 휴식</p>
                </div>
            </div>
            <div className="video">
                <iframe
                    width="1800"
                    height="817"
                    src="https://www.youtube.com/embed/a0rBbgh05oc?autoplay=1&mute=1&controls=1"
                    title="강아지 광고"
                    frameBorder="0"
                    allow="autoplay; encrypted-media" 
                    allowFullScreen
                ></iframe>
            </div>
        </section>
    );
};

export default Section3;
