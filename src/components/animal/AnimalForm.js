import React, { useContext, useRef, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import { LocationContext } from "../location/LocationProvider"
import "./Animals.css"
import { useHistory } from "react-router-dom"


export default props => {
    const { locations } = useContext(LocationContext)
    const { setAnimals, addAnimal, updateAnimal } = useContext(AnimalContext)
    const animalName = useRef()
    const animalBreed = useRef()
    const animalLocation = useRef()
    const currentUserId = parseInt(localStorage.getItem("kennel_customer"))
    let history = useHistory()


    const editMode = props.hasOwnProperty("animalId")

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newAnimal = Object.assign({}, props.animal)
        newAnimal[event.target.name] = event.target.value
        setAnimals(newAnimal)
    }

    const setDefaults = () => {
        if (editMode) {
            const animalId = parseInt(props.animalId)
            const selectedAnimal = props.animals.find(a => a.id === animalId) || {}
            setAnimals(selectedAnimal)
        }
    }

    useEffect(() => {
        setDefaults()
    }, [props.animals])

    const constructNewAnimal = () => {
        const locationId = parseInt(props.animal.locationId)

        if (locationId === 0) {
            window.alert("Please select a location")
        } else {
            if (editMode) {
                updateAnimal({
                    id: props.animal.id,
                    name: props.animal.name,
                    breed: props.animal.breed,
                    locationId: locationId,
                    treatment: props.animal.treatment,
                    customerId: currentUserId
                })
                    .then(() => history.push("/"))
            } else {
                addAnimal({
                    name: props.animal.name,
                    breed: props.animal.breed,
                    locationId: locationId,
                    treatment: props.animal.treatment,
                    customerId: currentUserId
                })
                    .then(() => history.push("/"))
            }
        }
    }

    return (
        <form className="animalForm">
            <h2 className="animalForm__title">{editMode ? "Update Animal" : "Admit Animal"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Animal name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        proptype="varchar"
                        placeholder="Animal name"
                        defaultValue={props.animal.name}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="breed">Animal breed: </label>
                    <input type="text" name="breed" required className="form-control"
                        proptype="varchar"
                        placeholder="Animal breed"
                        defaultValue={props.animal.breed}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="locationId">Location: </label>
                    <select name="locationId" className="form-control"
                        proptype="int"
                        value={props.animal.locationId}
                        onChange={handleControlledInputChange}>

                        <option value="0">Select a location</option>
                        {locations.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="treatment">Treatments: </label>
                    <textarea type="text" name="treatment" className="form-control"
                        proptype="varchar"
                        value={props.animal.treatment}
                        onChange={handleControlledInputChange}>
                    </textarea>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewAnimal()
                }}
                className="btn btn-primary">
                {editMode ? "Save Updates" : "Make Reservation"}
            </button>
        </form>
    )
}