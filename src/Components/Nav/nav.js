import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

const Nav = (props) => (
    props.navLinks.map(link => (
        <li key={link.key}>
            <Link to={link.route}>{link.linkTo}</Link>
        </li>
    ))
)

export default Nav;