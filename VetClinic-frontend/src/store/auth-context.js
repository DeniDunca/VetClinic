import React from "react";

const AuthContext = React.createContext({
    isAuthenticated: false,
    isVet: false,
    userId: -1,
    onLogin: (name, password) => {
    },
    onLogout: () => {
    },
    setLogInError: () => {
    }
});

export default AuthContext;