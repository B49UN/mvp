"use client";
import {useState} from "react";
import Image from "next/image";

export function Menu() {

    const [isActive, setIsActive] = useState(false);

    const toggleActiveClass = () => { setIsActive(!isActive) };
    const removeActive = () => { setIsActive(false) };

    return(
        <nav>
            <a href="/">
                <Image
                    src="/next.svg"
                    alt="Logo"
                    width={100}
                    height={24}
                    priority
                />
            </a>

            <div>
                <ul id="navbar">
                    <li>
                        <a href="/login">Login</a>
                    </li>
                    <li>
                        <a href="/register">Register</a>
                    </li>
                </ul>
            </div>
            <div id="mobile">
                <i className="fas fa-bars"></i>
                <i className="fas fa-times"></i>
            </div>
        </nav>


        /*<nav className="menu-bar bg-gray-800 text-white p-4">
                <button className="font-bold" onClick={() => console.log('toggleMenu')}>Menu</button>
                <div id="fullMenu" className="hidden menu-bar expanded">
                    <p>Log-In</p>
                    <p>Sign in</p>
                    <p>Subscribe</p>
                </div>
            </nav>*/
    )
}