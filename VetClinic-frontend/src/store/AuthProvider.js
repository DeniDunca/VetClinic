import React, {useState} from "react";
import AuthContext from "./auth-context";

const defaultAuthState = {
    isAuthenticated: false,
    isVet: false,
    userId: -1,
    logInError: false
}

const AuthProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(defaultAuthState);

    const fetchLoginTime = async (userId) =>{
        const time = new Date();
        const response = await fetch(`http://localhost:8081/api/activity/save/${userId}/${time}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        const responseData = await response.json();
        console.log(responseData);
        localStorage.setItem("activity",responseData.data.activity.id);
    }

    const fetchLogoutTime = async (activityId) =>{
        const time = new Date();
        const response = await fetch(`http://localhost:8081/api/activity/update/${activityId}/${time}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
    }

    const loginHandler = async (name, password) => {
        const fetchLogInVet = async () => {
            const response = await fetch('http://localhost:8081/api/vet/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    password: password
                })
            });
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            setIsLoggedIn({
                isAuthenticated: true,
                userId: responseData.data.vets.id,
                isVet: true,
                logInError: false
            });
        }

        const fetchLogInOwner = async () => {
            const response = await fetch('http://localhost:8081/api/owner/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    password: password
                })
            });
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            setIsLoggedIn({
                isAuthenticated: true,
                userId: responseData.data.owners.id,
                isVet: false,
                logInError: false
            });
            return responseData.data.owners.id;
        }

        fetchLogInVet().catch((error) => {
            fetchLogInOwner().then((id) =>{fetchLoginTime(id)}).catch((error) => {
                setIsLoggedIn({...isLoggedIn, logInError: true});
            })
        })

    };

    const logoutHandler = () => {

        setIsLoggedIn({
            isAuthenticated: false,
            userId: -1,
            isVet: false,
            logInError: false
        })

        fetchLogoutTime(localStorage.getItem("activity")).catch((error)=>{console.log(error)})
    }

    const setNoLogInError = () => {
        setIsLoggedIn({...isLoggedIn, logInError: false});
    }


    const authContext = {
        isAuthenticated: isLoggedIn.isAuthenticated,
        userId: isLoggedIn.userId,
        isVet: isLoggedIn.isVet,
        logInError: isLoggedIn.logInError,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        setLogInError: setNoLogInError
    }

    return <AuthContext.Provider value={authContext}>
        {props.children}
    </AuthContext.Provider>

}

export default AuthProvider;