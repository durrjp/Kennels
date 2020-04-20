import React, { useState, useEffect } from "react"

export const EmployeeContext = React.createContext()

export const EmployeeProvider = (props) => {
    const [employees, setEmployees] = useState([])


    const getEmployees = () => {
        return fetch("http://localhost:8088/employees")
            .then(res => res.json())
            .then(setEmployees)
    }

    const addEmployee = employee => {
        return fetch("http://localhost:8088/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        })
            .then(getEmployees)
    }

    const constructNewEmployee = (employeeLocation, employeeName) => {
        const locationId = parseInt(employeeLocation.current.value)

        if (locationId === 0) {
            window.alert("Please select a location")
        } else {
            addEmployee({
                name: employeeName.current.value,
                locationId: locationId
            })
        }
    }

    useEffect(() => {
        getEmployees()
    }, [])

    useEffect(() => {
        // console.log("****  LOCATION APPLICATION STATE CHANGED  ****")
    }, [employees])

    return (
        <EmployeeContext.Provider value={{
            employees, addEmployee, constructNewEmployee
        }}>
            {props.children}
        </EmployeeContext.Provider>
    )
}