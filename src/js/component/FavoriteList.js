import React, { useContext } from "react";
import { Context } from "../store/appContext"
const FavoriteList = () => {
    const { actions, store } = useContext(Context);
    const favorites = store.favorites;
    const favoritesCount = favorites.length;
    const handleRemoveFavorite = (name) => {
        actions.deleteFavorites(name);
    };
    return (
        <div className="container">
            <ul className="list-group">
                {favoritesCount === 0 ? (
                    <li className="dropdown-item">No favorites</li>
                ) : (
                    favorites.map((item, index) => {
                        return (
                            <li className="d-flex align-items-center justify-content-around" key={index}>
                                <p>{item}</p>
                                <p><button
                                    className="btn btn-danger"
                                    style={{ backgroundColor: "black", borderColor: "yellow", color: "white" }}
                                    onClick={() => handleRemoveFavorite(item)}>Remove</button>
                                </p>
                            </li>
                        );
                    })
                )}
            </ul>
        </div>
    );
};
export default FavoriteList;