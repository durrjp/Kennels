import React, { useContext, useEffect, useState } from "react"
import { Modal } from "reactstrap"
import { LocationContext } from "../location/LocationProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import { AnimalContext } from "./AnimalProvider"
import Animal from "./Animal"
import AnimalForm from "./AnimalForm"
import AnimalSearch from "./AnimalSearch"
import "./Animals.css"

export default () => {
    const { animals, searchTerm } = useContext(AnimalContext)
    const [ filteredAnimals, setFiltered ] = useState([])
    const { locations } = useContext(LocationContext)
    const { customers } = useContext(CustomerContext)

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const currentUserId = parseInt(localStorage.getItem("kennel_customer"))
    //function to figure out if there is a user logged in
    const ifUserLoggedIn = () => {
        if (currentUserId !== undefined) {
            toggle()
        }
    }
    // if searchTerm is entered find subset of animals that include those letters
    useEffect(() => {
        const subset = animals.filter(animal => animal.name.toLowerCase().includes(searchTerm))
        setFiltered(subset)
    }, [searchTerm, animals])

    // not sure what I do
    useEffect(() => {
        setFiltered(animals)
    }, [animals])

    return (
        <div className="animals">
            <h1>Animals</h1>
            <AnimalSearch />
            <button onClick={ifUserLoggedIn}
                className="addAnimalButton">
                Make Appointment
            </button>
            <Modal isOpen={modal} toggle={toggle}>
                <AnimalForm isOpen={modal} toggle={toggle}>
                </AnimalForm>
            </Modal>
            {/* Map now queries data from locations and customers to find matching Ids from the animal object */}
            <article className="animalList">
                {
                    filteredAnimals.map(animal => {
                        const matchingCustomer = customers.find(c => c.id === animal.customerId)
                        const matchingLocation = locations.find(l => l.id === animal.locationId)

                        return <Animal key={animal.id}
                                    location={matchingLocation}
                                    customer={matchingCustomer}
                                    animal={animal} />
                    })
                }
            </article>
        </div>
    )
}