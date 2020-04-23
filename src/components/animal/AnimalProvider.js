import React, { useState, useEffect } from "react"

export const AnimalContext = React.createContext()

export const AnimalProvider = (props) => {
    const [animals, setAnimals] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    const getAnimals = () => {
        return fetch("http://localhost:8088/animals")
            .then(res => res.json())
            .then(setAnimals)
    }

    const addAnimal = animal => {
        return fetch("http://localhost:8088/animals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(animal)
        })
            .then(getAnimals)
    }

    const updateAnimal = (animal) => {
		return fetch(`http://localhost:8088/animals}/${animal.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(animal)
		}).then(data => data.json());
	}

    const releaseAnimal = animalId => {
        return fetch(`http://localhost:8088/animals/${animalId}`, {
            method: "DELETE"
        })
            .then(getAnimals)
    }

    useEffect(() => {
        getAnimals()
    }, [])

    useEffect(() => {
        console.log("****  LOCATION APPLICATION STATE CHANGED  ****")
    }, [animals])

    return (
        <AnimalContext.Provider value={{
            animals, addAnimal, setSearchTerm, searchTerm, setAnimals, releaseAnimal, updateAnimal
        }}>
            {props.children}
        </AnimalContext.Provider>
    )
}