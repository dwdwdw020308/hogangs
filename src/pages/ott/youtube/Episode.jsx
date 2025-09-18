import { useEffect, useState } from 'react';

const Episode = () => {
    const videos = [
        {
            id: 1,
            img: '/ott/video1.png',
            title: '강아지 건강검진',
            desc: '반려견과 함께하는 삶을 바꾸는 4가지 기본 훈련.\n앉아, 기다려, 이리 와, 엎드려.\n단순한 명령이 아닌, 신뢰와 안전을 만드는 첫걸음.',
        },
        {
            id: 2,
            img: '/ott/video2.png',
            title: '강아지 응급처치 요령',
            desc: '위험한 순간, 단 한 번의 부름이 강아지를 지켜냅니다.\n이리 와 훈련은 보호자와 반려견 사이의 가장 강력한 연결.\n신뢰와 안전을 만드는 특별한 방법이 지금 시작됩니다.',
        },
        {
            id: 3,
            img: '/ott/video3.png',
            title: '이럴땐 병원에 데려가보셔야 합니다',
            desc: '끝없는 짖음, 그 뒤에 숨은 불안과 습관.\n짖지마 훈련은 단순히 소음을 멈추는 것이 아닙니다.\n특별한 교육법을 만나보세요."',
        },
        {
            id: 4,
            img: '/ott/video4.png',
            title: '당뇨병이 의심됩니다',
            desc: '실외 배변을 실내 배변으로 바꾸는 훈련.\n환경이 달라져도 이어지는 규칙, 그리고 변하지 않는 신뢰.\n또 하나의 동행이 시작됩니다."',
        },
        {
            id: 5,
            img: '/ott/video5.png',
            title: '강아지는 사람 말을 얼마나 이해할까',
            desc: '강아지가 세상을 배우는 첫걸음, 바로 사회화 교육.\n필요한 시기는 생후 몇 달, 단 한 번뿐인 결정적 순간.\n효과적인 사회화 교육, 그 모든 것을 지금 확인하세요."',
        },
        {
            id: 6,
            img: '/ott/video6.png',
            title: '우린 이제껏 개아련에 속았다',
            desc: '강아지와 함께하는 첫걸음, 기본 훈련법.\n그리고 기다림 속에서 신뢰를 쌓는 기다려.\n단순한 명령이 아닌, 평생을 함께할 약속이 됩니다."',
        },
        {
            id: 7,
            img: '/ott/video7.png',
            title: 'AI시대 수의사는 필요없다?',
            desc: '강아지의 마음을 이해하고, 신뢰를 지켜내는 과정이죠.\n 하지만 잘못하면 오히려 두려움과\n불안을 남길 수도 있습니다.',
        },
        {
            id: 8,
            img: '/ott/video8.png',
            title: '강아지가 사람보다 좋은 이유 10가지',
            desc: '신뢰를 시작하는 눈맞추기, 차분함을 배우는 앉아,\n안정을 찾는 엎드려.\n단순한 훈련이 아닌, 평생을 함께할 기본기가 됩니다."',
        },
        {
            id: 9,
            img: '/ott/video9.png',
            title: '더운 여름철 강아지 건강 관리 요령',
            desc: '단순한 장난일까, 아니면 스트레스의 신호일까.\n원인을 알면 해결이 보입니다.\n지금 그 해답을 확인하세요."',
        },
        {
            id: 10,
            img: '/ott/video10.png',
            title: '댕댕이 체온 어떻게 관리해요?',
            desc: '어디서든 안전을 지켜주는 이동장 훈련,\n 그리고 생활의 기본을 만드는 크레이트 훈련. \n강아지와 보호자 모두를 지금 시작해보세요."',
        },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [displayVideos, setDisplayVideos] = useState(videos);

    const videosPerPage = 10;
    const totalPage = 2;

    const shuffleArray = (array) => {
        return [...array].sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        if (currentPage === 1) {
            setDisplayVideos(videos);
        } else {
            setDisplayVideos(shuffleArray(videos));
        }
    }, [currentPage]);

    return (
        <div className="episode">
            {/* 에피소드 아이템들을 별도의 그리드 컨테이너로 분리 */}
            <div className="episode-grid">
                {displayVideos.map((video) => (
                    <div className="episode-item" key={video.id}>
                        <img src={video.img} alt={video.title} />
                        <div className="text-wrap">
                            <strong>{video.title}</strong>
                            <p>{video.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* 페이지네이션을 그리드 외부로 분리 */}
            <div className="pagination">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    <img src="/ott/icon-prev.png" alt="이전버튼" />
                    <span>이전</span>
                </button>
                {Array.from({ length: totalPage }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`current ${currentPage === i + 1 ? 'active' : ''}`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPage))}
                    disabled={currentPage === totalPage}
                >
                    <span>다음</span>
                    <img src="/ott/icon-next.png" alt="다음버튼" />
                </button>
            </div>
        </div>
    );
};

export default Episode;
