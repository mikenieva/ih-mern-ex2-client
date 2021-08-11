import React, { useReducer } from 'react'
import UserContext from './UserContext'
import UserReducer from './UserReducer'

import axiosClient from './../config/axios'


const UserState = (props) => {

    const initialState = {
        user: {
            username: null,
            email: null,
        },
        authStatus: false,
        loading: true
    }


    const [ globalState, dispatch ] = useReducer(UserReducer, initialState)

    const registerUser = async (dataForm) => {

        try {
            const res = await axiosClient.post("/api/users/create", dataForm)
            dispatch({
                type: "REGISTRO_EXITOSO",
                payload: res.data
            })

        } catch (error) {
            
        }
    }


    const verifyingToken = async () => {

        const token = localStorage.getItem('token')

        if(token){
            axiosClient.defaults.headers.common['x-auth-token'] = token
        } else{
            delete axiosClient.defaults.headers.common['x-auth-token']
        }

        try {

            const respuesta = await axiosClient.get("/api/auth")
            console.log(respuesta)
            dispatch({
                type: "OBTENER_USUARIO",
                payload: respuesta.data.usuario
            })

        } catch (error) {
            dispatch({
                type: "LOGIN_ERROR"
            })
        }


    }


    const loginUser = async (dataForm) => {
        console.log("dataForm", dataForm)
        try {
            const respuesta = await axiosClient.post("/api/auth", dataForm)

            console.log(respuesta)

            dispatch({
                type: "LOGIN_EXITOSO",
                payload: respuesta.data
            })

        } catch (error) {
            dispatch({
                type: "LOGIN_ERROR"
            })
        }
    }


    return (
        <UserContext.Provider value={{
            user: globalState.user,
            authStatus: globalState.authStatus,
            loading: globalState.loading,
            registerUser,
            verifyingToken,
            loginUser
        }}>

            {props.children}

        </UserContext.Provider>
    )


}


export default UserState