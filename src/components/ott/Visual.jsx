const posters = [
    '/ott/movie1.png',
    '/ott/movie2.png',
    '/ott/movie3.png',
    '/ott/movie4.png',
    '/ott/movie5.png',
    '/ott/movie6.png',
    '/ott/movie7.png',
    '/ott/movie8.png',
    '/ott/movie9.png',
    '/ott/movie10.png',
];

const Visual = () => {
    return (
        <div className="ottmain-visual">
            <div className="title">
                <strong>
                    소중한 <span>반려견과 함께</span>하는 달콤한 <span>휴식</span>
                </strong>
                <h2>PawFlix</h2>
            </div>
            <div className="movie-film">
                <div className="film-inner">
                    <div className="posterlist">
                        {Array.from({ length: 20 }, (_, i) => (
                            <div className="poster" key={i}>
                                <img
                                    src={posters[i % posters.length]}
                                    alt="poster"
                                    draggable={false}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="img ">
                <img src="/ott/dog.png" alt="강아지이미지" draggable={false} />
            </div>
        </div>
    );
};

export default Visual;
