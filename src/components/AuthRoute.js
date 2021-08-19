import React, {useContext, useEffect, useState} from "react";

import { 
    Route, 
    Redirect } from "react-router-dom";

import UserContext from './../context/UserContext'



export default function AuthRoute ( { component: Component, ...props} ){

    const userCtx = useContext(UserContext)

    const [loading, setLoading] = useState(true)

    const { 
        authStatus,
        verifyingToken } = userCtx
    
    console.log("authStatus", authStatus)

    useEffect( () => {

        const verifyingAuthStatus = async () => {
            await verifyingToken()
            return setLoading(false)
        }


        verifyingAuthStatus()
        
        
        
    } , [ authStatus ])



    return(
    <Route 
        {...props}
        render={ ( ) => {

            if(loading) return null

            return authStatus ?
            (<Redirect to="/dashboard" />)
            :
            (<Component {...props} />)

        }}
    />)


}
