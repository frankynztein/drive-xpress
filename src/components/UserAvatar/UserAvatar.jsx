import PropTypes from 'prop-types';

import './UserAvatar.css';
import { Link } from 'react-router-dom';

const UserAvatar = ({ user }) => {

    return (
        <div className="user-avatar">
          <Link to="/user-info">
            <div className="avatar-circle">
                {user?.initials || 'US'}
            </div>
          </Link>
        </div>
    );
};

UserAvatar.propTypes = {
    user: PropTypes.shape({
        initials: PropTypes.string,
    }).isRequired,
};

export { UserAvatar };
