// dateUtils.js

// 주 시작(weekStartsOn: 0=일, 1=월)
export const startOfWeek = (date, weekStartsOn = 0) => {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const day = d.getDay();
    const diff = (day - weekStartsOn + 7) % 7;
    d.setDate(d.getDate() - diff);
    d.setHours(0, 0, 0, 0);
    return d;
};

export const endOfWeek = (date, weekStartsOn = 0) => {
    const s = startOfWeek(date, weekStartsOn);
    const e = new Date(s);
    e.setDate(s.getDate() + 6);
    e.setHours(23, 59, 59, 999);
    return e;
};

export const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);

export const lastDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);

export const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const addWeeks = (date, n) => {
    const d = new Date(date);
    d.setDate(d.getDate() + 7 * n);
    return d;
};

export const isBefore = (a, b) => a.getTime() < b.getTime();

export const isSameMonth = (a, b) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();

export const ymd = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${dd}`;
};

export const getWeekDays = (baseDate = new Date(), weekOffset = 0, weekStartsOn = 0) => {
    const base = new Date(baseDate);
    base.setDate(base.getDate() + weekOffset * 7);
    const start = startOfWeek(base, weekStartsOn);
    const out = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        out.push(d);
    }
    return out;
};

// 이번 달에서 "오늘이 포함된 주 ~ 월말"까지의 주 시작일 배열 반환
export const getWeekStartsOfMonth = (monthDate, today, weekStartsOn = 0) => {
    const monthStart = startOfMonth(monthDate);
    const monthEnd = lastDayOfMonth(monthDate);

    let cur = startOfWeek(monthStart, weekStartsOn);
    const out = [];
    const today0 = startOfDay(today);
    const stopAt = addWeeks(monthEnd, 1); // 월말 다음 주 시작 전까지

    while (isBefore(cur, stopAt)) {
        const wStart = cur;
        const wEnd = endOfWeek(cur, weekStartsOn);

        const touchesThisMonth = isSameMonth(wStart, monthDate) || isSameMonth(wEnd, monthDate);
        const notPast = !isBefore(wEnd, today0); // 지난 주 제외

        if (touchesThisMonth && notPast) out.push(wStart);
        cur = addWeeks(cur, 1);
    }
    return out;
};
