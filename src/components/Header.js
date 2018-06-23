import React from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/authActions';

export const Header = (props) => (
  <header className="header">
    <div className="content-container">
      <div className="header__wrapper">
        <Link to="/dashboard">
          <h1 className="header__title">Expensify</h1>
        </Link>
        <button onClick={props.startLogout}>Logout</button>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
