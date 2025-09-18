import Relate from '../movie/Relate';

const Picks = ({ videolist, person }) => {
    // const videolist = [
    //     { id: 1, img: '/ott/youtube1.png', title: '말리와 나' },
    //     { id: 2, img: '/ott/youtube2.png', title: '콜 오브 와일드' },
    //     { id: 3, img: '/ott/youtube3.png', title: '마리강아지와 아이들' },
    //     { id: 4, img: '/ott/youtube4.png', title: '레이싱 인더 레인' },
    //     { id: 5, img: '/ott/youtube5.png', title: '더 웨이 홈' },
    //     { id: 6, img: '/ott/youtube6.png', title: '도그' },
    //     { id: 7, img: '/ott/youtube7.png', title: 'TOGO' },
    // ];
    // const person = [{ id: 1, img: '/ott/person9.png', name: '강아지 수의사 윤쌤', type: ' 주연' }];

    return <Relate videolist={videolist} person={person} />;
};

export default Picks;
