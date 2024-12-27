// import React from "react";
// import "./styles.css";
// import { Link, Outlet } from "react-router-dom";

// export default function Navbar() {
//     return (
//         <>
//             <nav className="nav">
//                 <a className="site-title">Masroofy</a>
//                 <ul>
//                     <li>
//                         <Link to="/" style={{ display: "block", padding: "10px 20px" }}>
//                             Home
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to="/chart" style={{ display: "block", padding: "10px 20px" }}>
//                             Chart
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to="/about" style={{ display: "block", padding: "10px 20px" }}>
//                             About
//                         </Link>
//                     </li>
//                 </ul>
//             </nav>

//             <div>
//                 <Outlet />
//             </div>
//         </>
//     );
// }
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./styles.css";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            <nav className="nav">
                <a className="site-title">Masroofy</a>
                <div className={`menu ${isMenuOpen ? "open" : ""}`}>
                    <ul>
                        <li>
                            <Link to="/" style={{ padding: "10px 20px" }}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/chart" style={{ padding: "10px 20px" }}>
                                Chart
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" style={{ padding: "10px 20px" }}>
                                About
                            </Link>
                        </li>
                    </ul>
                </div>
                <button className="hamburger" onClick={toggleMenu}>
                    &#9776;
                </button>
            </nav>

            <div>
                <Outlet />
            </div>
        </>
    );
}

