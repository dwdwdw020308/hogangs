// src/pages/admin/AdminVideos.jsx
import { useEffect, useMemo, useState } from 'react';



import '../../styles/admin/_videos.scss';
import VideoFormModal from './modal/VideoFormModal';
import useAdminVideosStore from '../../store/useAdminVideosStore';

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

export default function AdminVideos() {
  // 목록/정렬/검색/CRUD는 목록 스토어
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
    remove,
  } = useAdminVideosStore();

  // 폼은 폼 스토어
  const { reset: resetForm, fillFrom } = useAdminVideosStore();

  const [localQ, setLocalQ] = useState(query);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null); // null 이면 생성, 객체면 수정

  // 최초 로드
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // 검색 디바운스
  useEffect(() => {
    const t = setTimeout(() => setQuery(localQ), 300);
    return () => clearTimeout(t);
  }, [localQ, setQuery]);

// 정렬/검색(필드 이름을 실제 스키마에 맞춤)
const rows = useMemo(() => {
  // items가 배열이 아닐 수도 있으니 안전하게 풀어줌
  const base = Array.isArray(items) ? items
              : (Array.isArray(items?.items) ? items.items : []);

  // 검색
  let r = base;
  if (query) {
    const q = String(query).toLowerCase();
    r = r.filter((v) =>
      [v.koTitle, v.enTitle, v.youtubeId, v.desc]
        .filter(Boolean)
        .some((s) => String(s).toLowerCase().includes(q))
    );
  }

  // 정렬
  const numericKeys = new Set(['year', 'runtime']);
  const key = sortBy || 'createdAt';
  const toComparable = (obj, k) => {
    const val = obj?.[k];
    return numericKeys.has(k) ? Number(val ?? 0) : String(val ?? '').toLowerCase();
  };

  return r.slice().sort((a, b) => {
    const A = toComparable(a, key);
    const B = toComparable(b, key);
    if (A === B) return 0;
    return sortDir === 'asc' ? (A > B ? 1 : -1) : (A < B ? 1 : -1);
  });
}, [items, query, sortBy, sortDir]);

  // 모달 오픈 (생성)
  const openCreate = () => {
    setEditing(null);
    resetForm(); // 폼 초기화
    setModalOpen(true);
  };

  // 모달 오픈 (수정)
  const openEdit = (row) => {
    setEditing(row);
    fillFrom(row); // 기존 값 주입
    setModalOpen(true);
  };

  const onDelete = async (row) => {
    const name = row.koTitle || row.enTitle || row.youtubeId || row.id || row._id;
    if (!confirm(`삭제할까요?\n${name}`)) return;
    try {
      await remove(row.id ?? row._id);
      // 필요 시 fetchAll(true) 호출 가능
    } catch (e) {
      alert(getErr(e));
    }
  };

  return (
    <div className="admin-videos">
      <div className="toolbar">
        <h1>Videos</h1>
        <div className="right">
          <input
            className="search"
            placeholder="Search ko/en title / YouTube ID / desc…"
            value={localQ}
            onChange={(e) => setLocalQ(e.target.value)}
          />
          <button className="primary" onClick={openCreate}>
            New Video
          </button>
          <button onClick={() => fetchAll(true)}>Refresh</button>
        </div>
      </div>

      <div className="table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <Th
                label="Ko Title"
                sortKey="koTitle"
                sortBy={sortBy}
                sortDir={sortDir}
                onSort={toggleSort}
              />
              <Th
                label="En Title"
                sortKey="enTitle"
                sortBy={sortBy}
                sortDir={sortDir}
                onSort={toggleSort}
              />
              <Th
                label="YouTube ID"
                sortKey="youtubeId"
                sortBy={sortBy}
                sortDir={sortDir}
                onSort={toggleSort}
                width={220}
              />
              <Th
                label="Year"
                sortKey="year"
                sortBy={sortBy}
                sortDir={sortDir}
                onSort={toggleSort}
                width={90}
              />
              <Th
                label="Category"
                sortKey="category"
                sortBy={sortBy}
                sortDir={sortDir}
                onSort={toggleSort}
                width={120}
              />
              <Th
                label="Runtime"
                sortKey="runtime"
                sortBy={sortBy}
                sortDir={sortDir}
                onSort={toggleSort}
                width={110}
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
                  No videos.
                </td>
              </tr>
            ) : (
              rows.map((v) => (
                <tr key={v.id ?? v._id}>
                  <td className="title-cell">
                    <b>{v.koTitle || '-'}</b>
                    {v.desc ? <div className="desc">{v.desc}</div> : null}
                  </td>
                  <td>{v.enTitle || '-'}</td>
                  <td>{v.youtubeId || '-'}</td>
                  <td>{v.year ?? '-'}</td>
                  <td>{v.category ?? '-'}</td>
                  <td>{v.runtime ?? '-'}</td>
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
        <VideoFormModal
          mode={editing ? 'edit' : 'create'}
          onClose={() => {
            resetForm();
            setModalOpen(false);
          }}
          onSuccess={() => {
            // 폼에서 submit 성공 후 호출됨
            resetForm();
            setModalOpen(false);
            fetchAll(true); // 목록 새로고침
          }}
        />
      )}
    </div>
  );
}
