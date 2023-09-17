import './App.css';
import { Avatar } from '@mui/material';

const Header = () => {
  return (
    <div className="header_main">
      <span className="movie_detail">USER'S INVENTORY</span>
      <div className="home_icon">
        <Avatar />
      </div>
    </div>
  );
};

export default Header;
