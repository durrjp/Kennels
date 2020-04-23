import React, { useContext } from "react"
import { LocationContext } from "./LocationProvider"
import Location from "./Location"
import "./Location.css"
import { AnimalContext } from "../animal/AnimalProvider"
import { EmployeeContext } from "../employee/EmployeeProvider"

export default () => {
    const { locations } = useContext(LocationContext)
    const { animals } = useContext(AnimalContext)
    const { employees } = useContext(EmployeeContext)

    // <Location /> calls Location component and passes an object with properties of key and location
    return (
        <div className="locations">
            <h1>Locations</h1>
            <article className="locationList">
                {
                    locations.map(loc => {
                        const filteredAnimals = animals.filter(animal => {
                            return animal.locationId === loc.id
                        })
                        const filteredEmployees = employees.filter(employee => {
                            return employee.locationId === loc.id
                        })

                        return <Location key={loc.id} location={loc} filteredAnimals={filteredAnimals} filteredEmployees={filteredEmployees}/>
                    })
                }
            </article>
        </div>
    )
}