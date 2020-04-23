import React, { useState } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import "./Location.css"

export default (props) => {
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    return (
    <>
        <section className="location">
            <h3 className="location__name">{props.location.name}</h3>
            <div className="location__aniNumber" ># of Animals Treating: {props.filteredAnimals.length}</div>
            <div className="location__empNumber"># of Employees: {props.filteredEmployees.length}</div>
            <button onClick={toggle}>Details</button>
        </section>

        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                {props.location.name}
            </ModalHeader>
            <ModalBody>
                <div className="location__address">Address: {props.location.address}</div>
                <div className="location__animalsHeader">Our animals:</div>
                <ul className="location__animals">
                    {
                        props.filteredAnimals.map(animal => {
                        return <li>{animal.name}</li>
                        })
                    }
                </ul>
                <div className="location__employeesHeader">Our employees:</div>
                <ul className="location__employees">
                    {
                        props.filteredEmployees.map(employee => {
                        return <li>{employee.name}</li>
                        })
                    }
                </ul>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>Close</Button>
            </ModalFooter>
        </Modal>
    </>
    )
}