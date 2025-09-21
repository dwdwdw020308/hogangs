const Toolbar = ({ fetchAllForUser, setModalOpen, navigate }) => {
    return (
        <div className="toolbar">
            <h1>User Detail</h1>
            <div className="right">
                <button onClick={() => navigate(-1)}>Back</button>
                <button className="refresh" onClick={() => fetchAllForUser(id)}>
                    Refresh
                </button>
                <button className="primary" onClick={() => setModalOpen(true)}>
                    Grant Coupon
                </button>
            </div>
        </div>
    );
};

export default Toolbar;
