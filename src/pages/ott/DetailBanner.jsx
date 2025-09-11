import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { BiLike, BiSolidLike } from 'react-icons/bi';

const DetailBanner = () => {
    return (
        <div className="DetailBanner">
            <div className="title-box">
                <h2>안녕 베일리</h2>
                <strong>A Dog's Journey</strong>
                <ul>
                    <li>2019</li>
                    <li>ALL</li>
                    <li>모험ㆍ성장</li>
                    <li>1h 48s</li>
                </ul>
            </div>
            <div className="line"></div>
            <div className="desc-box">
                <div className="left">
                    <img src="/ott/detail-sub1.png" alt="안녕베일리영상이미지" />
                    <button>
                        <img src="/ott/play-button.png" alt="플레이버튼" />
                    </button>
                </div>
                <div className="center">
                    <p>
                        남편을 잃은 후 상심에 빠져있는 글로리아와 그의 딸 씨제이. <br />
                        그들을 걱정하던 할아버지 이든은 환생견이자 자기 반려견인 베일리에게 <br />
                        다시 태어나도 사랑하는 손녀 씨제이를 지켜 달라고 부탁한다.
                    </p>
                    <ul>
                        <li>
                            <button>
                                <FaRegHeart />
                                {/* <FaHeart />
                                 */}
                                찜할까 멍?
                            </button>
                        </li>
                        <li>
                            <button>
                                <BiLike />
                                {/* <BiSolidLike /> */}
                                추천할까 멍?
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="right">
                    <img src="/ott/score.png" alt="별점" />
                </div>
            </div>
        </div>
    );
};

export default DetailBanner;
