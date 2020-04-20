import React, { useContext, useState } from "react"
import { Modal } from "reactstrap"
import { EmployeeContext } from "./EmployeeProvider"
import { LocationContext } from "../location/LocationProvider"
import Employee from "./Employee"
import "./Employee.css"
import EmployeeForm from "./EmployeeForm"

export default () => {
    const { employees } = useContext(EmployeeContext)
    const { locations } = useContext(LocationContext)

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    return (
        <div className="employees">
            <h1>Employees</h1>
            <button onClick={toggle}>
                Add Employee
            </button>
            <Modal isOpen={modal} toggle={toggle}>
                <EmployeeForm />
            </Modal>
            <article className="employeeList">
                {
                    employees.map(emp => {
                        const clinic = locations.find(l => l.id === emp.locationId)
                        return <Employee key={emp.id}
                                        employee={emp}
                                        location={clinic}/>
                    })
                }
            </article>
        </div>
    )
}