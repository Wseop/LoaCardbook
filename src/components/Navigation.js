import React from "react";

const Navigation = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top ps-2">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Loa Cardbook</a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/">성장</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">세트</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">도감</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navigation;