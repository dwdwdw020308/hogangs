import React, { useState } from 'react';
import Hobok from './Hobok';
import Hogang from './Hogang';

const Content5 = () => {
    const [activeTab, setActiveTab] = useState('hogang');
    return (
        <section id="about-content5">
            <div className="inner">
                <div className="dogTabs">
                    <div className="tabBtn">
                        <button
                            className={activeTab === 'hogang' ? 'active' : ''}
                            onClick={() => setActiveTab('hogang')}
                        >
                            <img src="/about/hogangSmall.png" alt="hogangSmall" />
                        </button>
                        <button
                            className={activeTab === 'hobok' ? 'active' : ''}
                            onClick={() => setActiveTab('hobok')}
                        >
                            <img src="/about/hobokSmall.png" alt="hobokSmall" />
                        </button>
                    </div>
                    <div className="tabContent">
                        {activeTab === 'hogang' && <Hogang />}
                        {activeTab === 'hobok' && <Hobok />}
                    </div>
                </div>
            </div>
            <div className="banner"></div>
        </section>
    );
};

export default Content5;
