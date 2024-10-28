const getState = ({ getStore, getActions, setStore }) => {
	const url = "https://www.swapi.tech/api/";
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			
			characters: [],
			planets: [],
			starships: [],
			favorites: [],
			details: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			addFavorites: (item) => {//llamo a store y agrego a favorites el nuevo elemento(más los que ya están).
                if (!getStore().favorites.some(fav => fav[0] === item[0])) { // Verifica si el ítem ya está en
                    setStore({ favorites: [...getStore().favorites, item] })
                    console.log("Estado después de agregar:", getStore().favorites);
                }
            },
            deleteFavorites: (name) => {//Creo un array que tiene todos los item de favorites menos los que su name coincide con el dado.
                const deletedFav = getStore().favorites.filter(item => item !== name);
                console.log("Intentando eliminar:", name);
                setStore({ favorites: deletedFav })//Ese array nuevo remplaza al anterior.
                console.log("Estado después de eliminar:", getStore().favorites);
            },
            getCharacters: async () => {
                try {
                    const resp = await fetch(`${url}people`, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    if (!resp.ok) {
                        throw new Error(`Characters Request Failed ${resp.status}`)
                    }
                    const data = await resp.json()
                    setStore({ //Asigno la data(info de personajes) a mi array characters.
                        characters: data.results
                    })
                } catch (err) {
                    console.error(`Failed to process request to the characters API ${err}`);
                    alert(`Error getting characters data, try again`);
                }
            },
            /*detailsCharacter: async (uid) => {
                console.log("uid:", uid);
                try {
                    const resp = await fetch(${url}people/${uid}, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    if (!resp.ok) {
                        throw new Error(Character Request Failed ${resp.status})
                    }
                    const data = await resp.json()
                    setStore({
                        details: data.result
                    })
                    console.log(data);
                } catch (err) {
                    console.error(Failed to process request to the character API ${err});
                    alert(Error getting character data, try again);
                }
            },*/
            getPlanets: async () => {
                try {
                    const resp = await fetch(`${url}planets`, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    if (!resp.ok) {
                        throw new Error(`planets Request Failed ${resp.status}`)
                    }
                    const data = await resp.json()
                    setStore({
                        planets: data.results
                    })
                } catch (err) {
                    console.error(`Failed to process request to the planets API ${err}`);
                    alert(`Error getting planets data, try again`);
                }
            },
            /*detailsPlanet: async (uid) => {
                try {
                    const resp = await fetch(${url}planets/${uid}, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    if (!resp.ok) {
                        throw new Error(Planet Request Failed ${resp.status})
                    }
                    const data = await resp.json()
                    setStore({
                        details: data.result
                    })
                } catch (err) {
                    console.error(Failed to process request to the planet API ${err});
                    alert(Error getting planet data, try again);
                }
            },*/
            getStarships: async () => { 
                try {
                    const resp = await fetch(`${url}starships`, { 
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    if (!resp.ok) {
                        throw new Error(`starships Request Failed ${resp.status}`)
                    }
                    const data = await resp.json()
                    setStore({
                        starships: data.results
                    })
                } catch (err) {
                    console.error(`Failed to process request to the starships API ${err}`);
                    alert(`Error getting starships data, try again`);
                }
            },
            /*detailsStarship: async (uid) => {
                try {
                    const resp = await fetch(${url}starships/${uid}, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    if (!resp.ok) {
                        throw new Error(Starship Request Failed ${resp.status})
                    }
                    const data = await resp.json()
                    setStore({
                        details: data.result
                    })
                } catch (err) {
                    console.error(Failed to process request to the starship API ${err});
                    alert(Error getting starship data, try again);
                }
            }*/
        }
    };
};
export default getState;
		
