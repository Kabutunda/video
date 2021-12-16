import React from 'react';
import { Link } from 'react-router-dom';
import {Container, Row, Col} from "react-bootstrap";
import Auth from '../../utils/auth';

const Header = () => {
  // if user is not logged in, level is -1 which restricts certain privileges 
  let level = -1;
  if (Auth.getProfile()) {
    level = Auth.getProfile().data.level
  };
  // Calls logout function on click
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <div className="bottom-header dark-skin border-top border-bottom bg-dark">
      <Container>
        <Row className="align-items-center">
          <Col md={4}>
            <div className="d-flex align-items-center justify-content-center justify-content-md-start">
              <Link className="nav-item nav-link" to="/" style={{fontSize: "24px", fontFamily: "verdana"}}>
                <i className="fas fa-tv"/> <span style={{color: "white"}}>WGTV UGANDA</span>
              </Link>
            </div>
          </Col>
          <Col md={4}>
            <div className="d-flex align-items-center justify-content-center justify-content-md-center">
              <input className="btn btn-outline-primary btn-sm" type="text" placeholder="Search..."/>
            </div>
          </Col>
          <Col md={4}>
            <div className="d-flex align-items-center justify-content-center justify-content-md-end">
              <a className="nav-item nav-link" href="https://www.live.gospeltube.com/streams/1"><button className="btn btn-outline-danger btn-sm">Live</button></a>
              {Auth.loggedIn() 
              ? ( <>
                {level === 1 ? (<a href=""><button className="btn btn-outline-danger btn-sm"><i className="fas fa-play"/></button></a>) : ("")}
                {level === 1 ? (<Link className="nav-item nav-link" to="/upload"><button className="btn btn-outline-warning btn-sm">Upload</button></Link>) : ("")}
                {level === 1 ? (<Link className="nav-item nav-link" to="/me"><button className="btn btn-outline-light btn-sm">Manage</button></Link>) : ("")}
                <Link className="nav-item nav-link" onClick={logout}><button className="btn btn-outline-primary btn-sm">Logout</button></Link> </> ) 
              : ( <>
                <Link className="nav-item nav-link" to="/login"><button className="btn btn-outline-primary btn-sm">Login</button></Link>
              </>)}
            </div>
          </Col>
        </Row>
      </Container>                    
    </div>
  );
};

export default Header;
