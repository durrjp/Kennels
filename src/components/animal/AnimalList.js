import React, { useContext } from "react"
import { AnimalContext } from "./AnimalProvider"
import { LocationContext } from "../location/LocationProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import Animal from "./Animal"
import "./Animals.css"

export default () => {
    const { animals } = useContext(AnimalContext)
    const { locations } = useContext(LocationContext)
    const { customers } = useContext(CustomerContext)

    return (
        <div className="animals">
            {/* Map now queries data from locations and customers to find matching Ids from the animal object */}
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
        </div>
    )
}