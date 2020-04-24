import React from "react"
import { LocationProvider } from "./location/LocationProvider"
import { EmployeeProvider } from "./employee/EmployeeProvider"
import { AnimalProvider } from "./animal/AnimalProvider"
import { CustomerProvider } from "./customer/CustomerProvider"

export const DataStore = props => (
    <AnimalProvider>
        <CustomerProvider>
            <EmployeeProvider>
                <LocationProvider>
                    {props.children}
                </LocationProvider>
            </EmployeeProvider>
        </CustomerProvider>
    </AnimalProvider>
)