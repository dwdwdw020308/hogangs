import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format, isSameDay } from "date-fns";
import { ko } from "date-fns/locale";
import "react-day-picker/dist/style.css";

export default function DatePick() {
  const [range, setRange] = useState({ from: undefined, to: undefined });

  // ✅ 날짜 셀 내부에 라벨 DOM을 심어줌
  function DayContent({ date }) {
    const isFrom = range?.from && isSameDay(date, range.from);
    const isTo = range?.to && isSameDay(date, range.to);

    return (
      <div className="hc-cell">
        <span className="hc-num">{format(date, "d")}</span>
        {/* 기본은 숨겨지고, CSS에서 start/end일 때만 보이게 */}
        <span className={`hc-badge checkin${isFrom ? " show" : ""}`}>입실</span>
        <span className={`hc-badge checkout${isTo ? " show" : ""}`}>퇴실</span>
      </div>
    );
  }

  return (
    <div className="calendar_area">
      <div className="notice_area">
        <h3 className="title">입실·퇴실 날짜를 선택해 주세요</h3>
        <p>
          체크인은 오전 8시부터 오후 6시까지 가능합니다.
          <br />
          1박은 입실 시간과 관계없이 다음날 오전 8시까지입니다.
        </p>
      </div>

      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        locale={ko}
        showOutsideDays
        weekStartsOn={0}
        components={{ DayContent }}
        formatters={{
          formatCaption: (m) => format(m, "yyyy년 MM월", { locale: ko }),
        }}
      />
    </div>
  );
}
