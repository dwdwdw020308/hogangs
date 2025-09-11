export const startOfWeek = (date, weekStartsOn = 0) => {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const day = d.getDay();
    const diff = (day - weekStartsOn + 7) % 7; // 0=Sunday
    d.setDate(d.getDate() - diff);
    d.setHours(0, 0, 0, 0);
    return d;
}


export const ymd = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${dd}`;
}

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
}