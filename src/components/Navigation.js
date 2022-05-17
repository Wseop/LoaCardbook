import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top ps-2">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Loa Cardbook</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">성장</Link>
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