import React, { useContext } from "react"
import { LocationContext } from "./LocationProvider"
import Location from "./Location"
import "./Location.css"

export default () => {
    const { locations } = useContext(LocationContext)
    // <Location /> calls Location component and passes an object with properties of key and location
    return (
        <div className="locations">
            <h1>Locations</h1>
            <article className="locationList">
                {
                    locations.map(loc => <Location key={loc.id} location={loc} />)
                }
            </article>
        </div>
    )
}