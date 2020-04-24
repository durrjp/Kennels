import React from "react"
import { Route, Redirect } from "react-router-dom"
import ApplicationViews from "./ApplicationViews"
import Login from "./auth/Login"
import Register from "./auth/Register"
import "./Kennel.css"


export default () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("kennel_customer")) {
                return (
                    <>
                        <Route render={props => <ApplicationViews {...props} />} />
                    </>
                )
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/register" render={props => <Register {...props} />} />
    </>
)