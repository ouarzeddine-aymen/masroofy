import React from "react";
import "./styles.css";
import { Link, Outlet } from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <nav className="nav">
                <a className="site-title">Masroofy</a>
                <ul>
                    <li>
                        <Link to="/" style={{ display: "block", padding: "10px 20px" }}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/chart" style={{ display: "block", padding: "10px 20px" }}>
                            Chart
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" style={{ display: "block", padding: "10px 20px" }}>
                            About
                        </Link>
                    </li>
                </ul>
            </nav>

            <div>
                <Outlet />
            </div>
        </>
    );
}
