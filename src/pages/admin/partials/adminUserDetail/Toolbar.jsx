const Toolbar = ({ fetchAllForUser, setModalOpen, navigate }) => {
    return (
        <div className="toolbar">
            <h1>User Detail</h1>
            <div className="right">
                <button onClick={() => navigate(-1)}>뒤로</button>
                <button className="refresh" onClick={() => fetchAllForUser(id)}>
                    새로고침
                </button>
                <button className="primary" onClick={() => setModalOpen(true)}>
                    쿠폰지급
                </button>
            </div>
        </div>
    );
};

export default Toolbar;
