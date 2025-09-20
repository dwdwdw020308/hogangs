import { useEffect, useMemo, useState } from 'react';
import { useAdminReservationsStore } from '../../store/useAdminReservationsStore';
import '../../styles/admin/_reservations.scss';

const Th = ({ label, sortKey, sortBy, sortDir, onSort, width }) => {
    const active = sortBy === sortKey;
    return (
        <th style={width ? { width } : undefined} onClick={() => onSort(sortKey)}>
            <span>{label}</span>
            <i className={`sort ${active ? sortDir : ''}`} />
        </th>
    );
};

const fmt = (iso) => {
    if (!iso) return '-';
    const d = new Date(iso);
    if (isNaN(d)) return String(iso);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
        d.getDate()
    ).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(
        2,
        '0'
    )}`;
};

export default function AdminReservations() {
    const {
        items,
        status,
        error,
        resType,
        query,
        sortBy,
        sortDir,
        setResType,
        setQuery,
        toggleSort,
        fetchAll,
    } = useAdminReservationsStore();

    const [localQ, setLocalQ] = useState(query || '');

    // 최초 로드 & 탭 변경 시 목록 가져오기
    useEffect(() => {
        fetchAll(true);
    }, [resType, fetchAll]);

    // 검색 디바운스
    useEffect(() => {
        const t = setTimeout(() => setQuery(localQ), 300);
        return () => clearTimeout(t);
    }, [localQ, setQuery]);

    // 검색 + 정렬
    const rows = useMemo(() => {
        const base = Array.isArray(items) ? items : [];
        // 검색어: 이름/이메일/전화/타입
        const kw = (query || '').trim().toLowerCase();
        let r = base;
        if (kw) {
            r = base.filter((v) =>
                [v?.name, v?.email, v?.phone, v?.resType, v?.beautyType, v?.size]
                    .filter(Boolean)
                    .some((s) => String(s).toLowerCase().includes(kw))
            );
        }

        const numericKeys = new Set(['totalPrice']);
        const key = sortBy || 'createdAt';
        const toComparable = (obj, k) => {
            const val = obj?.[k] ?? obj?.[k === 'createdAt' ? 'regDate' : k];
            if (k.toLowerCase().includes('date')) {
                const n = Number(new Date(val));
                return Number.isNaN(n) ? 0 : n;
            }
            return numericKeys.has(k) ? Number(val ?? 0) : String(val ?? '').toLowerCase();
        };

        return [...r].sort((a, b) => {
            const A = toComparable(a, key);
            const B = toComparable(b, key);
            if (A === B) return 0;
            return sortDir === 'asc' ? (A > B ? 1 : -1) : A < B ? 1 : -1;
        });
    }, [items, query, sortBy, sortDir]);

    return (
        <div className="admin-reservations">
            <div className="toolbar">
                <h1>Reservations</h1>
                <div className="right">
                    <div className="tabs">
                        <button
                            className={resType === 'hotel' ? 'active' : ''}
                            onClick={() => setResType('hotel')}
                        >
                            Hotel
                        </button>
                        <button
                            className={resType === 'grooming' ? 'active' : ''}
                            onClick={() => setResType('grooming')}
                        >
                            Grooming
                        </button>
                    </div>

                    <input
                        className="search"
                        placeholder="Search name / email / phone…"
                        value={localQ}
                        onChange={(e) => setLocalQ(e.target.value)}
                    />
                    <button onClick={() => fetchAll(true)}>Refresh</button>
                </div>
            </div>

            <div className="table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <Th
                                label="Type"
                                sortKey="resType"
                                sortBy={sortBy}
                                sortDir={sortDir}
                                onSort={toggleSort}
                                width={110}
                            />
                            <Th
                                label="Name"
                                sortKey="name"
                                sortBy={sortBy}
                                sortDir={sortDir}
                                onSort={toggleSort}
                            />
                            <Th
                                label="Email"
                                sortKey="email"
                                sortBy={sortBy}
                                sortDir={sortDir}
                                onSort={toggleSort}
                            />
                            <Th
                                label="Phone"
                                sortKey="phone"
                                sortBy={sortBy}
                                sortDir={sortDir}
                                onSort={toggleSort}
                                width={140}
                            />
                            <Th
                                label="Size"
                                sortKey="size"
                                sortBy={sortBy}
                                sortDir={sortDir}
                                onSort={toggleSort}
                                width={110}
                            />
                            <Th
                                label="Beauty Type"
                                sortKey="beautyType"
                                sortBy={sortBy}
                                sortDir={sortDir}
                                onSort={toggleSort}
                                width={140}
                            />
                            <Th
                                label="Check-in"
                                sortKey="startDate"
                                sortBy={sortBy}
                                sortDir={sortDir}
                                onSort={toggleSort}
                                width={160}
                            />
                            <Th
                                label="Check-out"
                                sortKey="endDate"
                                sortBy={sortBy}
                                sortDir={sortDir}
                                onSort={toggleSort}
                                width={160}
                            />
                            <Th
                                label="Total"
                                sortKey="totalPrice"
                                sortBy={sortBy}
                                sortDir={sortDir}
                                onSort={toggleSort}
                                width={120}
                            />
                            <Th
                                label="Created"
                                sortKey="createdAt"
                                sortBy={sortBy}
                                sortDir={sortDir}
                                onSort={toggleSort}
                                width={180}
                            />
                        </tr>
                    </thead>

                    <tbody>
                        {status === 'loading' ? (
                            [...Array(8)].map((_, i) => (
                                <tr key={`sk-${i}`} className="skeleton">
                                    <td colSpan={10}>
                                        <div className="sk" />
                                    </td>
                                </tr>
                            ))
                        ) : error ? (
                            <tr>
                                <td colSpan={10} className="error">
                                    {error}
                                </td>
                            </tr>
                        ) : rows.length === 0 ? (
                            <tr>
                                <td colSpan={10} className="empty">
                                    No reservations.
                                </td>
                            </tr>
                        ) : (
                            rows.map((r) => (
                                <tr key={r.id ?? r._id}>
                                    <td>
                                        <span className={`pill ${r.resType}`}>{r.resType}</span>
                                    </td>
                                    <td>{r.name ?? '-'}</td>
                                    <td>{r.email ?? '-'}</td>
                                    <td>{r.phone ?? '-'}</td>
                                    <td>{r.size ?? '-'}</td>
                                    <td>{r.beautyType ?? '-'}</td>
                                    <td>{fmt(r.startDate)}</td>
                                    <td>{fmt(r.endDate)}</td>
                                    <td>{(r.totalPrice ?? 0).toLocaleString()}원</td>
                                    <td>{fmt(r.regDate || r.createdAt)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
