// src/pages/admin/AdminCoupons.jsx
import { useEffect, useMemo, useState } from 'react';
import '../../styles/admin/_videos.scss';
import CouponFormModal from './modal/CouponFormModal';
import useAdminCouponsStore from '../../store/useAdminCouponsStore';

const Th = ({ label, sortKey, sortBy, sortDir, onSort, width }) => {
    const active = sortBy === sortKey;
    return (
        <th style={width ? { width } : undefined} onClick={() => onSort(sortKey)}>
            <span>{label}</span>
            <i className={`sort ${active ? sortDir : ''}`} />
        </th>
    );
};

const formatDate = (iso) => {
    if (!iso) return '-';
    try {
        const d = new Date(iso);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
            d.getDate()
        ).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(
            d.getMinutes()
        ).padStart(2, '0')}`;
    } catch {
        return iso;
    }
};

const getErr = (e) => e?.response?.data?.message || e.message || '요청 실패';

export default function AdminCoupons() {
    // 목록/정렬/검색
    const {
        items,
        status,
        error,
        query,
        sortBy,
        sortDir,
        fetchAll,
        setQuery,
        toggleSort,
        remove, // (선택) 삭제
    } = useAdminCouponsStore();

    const [localQ, setLocalQ] = useState(query);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null); // null: 생성, object: 수정

    // 최초 로드
    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    // 검색 디바운스
    useEffect(() => {
        const t = setTimeout(() => setQuery(localQ), 300);
        return () => clearTimeout(t);
    }, [localQ, setQuery]);

    // 정렬/검색
    const rows = useMemo(() => {
        const base = Array.isArray(items) ? items : Array.isArray(items?.items) ? items.items : [];

        let r = base;
        if (query) {
            const q = String(query).toLowerCase();
            r = r.filter((v) =>
                [v.name, v.type, String(v.validDays)]
                    .filter(Boolean)
                    .some((s) => String(s).toLowerCase().includes(q))
            );
        }

        const numericKeys = new Set(['validDays']);
        const key = sortBy || 'createdAt';
        const toComparable = (obj, k) => {
            const val = obj?.[k];
            return numericKeys.has(k) ? Number(val ?? 0) : String(val ?? '').toLowerCase();
        };

        return r.slice().sort((a, b) => {
            const A = toComparable(a, key);
            const B = toComparable(b, key);
            if (A === B) return 0;
            return sortDir === 'asc' ? (A > B ? 1 : -1) : A < B ? 1 : -1;
        });
    }, [items, query, sortBy, sortDir]);

    // 모달 오픈(생성)
    const openCreate = () => {
        setEditing(null);
        setModalOpen(true);
    };

    // 모달 오픈(수정) — (원하면 사용)
    const openEdit = (row) => {
        setEditing(row);
        setModalOpen(true);
    };

    const onDelete = async (row) => {
        const name = row.name || row.id || row._id;
        if (!confirm(`삭제할까요?\n${name}`)) return;
        try {
            await remove(row.id ?? row._id);
        } catch (e) {
            alert(getErr(e));
        }
    };

    const typeLabel = (t) => (t === 'pass' ? '이용권' : t === 'discount' ? '할인권' : t || '-');

    return (
        <div className="admin-videos">
            <div className="toolbar">
                <h1>Coupons</h1>
                <div className="right">
                    <input
                        className="search"
                        placeholder="Search name / type / days…"
                        value={localQ}
                        onChange={(e) => setLocalQ(e.target.value)}
                    />
                    <button className="primary" onClick={openCreate}>
                        New Coupon
                    </button>
                    <button onClick={() => fetchAll(true)}>Refresh</button>
                </div>
            </div>

            <div className="table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <Th
                                label="Name"
                                sortKey="name"
                                sortBy={sortBy}
                                sortDir={sortDir}
                                onSort={toggleSort}
                            />
                            <Th
                                label="Type"
                                sortKey="type"
                                sortBy={sortBy}
                                sortDir={sortDir}
                                onSort={toggleSort}
                                width={140}
                            />
                            <Th
                                label="Valid Days"
                                sortKey="validDays"
                                sortBy={sortBy}
                                sortDir={sortDir}
                                onSort={toggleSort}
                                width={140}
                            />
                            <Th
                                label="Created"
                                sortKey="createdAt"
                                sortBy={sortBy}
                                sortDir={sortDir}
                                onSort={toggleSort}
                                width={180}
                            />
                            <th style={{ width: 160 }}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {status === 'loading' ? (
                            [...Array(6)].map((_, i) => (
                                <tr key={`sk-${i}`} className="skeleton">
                                    <td colSpan={8}>
                                        <div className="sk" />
                                    </td>
                                </tr>
                            ))
                        ) : error ? (
                            <tr>
                                <td colSpan={8} className="error">
                                    {error}
                                </td>
                            </tr>
                        ) : rows.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="empty">
                                    No coupons.
                                </td>
                            </tr>
                        ) : (
                            rows.map((v) => (
                                <tr key={v.id ?? v._id}>
                                    <td className="title-cell">
                                        <b>{v.name || '-'}</b>
                                        {v.desc ? <div className="desc">{v.desc}</div> : null}
                                    </td>
                                    <td>{typeLabel(v.type)}</td>
                                    <td>{v.validDays ?? '-'}</td>
                                    <td>{formatDate(v.createdAt)}</td>
                                    <td>
                                        <div className="row-actions">
                                            <button onClick={() => openEdit(v)}>Edit</button>
                                            <button className="danger" onClick={() => onDelete(v)}>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {modalOpen && (
                <CouponFormModal
                    mode={editing ? 'edit' : 'create'}
                    initial={editing || undefined}
                    onClose={() => setModalOpen(false)}
                    onSuccess={() => {
                        setModalOpen(false);
                        fetchAll(true);
                    }}
                />
            )}
        </div>
    );
}
