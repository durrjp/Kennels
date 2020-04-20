import React, { useState, useEffect } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const LocationContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const LocationProvider = (props) => {
    // 
    const [locations, setLocations] = useState([])

    const getLocations = () => {
        return fetch("http://localhost:8088/locations")
            .then(res => res.json())
            .then(setLocations)
    }

    const addLocation = location => {
        return fetch("http://localhost:8088/locations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(location)
        })
            .then(getLocations)
    }

    /*
        Load all animals when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */

    /*initial effect hook(useEffect): run getLocations function when provider first loads
        - what's inside the array is a value that IF CHANGED will execute function again
        - since array is empty it is run once and never again
    */
    useEffect(() => {
        getLocations()
    }, [])

    /*seconday effect hook: will get executed everytime the value of "locations" changes
    */
    useEffect(() => {
        console.log("****  LOCATION APPLICATION STATE CHANGED  ****")
    }, [locations])


    /* defines what other components can use: other components can access the array of objects in "locations"
    and can invoke addlocation
    */
    return (
        <LocationContext.Provider value={{
            locations, addLocation
        }}>
            {props.children}
        </LocationContext.Provider>
    )
}