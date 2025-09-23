import React from 'react';

const RecordItem = ({ data }) => {
    return (
        <div className="RecordItem" id="RecordItem">
            <div className="movieImg">
                <img src={data.visual} alt="" />
            </div>
            <div className="title">
                <p>{data.koTitle}</p>
            </div>
        </div>
    );
};

export default RecordItem;
