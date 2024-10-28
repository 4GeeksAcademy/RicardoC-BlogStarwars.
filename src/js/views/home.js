import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from '../store/appContext';
import "../../styles/home.css";

const Home = () => {
    const { store, actions } = useContext(Context)
    const isFavorite = (name) => { //Verificamos si el nombre del item ya está en favoritos.
        //El método .some() verifica si algún item coincide con el nombre proporcionado, si es así devuelve true.
        return store.favorites.some(item => item.name === name);
    };
    const handleToggleFavorites = (name) => { //Función para agregar y eliminar item por su NAME(con el uid hay conflictos).
        if (!isFavorite(name)) { //Verificamos si ya está el item, si es true se elimina, si es false lo agregamos.
            actions.addFavorites(name); //función para agregar.
        }
    };
    return (
        <div className="image" style={{
            margin: "0px",
            padding: "0px",
            backgroundImage: "url(https://th.bing.com/th/id/R.9f92dacb81d41e47f1ea49845a97291f?rik=HKtHGJHSp3%2fnRA&pid=ImgRaw&r=0)",
            objectFit: "cover",
            backgroundPosition: "center"
        }}>
            <div className="container">
                <h2 style={{ color: "white" }}>Characters</h2>
                <div className="d-flex flex-wrap">
                    {store.characters.map((character) => (
                        <div className="card m-2" key={character.uid} style={{
                            width: "18rem", backgroundColor: "transparent",
                            border: "1px solid yellow"
                        }}>
                            <img src={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`}
                                className="img-fluid"
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                                }} />
                            <div className="card-body">
                                <h5 className="card-title" style={{ color: "white" }}>{character.name}</h5>
                                <div className="buttonsHome d-flex justify-content-between">
                                    <Link to={`/character/${character.uid}`}>
                                        <button type="button" className="btn btn-danger" style={{ backgroundColor: "transparent", borderColor: "yellow", color: "white" }}>
                                            Details</button>
                                    </Link>
                                    <button type="button"
                                        className="btn btn-danger"
                                        style={{ backgroundColor: "transparent", borderColor: "yellow", color: "white" }}
                                        onClick={() => handleToggleFavorites(character.name)}>
                                        Favorite</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <hr />
                <h2 style={{ color: "white" }}>Planets</h2>
                <div className="d-flex flex-wrap">
                    {store.planets.map((planet) => (
                        <div className="card m-2" key={planet.uid} style={{
                            width: "18rem", backgroundColor: "transparent",
                            border: "1px solid yellow"
                        }}>
                            <img src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`}
                                className="img-fluid"
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                                }} />
                            <div className="card-body">
                                <h5 className="card-title" style={{ color: "white" }}>{planet.name}</h5>
                                <div className="buttonsHome d-flex justify-content-between">
                                    <Link to={`/planet/${planet.uid}`}>
                                        <button type="button" className="btn btn-danger" style={{ backgroundColor: "transparent", borderColor: "yellow", color: "white" }}>
                                            Details</button>
                                    </Link>
                                    <button type="button"
                                        className="btn btn-danger"
                                        style={{ backgroundColor: "transparent", borderColor: "yellow", color: "white" }}
                                        onClick={() => handleToggleFavorites(planet.name)}>
                                        Favorite</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <hr />
                <h2 style={{ color: "white" }}>Starships</h2>
                <div className="d-flex flex-wrap">
                    {store.starships.map((starship) => (
                        <div className="card m-2" key={starship.uid} style={{
                            width: "18rem", backgroundColor: "transparent",
                            border: "1px solid yellow"
                        }}>
                            <img src={`https://starwars-visualguide.com/assets/img/starships/${starship.uid}.jpg`}
                                className="img-fluid"
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                                }} />
                            <div className="card-body">
                                <h5 className="card-title" style={{ color: "white" }}>{starship.name}</h5>
                                <div className="buttonsHome d-flex justify-content-between">
                                    <Link to={`/starship/${starship.uid}`}>
                                        <button type="button" className="btn btn-danger" style={{ backgroundColor: "transparent", borderColor: "yellow", color: "white" }}>
                                            Details</button>
                                    </Link>
                                    <button type="button"
                                        className="btn btn-danger"
                                        style={{ backgroundColor: "transparent", borderColor: "yellow", color: "white" }}
                                        onClick={() => handleToggleFavorites(starship.name)}>
                                        Favorite</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Home;