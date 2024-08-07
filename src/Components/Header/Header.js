import React,{useContext,useState} from 'react';
import { useHistory } from 'react-router-dom';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/firebaseContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const history=useHistory()
  const {user}=useContext(AuthContext)
  const {firebase}=useContext(FirebaseContext)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    firebase.auth().signOut();
    history.push('/login');
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="userDropdown">
        <div className="userLogo" onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faUser} size="1.5x" />
        <span className="userName" onClick={() => { if (!user) history.push('/login'); }}>
          {user ? user.displayName : 'Login'}
        </span>
        </div>
      {dropdownOpen && (
        <div className="dropdownMenu">
          <span onClick={() => { if (!user) history.push('/login'); }}>
            {user ? user.displayName : 'Login'}
            </span>
          <hr />
          {user && <span onClick={handleLogout}>Logout</span>}
        </div>
      )}
       </div>

        <div className="sellMenu" onClick={()=>{history.push('/create')}}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span >SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
