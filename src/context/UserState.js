import React, { useReducer } from 'react'
import UserContext from './UserContext'
import UserReducer from './UserReducer'

import axiosClient from './../config/axios'

const UserState = (props) => {

    const initialState = {
        user: {
            username: "",
            email: ""
        },
        authStatus: null,
        token: null,
        redirect_url: ""
    }

    const [ globalState, dispatch ] = useReducer(UserReducer, initialState)

    const registerUser = async (dataForm) => {

        try {
            const res = await axiosClient.post("/api/users/create", dataForm)

            dispatch({
                type: "REGISTER_SUCCESS",
                payload: res.data
            })    

        } catch (error) {
            console.log(error)

                // dispatch({
                //     type: "REGISTER_ERROR",
                //     payload: error
                // })
        }
        
    }


    

    const verifyingToken = async () => {

        const token = localStorage.getItem("token")

        // PREPARAR LA PETICIÓN (REQ), DENTRO DE HEADERS, CON EL TOKEN
        if(token) {
            axiosClient.defaults.headers.common['x-auth-token'] = token
        } else {
            delete axiosClient.defaults.headers.common['x-auth-token']
        }

        console.log("AxiosClient:", axiosClient.defaults.headers.common)

        // ENVIAMOS LA PETICIÓN
        try {
            
            const res = await axiosClient.get('/api/auth')

            console.log(res) // userFound de retorno

            dispatch({
                type: "GET_USER_INFO",
                payload: res.data.userFound
            })
            
        } catch (error) {
            
        }

    }

    const loginUser = async (dataForm) => {

        const form = {
            email: dataForm.email,
            password: dataForm.password
        }

        try {
            const res = await axiosClient.post('/api/auth/login', form)

            console.log(res)

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: res.data
            })

        } catch(e) {

        }

    }

    const logOut = async () => {

        dispatch({
            type: "LOGOUT_USER"
        })

    }


    const generateCheckout = async (dataForm) => {

        try {
            const res = await axiosClient.post('/api/sessions/create-checkout-session', dataForm)

            
            dispatch({
                type: "REALIZAR_REDIRECCION",
                payload: res.data.redirect_url
            })
        

        } catch(e) {

        }


    }


    const deleteRedirect = async() => {

        dispatch({
            type: "BORRAR_REDIRECCION"
        })

    }

    return (
        <UserContext.Provider value={{
            user: globalState.user,
            authStatus: globalState.authStatus,
            token: globalState.token,
            redirect_url: globalState.redirect_url,
            registerUser,
            verifyingToken,
            loginUser,
            logOut,
            generateCheckout,
            deleteRedirect
        }}>

            {props.children}

        </UserContext.Provider>
    )


}


export default UserState