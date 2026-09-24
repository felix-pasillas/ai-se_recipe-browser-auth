import { NavLink, useNavigate } from 'react-router-dom';

import Logo from '../../assets/logo.svg';
import Counter from '../Counter/Counter';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

function getNavLinkClass({ isActive }: { isActive: boolean}) {
  return isActive
    ? 'header__nav-link header__nav-link_active'
    : 'header__nav-link';
}

function Header() {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="header">
      <div className="header__inner">
        <img src={Logo} alt="Recipe Browser logo" className="header__logo" />
        <nav className="header__nav">
          <NavLink to="/" className={getNavLinkClass}>
            Recipes
          </NavLink>
          <NavLink to="/favorites" className={getNavLinkClass}>
            Favorites <Counter />
          </NavLink>
          {isAuthenticated ? (
            <>
              <p className="header__text">{currentUser?.name}</p>
              <button className="header__logout-btn" onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={getNavLinkClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={getNavLinkClass}>
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
