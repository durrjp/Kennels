import React, { useState } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import "./Employee.css"

export default ({employee, location}) => {
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    return (
        <>
        <section className="employee">
            <h3 className="employee__name">{employee.name}</h3>
            <button onClick={toggle}>Details</button>
        </section>
        
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                {employee.name}
            </ModalHeader>
            <ModalBody>
                <div className="employee__address">Address: {employee.address}</div>
                <div className="employee__location">Location working: {location.name}</div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>Close</Button>
            </ModalFooter>
        </Modal>
        </>
    )
}