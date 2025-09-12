const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];
const TIME_LABELS = ['10:00 AM', '12:00 PM', '14:00 PM', '16:00 PM', '18:00 PM', '20:00 PM'];

const Content = ({ day }) => {
    const today = new Date();
    return (
        <li className="content">
            <div className={'top' + (day.getDate() === today.getDate() ? ' on' : '')}>
                <span>{DAY_LABELS[day.getDay()]}</span>
                <span className="line"></span>
                <span>{day.getDate()}</span>
            </div>
            <ul className="bottom">
                {TIME_LABELS.map((time, idx) => {
                    return (
                        // <li className={"disable"}>
                        <li key={idx}>
                            <div className="context">
                                <span className="time">{time}</span>
                                <span>예약된 호강이가 있어요</span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </li>
    );
};

export default Content;
