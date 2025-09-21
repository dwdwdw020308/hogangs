import React from 'react';
import SnsIcons from './SnsIcons';

const Profile = ({ user, snsLinks, userStatus, userError }) => {
    return (
        <section className="card profile-card compact">
            <h2 className="card-title">Profile</h2>
            {userStatus === 'loading' ? (
                <div className="sk lg" />
            ) : userError ? (
                <div className="error">{userError}</div>
            ) : (
                <div className="grid two">
                    <div>
                        <label>ID</label>
                        <div>{user?.id ?? user?._id}</div>
                    </div>
                    <div>
                        <label>Name</label>
                        <div>{user?.name ?? '-'}</div>
                    </div>
                    <div>
                        <label>Email</label>
                        <div>{user?.email ?? '-'}</div>
                    </div>
                    <div>
                        <label>Role</label>
                        <div>
                            <span className={`pill ${user?.role || 'user'}`}>
                                {user?.role || 'user'}
                            </span>
                        </div>
                    </div>
                    <div>
                        <label>Status</label>
                        <div>
                            <span
                                className={`dot ${user?.status === 'active' ? 'green' : 'grey'}`}
                            />
                            {user?.status ?? 'inactive'}
                        </div>
                    </div>
                    <div>
                        <label>SNS</label>
                        <SnsIcons snsLinks={snsLinks} />
                    </div>
                </div>
            )}
        </section>
    );
};

export default Profile;
