import React from 'react';
import {Link, Route} from 'react-router-dom';

const Menu = (props) => {
  const link = (!!props.linkTo) ? (<Link className="nav-link" to={props.linkTo}>{props.children}<span className="sr-only"></span></Link>) : (<a className="nav-link" href={props.href}>{props.children}<span className="sr-only"></span></a>);
  return (
    <li className="nav-item">
      {link}
    </li>
  );
};

const DropdownMenuItem = (props) => {
  if (!!props.linkTo) {
    return (<Link className="dropdown-item" to={props.linkTo}>{props.children}</Link>);
  } else {
    return (<a className="dropdown-item" href={props.href}>{props.children}</a>)
  }
};

const DropdownMenu = (props) => (
  <li className="nav-item dropdown">
    <a className="nav-link dropdown-toggle" href={props.href} id="dropdown" data-toggle="dropdown">{props.text}</a>
    <div className="dropdown-menu">
      {props.children}
    </div>
  </li>
);


const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        <img src={props.logoImg} width="30" height="30" className="d-inline-block align-top mr-2" alt=""/>
        {props.logoText}
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu" >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="menu">
        <ul className="navbar-nav mr-auto">
          {props.children}
        </ul>
      </div>
    </nav>
  );
}

const DefaultNavbar = (props) => (
  <Navbar logoImg="/img/logo.png" logoText="PYE">
    <Menu linkTo="/">Home</Menu>
    <Menu linkTo="/article/list">Article</Menu>
    <Menu linkTo="/image/list">Photo</Menu>
    <Menu linkTo="/game/list">Game</Menu>
    <Menu linkTo="/video/list">Video</Menu>

  </Navbar>
);

export {Menu, DropdownMenuItem, DropdownMenu, Navbar};
export default DefaultNavbar;
