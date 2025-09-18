import { useState } from 'react';
import { DayPicker, useDayPicker, useNavigation } from 'react-day-picker';
import { format, isSameDay, startOfToday } from 'date-fns';
import { ko } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';

export default function DatePick() {
    const [range, setRange] = useState({ from: undefined, to: undefined });

    const PrevIcon = ({ onClick }) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="17"
                viewBox="0 0 10 17"
                fill="none"
                onClick={onClick}
            >
                <path
                    d="M1.01953 8.28862L8.87828 0.429878L9.29928 0.850883L1.86154 8.28862L9.29928 15.7264L8.87828 16.1474L1.01953 8.28862Z"
                    fill="#404040"
                />
            </svg>
        );
    };
    const NextIcon = ({ onClick }) => {
        return (
            <svg
                className="next_btn"
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="17"
                viewBox="0 0 9 17"
                fill="none"
                onClick={onClick}
            >
                <path
                    d="M0.833114 0.429881L8.69186 8.28863L0.833114 16.1474L0.412109 15.7264L7.84985 8.28863L0.412109 0.850885L0.833114 0.429881Z"
                    fill="#404040"
                />
            </svg>
        );
    };

    const CustomMonthCaption = ({ calendarMonth }) => {
        const { goToMonth, nextMonth, previousMonth } = useDayPicker();

        return (
            <div className="cal-header">
                <PrevIcon onClick={() => goToMonth(previousMonth)} />

                <div className="caption">
                    {format(calendarMonth.date, 'yyyy년 MM월', { locale: ko })}
                </div>

                <NextIcon onClick={() => goToMonth(nextMonth)} />
            </div>
        );
    };
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
                hideNavigation
                components={{ MonthCaption: CustomMonthCaption }} // <-- 이게 포인트!
                disabled={{ before: startOfToday() }}
                styles={{
                    root: {
                        width: 760,
                        height: 564,
                    },
                }}
            />
        </div>
    );
}
