import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top ps-2">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">LoaCS</Link>
                <div className="collapse navbar-collapse" id="navItems">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/grow">성장</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/set">세트</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/collection">도감</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navigation;