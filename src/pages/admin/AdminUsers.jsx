// src/pages/admin/Users.jsx
import { useEffect, useMemo, useState } from 'react';
import { useAdminUsersStore } from '../../store/useAdminUsersStore';
import './../../styles/admin/_users.scss';

const PAGE_SIZE_OPTIONS = [10, 20, 50];

export default function AdminUsers() {
  // ⬇️ Zustand store 훅
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
  } = useAdminUsersStore();
  console.log(items)
  // 페이지/페이지당 개수는 화면에서만 관리 (클라 페이지네이션)
  const [page, setPage] = useState(1); // 1-based
  const [pageSize, setPageSize] = useState(10);

  // 검색 디바운스 (입력창은 로컬, 실제 검색어는 store.query)
  const [q, setQ] = useState(query || '');
  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      setQuery(q);
    }, 350);
    return () => clearTimeout(t);
  }, [q, setQuery]);

  // 최초/탭복귀 시 목록 가져오기 (스토어는 1분 TTL이라 과호출 안됨)
  useEffect(() => {
    fetchAll(false);
  }, [fetchAll]);

  // 필터 + 정렬 (클라이언트 사이드)
  const filteredSorted = useMemo(() => {
    const kw = (query || '').trim().toLowerCase();
    let arr = items;

    if (kw) {
      arr = arr.filter((u) => {
        const name = String(u?.name ?? '').toLowerCase();
        const email = String(u?.email ?? '').toLowerCase();
        return name.includes(kw) || email.includes(kw);
      });
    }

    // 정렬
    const by = sortBy;
    const dir = sortDir === 'asc' ? 1 : -1;

    const val = (u) => {
      const v = u?.[by];
      // createdAt처럼 날짜일 수 있음
      if (by.toLowerCase().includes('date') || by.toLowerCase().includes('created')) {
        // 날짜/숫자 우선
        const n = Number(new Date(v));
        return Number.isNaN(n) ? 0 : n;
      }
      // 숫자
      if (typeof v === 'number') return v;
      // 그 외 문자열로 비교
      return (v ?? '').toString().toLowerCase();
    };

    return [...arr].sort((a, b) => {
      const va = val(a);
      const vb = val(b);
      if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;
      return String(va).localeCompare(String(vb)) * dir;
    });
  }, [items, query, sortBy, sortDir]);

  // 총 개수/페이지 계산
  const total = filteredSorted.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));

  // 페이지 슬라이스
  const rows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredSorted.slice(start, start + pageSize);
  }, [filteredSorted, page, pageSize]);

  const loading = status === 'loading';
  const err = error;

  // 날짜 포맷
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

  return (
    <div className="admin-users">
      <div className="toolbar">
        <h1>Users</h1>

        <div className="right">
          <input
            className="search"
            placeholder="Search name / email…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          <select
            className="page-size"
            value={pageSize}
            onChange={(e) => {
              setPage(1);
              setPageSize(Number(e.target.value));
            }}
          >
            {PAGE_SIZE_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}/page
              </option>
            ))}
          </select>

          <button className="refresh" onClick={() => fetchAll(true)}>
            Refresh
          </button>
        </div>
      </div>

      <div className="table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <Th label="ID" sortKey="id" sortBy={sortBy} sortDir={sortDir} onSort={toggleSort} />
              <Th label="Name" sortKey="name" sortBy={sortBy} sortDir={sortDir} onSort={toggleSort} />
              <Th label="Email" sortKey="email" sortBy={sortBy} sortDir={sortDir} onSort={toggleSort} />
              <Th label="Role" sortKey="role" sortBy={sortBy} sortDir={sortDir} onSort={toggleSort} />
              <Th label="Status" sortKey="status" sortBy={sortBy} sortDir={sortDir} onSort={toggleSort} />
              <Th
                label="Joined"
                sortKey="createdAt"
                sortBy={sortBy}
                sortDir={sortDir}
                onSort={toggleSort}
              />
            </tr>
          </thead>

          <tbody>
            {loading ? (
              [...Array(pageSize)].map((_, i) => (
                <tr key={`sk-${i}`} className="skeleton">
                  <td colSpan={6}>
                    <div className="sk" />
                  </td>
                </tr>
              ))
            ) : err ? (
              <tr>
                <td colSpan={6} className="error">
                  {err}
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="empty">
                  No users found.
                </td>
              </tr>
            ) : (
              rows.map((u) => (
                <tr key={u.id ?? u._id}>
                  <td>{u.id ?? u._id}</td>
                  <td>{u.name ?? '-'}</td>
                  <td>{u.email ?? '-'}</td>
                  <td>
                    <span className={`pill ${u.role || 'user'}`}>{u.role || 'user'}</span>
                  </td>
                  <td>
                    <span className={`dot ${u.status === 'active' ? 'green' : 'grey'}`} />
                    {u.status ?? 'inactive'}
                  </td>
                  <td>{formatDate(u.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pager">
        <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
          Prev
        </button>
        <span>
          Page <b>{page}</b> / {pages}
        </span>
        <button disabled={page >= pages} onClick={() => setPage((p) => Math.min(pages, p + 1))}>
          Next
        </button>
      </div>
    </div>
  );
}

function Th({ label, sortKey, sortBy, sortDir, onSort }) {
  const active = sortBy === sortKey;
  return (
    <th onClick={() => onSort(sortKey)}>
      <span>{label}</span>
      <i className={`sort ${active ? sortDir : ''}`} />
    </th>
  );
}
