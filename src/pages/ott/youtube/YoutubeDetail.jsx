import { useEffect, useState } from 'react';
import DetailBanner from '../youtube/DetailBanner';
import Picks from './Picks';
import '../../../styles/index.scss';
import Episode from './Episode';

const YoutubeDetail = () => {
    const [activeTab, setActiveTab] = useState('episode');

    useEffect(() => {
        sessionStorage.setItem('activeTab', activeTab);
    }, [activeTab]);
    return (
        <div className="detail-page">
            <DetailBanner />
            <nav className="tabs">
                <ul>
                    <li
                        className={activeTab === 'episode' ? 'active' : ''}
                        onClick={() => setActiveTab('episode')}
                    >
                        에피소드
                    </li>
                    <li
                        className={activeTab === 'picks' ? 'active' : ''}
                        onClick={() => setActiveTab('picks')}
                    >
                        추천 영상
                    </li>
                </ul>
            </nav>
            {/* 탭 콘텐츠 */}
            <section className="tab-content">
                {activeTab === 'episode' && <Episode />}
                {activeTab === 'picks' && <Picks />}
            </section>
        </div>
    );
};

export default YoutubeDetail;
