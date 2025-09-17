import { useEffect, useState } from 'react';
import DetailBanner from '../common/DetailBanner';
import Relate from '../movie/Relate';
import Photo from '../movie/Photo';
import Review from '../movie/Review';

const MovieDetail = () => {
    // const [activeTab, setActiveTab] = useState(() => {
    //     return sessionStorage.getItem('activeTab') || 'relate';
    // });
    const [activeTab, setActiveTab] = useState('relate');

    useEffect(() => {
        sessionStorage.setItem('activeTab', activeTab);
    }, [activeTab]);
    return (
        <div className="detail-page">
            {/* 상단비주얼배너 */}
            <DetailBanner />
            {/* 탭 메뉴 */}
            <nav className="tabs">
                <ul>
                    <li
                        className={activeTab === 'relate' ? 'active' : ''}
                        onClick={() => setActiveTab('relate')}
                    >
                        연관내용
                    </li>
                    <li
                        className={activeTab === 'photo' ? 'active' : ''}
                        onClick={() => setActiveTab('photo')}
                    >
                        포토
                    </li>
                    <li
                        className={activeTab === 'review' ? 'active' : ''}
                        onClick={() => setActiveTab('review')}
                    >
                        리뷰
                    </li>
                </ul>
            </nav>
            {/* 탭 콘텐츠 */}
            <section className="tab-content">
                {activeTab === 'relate' && <Relate />}
                {activeTab === 'photo' && <Photo />}
                {activeTab === 'review' && <Review />}
            </section>
        </div>
    );
};

export default MovieDetail;
