import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/admin/_users.scss';
import '../../styles/admin/_modal.scss';
import useAdminUserDetailStore from '../../store/useAdminUserDetailStore';
import GrantCouponModal from './modal/GrantCouponModal';

import Toolbar from './partials/adminUserDetail/Toolbar';
import Profile from './partials/adminUserDetail/Profile';

const fmt = (iso) => {
    if (!iso) return '-';
    const d = new Date(iso);
    if (isNaN(d)) return String(iso);
    return (
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
            d.getDate()
        ).padStart(2, '0')} ` +
        `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
    );
};

export default function AdminUserDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        user,
        userStatus,
        userError,
        snsLinks,
        snsStatus,
        reservations,
        resvStatus,
        userCoupons,
        couponStatus,
        modalOpen,
        setModalOpen,
        fetchAllForUser,
        markCouponUsed,
    } = useAdminUserDetailStore();

    useEffect(() => {
        if (!id) return;
        fetchAllForUser(id);
    }, [id, fetchAllForUser]);

    const hasKakao = snsLinks.some((s) => s.provider?.toLowerCase() === 'kakao');
    const hasGoogle = snsLinks.some((s) => s.provider?.toLowerCase() === 'google');

    return (
        <div className="admin-users detail compact">
            <Toolbar
                fetchAllForUser={fetchAllForUser}
                setModalOpen={setModalOpen}
                navigate={navigate}
            />

            {/* ▼ 2컬럼 레이아웃 */}
            <div className="two-col">
                <div className="left">
                    {/* LEFT : 슬림 프로필 */}
                    <Profile
                        user={user}
                        snsLinks={snsLinks}
                        userStatus={userStatus}
                        userError={userError}
                    />

                    <section className="card">
                        <h2 className="card-title">SNS Link</h2>
                        {snsStatus === 'loading' ? (
                            <div className="sk" />
                        ) : (
                            <div className="sns-badges">
                                <span className={`pill ${hasKakao ? 'green' : 'grey'}`}>
                                    Kakao {hasKakao ? 'linked' : 'not linked'}
                                </span>
                                <span className={`pill ${hasGoogle ? 'green' : 'grey'}`}>
                                    Google {hasGoogle ? 'linked' : 'not linked'}
                                </span>
                            </div>
                        )}
                    </section>
                </div>

                {/* RIGHT : 예약 / 쿠폰 표 */}
                <div className="right">
                    <section className="card">
                        <h2 className="card-title">Reservations</h2>
                        {resvStatus === 'loading' ? (
                            <div className="sk lg" />
                        ) : reservations.length === 0 ? (
                            <div className="empty">No reservations.</div>
                        ) : (
                            <div className="table-wrap">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th align="center">예약타입</th>
                                            <th align="center">입실</th>
                                            <th align="center">퇴실</th>
                                            <th align="center">총결제</th>
                                            <th align="center">예약일</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reservations.map((r) => (
                                            <tr key={r.id ?? r._id}>
                                                <td>{r.resType}</td>
                                                <td>{fmt(r.startDate)}</td>
                                                <td>{fmt(r.endDate)}</td>
                                                <td>{(r.totalPrice ?? 0).toLocaleString()}원</td>
                                                <td>{fmt(r.regDate || r.createdAt)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>

                    <section className="card">
                        <h2 className="card-title">User Coupons</h2>
                        {couponStatus === 'loading' ? (
                            <div className="sk lg" />
                        ) : userCoupons.length === 0 ? (
                            <div className="empty">No coupons.</div>
                        ) : (
                            <div className="table-wrap">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>쿠폰명</th>
                                            <th>타입</th>
                                            <th>가능일</th>
                                            <th>지급일</th>
                                            <th>만료일</th>
                                            <th>상태</th>
                                            <th style={{ width: 140 }}>기능</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userCoupons.map((c) => (
                                            <tr key={c.id ?? c._id}>
                                                <td>{c.name}</td>
                                                <td>
                                                    {c.type === 'pass'
                                                        ? '이용권'
                                                        : c.type === 'discount'
                                                        ? '살인권'
                                                        : c.type}
                                                </td>
                                                <td>{c.validDays}</td>
                                                <td>{fmt(c.grantedAt)}</td>
                                                <td>{fmt(c.expiresAt)}</td>
                                                <td>
                                                    <span
                                                        className={`pill ${
                                                            c.status === 1 ? 'blue' : 'green'
                                                        }`}
                                                    >
                                                        {c.status === 1 ? '사용' : '미사용'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="row-actions">
                                                        <button
                                                            disabled={c.status === 1}
                                                            onClick={() =>
                                                                markCouponUsed(c.id ?? c._id)
                                                            }
                                                            style={{
                                                                opacity: c.status === 1 ? 0.6 : 1,
                                                            }}
                                                        >
                                                            Use
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </div>
            </div>

            {modalOpen && (
                <GrantCouponModal
                    userId={id}
                    onClose={() => setModalOpen(false)}
                    onSuccess={() => {
                        setModalOpen(false);
                        fetchAllForUser(id);
                    }}
                />
            )}
        </div>
    );
}
