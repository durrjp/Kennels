import React, { useContext } from "react"
import { CustomerContext } from "./CustomerProvider"
import Customer from "./Customer"
import "./Customer.css"

export default () => {
    const { customers } = useContext(CustomerContext)
    
    return (
        <div className="customers">
            <h1>Customers</h1>
            <article className='customerList'>
            {
                customers.map(emp => <Customer key={emp.id} customer={emp} />)
            }
            </article>
        </div>
    )
}