import classes from './Login.module.css'
import React, {Fragment, useContext, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthContext from "../../store/auth-context";


const isLongerThanSixDigits = (value) => value.trim().length > 3;

const ForgotPassword = () => {
    const navigate = useNavigate();
    const loginCtx = useContext(AuthContext);
    const [emailValidity, setEmailValidity] = useState(true);
    const [text, setText] = useState(false);

    const emailInputRef = useRef();


    const fetchEmail = async (email) => {
        const response = await fetch(`http://localhost:8081/api/owner/email/${email}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })

        return await response.json();
    }

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;

        const enteredEmailIsValid = isLongerThanSixDigits(enteredEmail);

        setEmailValidity({
            emailValidity: enteredEmailIsValid
        });

        if (!enteredEmailIsValid) {
            return;
        }

        console.log(enteredEmailIsValid);

        loginCtx.onLogin(enteredEmailIsValid);

        fetchEmail(enteredEmail).then(r => {
            setText(true);
            navigate('/checkEmail')
            return text;
        })

        navigate('/checkEmail')
    };

    const setErrorFalse = () => {
        loginCtx.setLogInError();
    }
    const goBack = () => {
        navigate('/login');

    }
    return (
        <Fragment>
            <form className={classes.form} onSubmit={confirmHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Please enter your email</label>
                    <input type='text' id='emailInput' ref={emailInputRef} onClick={setErrorFalse}/>
                    {!emailValidity && <p>Please enter a valid email!</p>}
                </div>
                <div className={classes.actions}>
                    <button className={classes.submit}>Send me code</button>
                    <button className={classes.submit} onClick={goBack}>Back</button>
                </div>
            </form>
        </Fragment>
    );

}

export default ForgotPassword;