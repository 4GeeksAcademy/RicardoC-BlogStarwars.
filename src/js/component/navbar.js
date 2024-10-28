import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext"
export const Navbar = () => {
    const { store } = useContext(Context);
    const favorites = store.favorites;
    const favoritesCount = favorites.length;
    return (
        <nav className="navbar navbar-light bg-light mb-3">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">Home</span>
                </Link>
                <div className="ml-auto">
                    <Link to="/favorites">
                        <button className="btn btn-primary" style={{ backgroundColor: "black", borderColor: "yellow", color: "white" }}>FavoriteList {favoritesCount}</button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};