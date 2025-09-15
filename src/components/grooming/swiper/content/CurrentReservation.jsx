const DAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];
const TIME_LABELS = [
  "10:00 AM",
  "12:00 PM",
  "14:00 PM",
  "16:00 PM",
  "18:00 PM",
  "20:00 PM",
];

// 예약 데이터
const week_res_data = [
  {
    date: "2025-09-07",
    time: ["10:00 AM", "14:00 PM", "16:00 PM", "18:00 PM", "20:00 PM"],
  },
];

const pad = (n) => String(n).padStart(2, "0");
const toKey = (d) => {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};
const CurrentReservation = ({ day }) => {
  const todayKey = toKey(new Date());
  const dayKey = toKey(day);

  const dayData = week_res_data.find((d) => d.date === dayKey);
  const reservedSet = new Set(dayData?.time ?? []);

  return (
    <li className="content">
      <div className={"top" + (dayKey === todayKey ? " on" : "")}>
        <span>{DAY_LABELS[day.getDay()]}</span>
        <span className="line"></span>
        <span>{day.getDate()}</span>
      </div>
      <ul className="bottom">
        {TIME_LABELS.map((time, idx) => {
          const reserved = reservedSet.has(time);

          return (
            <li key={idx} className={reserved ? "disable" : ""}>
              <div className="context">
                <span className="time">{time}</span>
                <span>
                  {reserved ? "예약된 호강이가 있어요" : "호강하러 가기"}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export default CurrentReservation;
