import React, { useState, useEffect } from "react"

export const AnimalContext = React.createContext()

export const AnimalProvider = (props) => {
    const [animals, setAnimals] = useState([])

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

    const constructNewAnimal = (animalLocation, animalName, animalBreed, currentUserId) => {
        const locationId = parseInt(animalLocation.current.value)


        if (locationId === 0) {
            window.alert("Please select a location")
        } else {
            addAnimal({
                name: animalName.current.value,
                locationId: locationId,
                customerId: currentUserId,
                breed: animalBreed.current.value
            })
        }
    }

    useEffect(() => {
        getAnimals()
    }, [])

    useEffect(() => {
        console.log("****  LOCATION APPLICATION STATE CHANGED  ****")
    }, [animals])

    return (
        <AnimalContext.Provider value={{
            animals, addAnimal, constructNewAnimal
        }}>
            {props.children}
        </AnimalContext.Provider>
    )
}