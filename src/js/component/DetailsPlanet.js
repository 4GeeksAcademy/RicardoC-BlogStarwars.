import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { useParams } from "react-router-dom";
const DetailsPlanet = () => {
    const {store, actions} = useContext(Context);
    const url = "https://www.swapi.tech/api/";
    const { uid } = useParams();
    const [planet, setPlanet] = useState(null);
    const isFavorite = (name) => { 
        
        return store.favorites.some(item => item.name === name);
    };
    const handleToggleFavorites = (name) => { 
        if (isFavorite(name)) { 
            actions.deleteFavorites(name);
        } 
    };
    useEffect(() => {
        const detailsPlanet = async (uid) => {
            console.log("id:", uid);
            try {
                const resp = await fetch(`${url}planets/${uid}`, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (!resp.ok) {
                    throw new Error(`Planet Request Failed ${resp.status}`)
                }
                const data = await resp.json()
                setPlanet(data.result.properties)
                console.log(data);
            } catch (err) {
                console.error(`Failed to process request to the Planet API ${err}`);
                alert(`Error getting Planet data, try again`);
            };
        }
        detailsPlanet(uid);
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
                    <img src={`${"https://starwars-visualguide.com/assets/img/planets/" + uid}.jpg`}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                        }} />
                    <div className="card-body" style={{ color: "yellow" }}>
                        {planet ? (
                            <>
                                <h1>Name:{planet.name}</h1>
                                <h3>Climate:{planet.climate}</h3>
                                <h3>Diameter:{planet.diameter}</h3>
                                <h3>Gravity:{planet.gravity}</h3>
                                <h3>Orbital period:{planet.orbital_period}</h3>
                                <h3>Population:{planet.population}</h3>
                                <h3>Residents:{planet.residents}</h3>
                                <h3>Rotation period:{planet.rotation_period}</h3>
                                <h3>Created:{planet.created}</h3>
                                <h3>Edited:{planet.edited}</h3>
                                <h3>Surface water:{planet.surface_water}</h3>
                                <h3>Terrain:{planet.terrain}</h3>
                            </>
                        ) : ("")}
                        <div className='buttons d-flex justify-content-end'><button type="button"
                            className="btn btn-danger"
                            style={{ backgroundColor: "transparent", borderColor: "yellow", color: "white" }}
                            onClick={() => handleToggleFavorites(planet.name)}>
                            Favorite</button></div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
export default DetailsPlanet
