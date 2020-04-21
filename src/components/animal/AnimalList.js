import React, { useContext, useState } from "react"
import { Modal } from "reactstrap"
import { LocationContext } from "../location/LocationProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import Animal from "./Animal"
import "./Animals.css"
import AnimalForm from "./AnimalForm"
import { AnimalContext } from "./AnimalProvider"

export default () => {
    const { animals } = useContext(AnimalContext)
    const { locations } = useContext(LocationContext)
    const { customers } = useContext(CustomerContext)

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const currentUserId = parseInt(localStorage.getItem("kennel_customer"))

    const ifUserLoggedIn = () => {
        if (currentUserId !== undefined) {
            toggle()
        }
    }

    return (
        <div className="animals">
            <h1>Animals</h1>
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
                    animals.map(animal => {
                        const owner = customers.find(c => c.id === animal.customerId)
                        const clinic = locations.find(l => l.id === animal.locationId)

                        return <Animal key={animal.id}
                                    location={clinic}
                                    customer={owner}
                                    animal={animal} />
                    })
                }
            </article>
        </div>
    )
}