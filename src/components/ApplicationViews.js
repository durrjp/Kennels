import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import { LocationProvider } from "./location/LocationProvider"
import { AnimalProvider } from "./animal/AnimalProvider"
import { CustomerProvider } from "./customer/CustomerProvider"
import { EmployeeProvider } from "./employee/EmployeeProvider"
import LocationList from "./location/LocationList"
import AnimalList from "./animal/AnimalList"
import CustomerList from "./customer/CustomerList"
import EmployeeList from "./employee/EmployeeList"
import "./AppViewsLayout.css"
import { DataStore } from "./DataStore"




// controller component for NavBar

export default (props) => {
    const [activeList, setActiveList] = useState("locations")
    const [components, setComponents] = useState()


    const showLocations = () => (
        <LocationProvider>
            <EmployeeProvider>
                <AnimalProvider>
                    <LocationList />
                </AnimalProvider>
            </EmployeeProvider>
        </LocationProvider>
    )

    const showAnimals = () => (
        <AnimalProvider>
            <LocationProvider>
                <CustomerProvider>
                    <AnimalList />
                </CustomerProvider>
            </LocationProvider>
        </AnimalProvider>
    )

    const showCustomers = () => (
        <CustomerProvider>
            <CustomerList />
        </CustomerProvider>
    )

    const showEmployees = () => (
        <EmployeeProvider>
            <LocationProvider>
                <EmployeeList />
            </LocationProvider>
        </EmployeeProvider>
    )

    /*
        This effect hook determines which list is shown
        based on the state of the `activeList` variable.
    */
    useEffect(() => {
        if (activeList === "customers") {
            setComponents(showCustomers)
        }
        else if (activeList === "animals") {
            setComponents(showAnimals)
        }
        else if (activeList === "locations") {
            setComponents(showLocations)
        }
        else if (activeList === "employees") {
            setComponents(showEmployees)
        }
    }, [activeList])
    return (
        <>
            <div className="mainContainer">
                <DataStore>
                <div className="dataContainer">
                    <h1>Nashville Kennels</h1>
                    <small>Loving care when you're not there.</small>
                    {
                        localStorage.getItem("kennel_customer")
                            ? <div className="navbar__item">
                                <Link className="navbar__link"
                                    to=""
                                    onClick={e => {
                                        e.preventDefault()
                                        localStorage.removeItem("kennel_customer")
                                        props.history.push("/")
                                    }}
                                >Logout</Link>
                    </div>
                    : ""
                    }
                    <div className="listContainer">
                        <div className="links">
                            <div className="fakeLink href" onClick={() => setActiveList("locations")}>Locations</div>
                            <div className="fakeLink href" onClick={() => setActiveList("animals")}>Animals</div>
                            <div className="fakeLink href" onClick={() => setActiveList("customers")}>Customers</div>
                            <div className="fakeLink href" onClick={() => setActiveList("employees")}>Employees</div>
                        </div>
                        <div className="listDisplay">
                            {components}
                        </div>
                    </div>

                </div>
                </DataStore>
            </div>
        </>
    )
}