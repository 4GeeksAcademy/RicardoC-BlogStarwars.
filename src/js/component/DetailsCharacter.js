import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { useParams } from "react-router-dom";

const DetailsCharacter = () => {
    const {store, actions} = useContext(Context);
    const url = "https://www.swapi.tech/api/";
    const { uid } = useParams();
    const [character, setCharacter] = useState(null);
    const isFavorite = (name) => { 
     
        return store.favorites.some(item => item.name === name);
    };
    const handleToggleFavorites = (name) => { 
        if (isFavorite(name)) { 
            actions.deleteFavorites(name); 
        } 
    };

    useEffect(() => {
        const detailsCharacter = async (uid) => {
            console.log("id:", uid);
            try {
                const resp = await fetch(`${url}people/${uid}`, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (!resp.ok) {
                    throw new Error(`Character Request Failed ${resp.status}`)
                }
                const data = await resp.json()
                setCharacter(data.result.properties)
                console.log(data);
            } catch (err) {
                console.error(`Failed to process request to the character API ${err}`);
                alert(`Error getting character data, try again`);
            };
        }
        detailsCharacter(uid);
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
                        <img src={`${"https://starwars-visualguide.com/assets/img/characters/" + uid}.jpg`}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                            }} />
                        <div className="card-body" style={{ color: "yellow" }}>
                            {character ? (
                                <>
                                    <h1>Name:{character.name}</h1>
                                    <h3>Birth year:{character.birth_year}</h3>
                                    <h3>Eye color:{character.hair_color}</h3>
                                    <h3>Gender:{character.gender}</h3>
                                    <h3>Hair color:{character.hair_color}</h3>
                                    <h3>Height:{character.height}</h3>
                                    <h3>Homeworld:{character.homeworld}</h3>
                                    <h3>Skin color:{character.skin_color}</h3>
                                    <h3>Created:{character.created}</h3>
                                    <h3>Edited:{character.edited}</h3>
                                    <h3>Species:{character.species}</h3>
                                    <h3>Starships:{character.starships}</h3>
                                </>
                            ) : ("")}
                            <div className='buttons d-flex justify-content-end'><button type="button"
                                className="btn btn-danger"
                                style={{ backgroundColor: "transparent", borderColor: "yellow", color: "white" }}
                                onClick={() => handleToggleFavorites(character.name)}>
                                Favorite</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DetailsCharacter
