import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import "./Animals.css"
import { AnimalContext } from "./AnimalProvider"
import AnimalForm from "./AnimalForm"

export default (props) => {
    const [modal, setModal] = useState(false)
    const { releaseAnimal } = useContext(AnimalContext)
    const chosenAnimalId = props.animal.id
    const toggle = () => setModal(!modal)
    let history = useHistory()

    return (
        <>
            <section className="animal">
                <h3 className="animal__name">{props.animal.name}</h3>
                <button onClick={toggle}>Details</button>
                <button className="btn--release"
                        onClick={() => {
                            releaseAnimal(chosenAnimalId)
                                .then(() => {
                                    history.push("/animals")
                                })
                        }}
                >Release</button>
            </section>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    {props.animal.name}
                </ModalHeader>
                <ModalBody>
                    <div className="animal__breed">
                        <label className="label--animal">Breed:</label> {props.animal.breed}
                    </div>
                    <div className="animal__location">
                        <label className="label--animal">Location:</label> {props.location.name}
                    </div>
                    <div className="animal__owner">
                        <label className="label--animal">Customer:</label> {props.customer.name}
                    </div>
                    <button animalId={props.animal.id} onClick={toggle}>Edit</button>
                    <Modal isOpen={modal} toggle={toggle}>
                        <AnimalForm key={props.animal.id} animalId={props.animal.id} toggle={toggle}></AnimalForm>
                    </Modal>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}