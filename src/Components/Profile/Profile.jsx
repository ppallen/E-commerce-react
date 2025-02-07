import './Profile.css';
import { useUser } from '../Store/user.jsx';

export default function Profile() {
  const { user } = useUser();

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <h2>個人資料</h2>
        <div className="profile-info">
          <div className="profile-item">
            <label>ID:</label>
            <span>{user.userId}</span>
          </div>
          <div className="profile-item">
            <label>電子郵件:</label>
            <span>{user.email}</span>
          </div>
          <div className="profile-item">
            <label>創建時間:</label>
            <span>{user.createdDate}</span>
          </div>
          <div className="profile-item">
            <label>最後修改時間:</label>
            <span>{user.lastModifiedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}