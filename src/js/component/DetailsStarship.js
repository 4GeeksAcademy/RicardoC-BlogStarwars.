import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { useParams } from "react-router-dom";

const DetailsStarship = () => {
    const { store, actions } = useContext(Context);
    const url = "https://www.swapi.tech/api/";
    const { uid } = useParams();
    const [starship, setStarship] = useState(null);
    const isFavorite = (name) => { //Observamos si el nombre del item ya está en favoritos.
        //El método .some() verifica si algún item coincide con el nombre proporcionado, si es así devuelve true.
        return store.favorites.some(item => item.name === name);
    };
    const handleToggleFavorites = (name) => { //Función para agregar y eliminar item por su NAME(con el uid hay conflictos).
        if (isFavorite(name)) { //Verificamos si ya está el item, si es true se elimina, si es false lo agregamos.
            actions.deleteFavorites(name); //función para eliminar
        } 
    };
    useEffect(() => {
        const detailsStarship = async (uid) => {
            console.log("id:", uid);
            try {
                const resp = await fetch(`${url}starships/${uid}`, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (!resp.ok) {
                    throw new Error(`starship Request Failed ${resp.status}`)
                }
                const data = await resp.json()
                setStarship(data.result.properties)
                console.log(data);
            } catch (err) {
                console.error(`Failed to process request to the starship API ${err}`);
                alert(`Error getting starship data, try again`);
            };
        }
        detailsStarship(uid);
    }, [uid]);
    return (
        <div className="image" style={{
            margin: "0px",
            padding: "0px",
            backgroundImage: "url(https://th.bing.com/th/id/R.9f92dacb81d41e47f1ea49845a97291f?rik=HKtHGJHSp3%2fnRA&pid=ImgRaw&r=0)",
            objectFit: "cover",
            backgroundPosition: "center"
        }}>
            <div className='container'>
                <div className="d-flex flex-wrap justify-content-center">
                    <div className="card m-2" style={{
                        width: "40rem", border: "2px, solid, yellow",
                        backgroundColor: "transparent",
                        border: "1px solid yellow"
                    }}>
                        <img src={`${"https://starwars-visualguide.com/assets/img/starships/" + uid}.jpg`}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                            }} />
                        <div className="card-body" style={{ color: "yellow" }}>
                            {starship ? (
                                <>
                                    <h1>Name:{starship.name}</h1>
                                    <h3>MGLT:{starship.MGLT}</h3>
                                    <h3>Cargo_capacity:{starship.cargo_capacity}</h3>
                                    <h3>Consumables:{starship.consumables}</h3>
                                    <h3>Cost in credits:{starship.cost_in_credits}</h3>
                                    <h3>Crew:{starship.crew}</h3>
                                    <h3>Hyperdrive rating:{starship.hyperdrive_rating}</h3>
                                    <h3>Length:{starship.length}</h3>
                                    <h3>Manufacturer:{starship.manufacturer}</h3>
                                    <h3>Edited:{starship.edited}</h3>
                                    <h3>Max atmosphering speed:{starship.max_atmosphering_speed}</h3>
                                    <h3>Model:{starship.model}</h3>
                                    <h3>Passengers:{starship.passengers}</h3>
                                    <h3>Pilots:{starship.pilots}</h3>
                                    <h3>Starship class:{starship.starship_class}</h3>
                                    <h3>Created:{starship.created}</h3>
                                </>
                            ) : ("")}
                            <div className='buttons d-flex justify-content-end'>
                                <button type="button"
                                    className="btn btn-danger"
                                    style={{ backgroundColor: "transparent", borderColor: "yellow", color: "white" }}
                                    onClick={() => handleToggleFavorites(starship.name)}>
                                    Favorite</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DetailsStarship
