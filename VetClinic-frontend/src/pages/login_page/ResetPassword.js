import classes from './Login.module.css'
import React, {Fragment, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

const isLongerThanSixDigits = (value) => value.trim().length > 3;

const ResetPassword = () => {
    const navigate = useNavigate();
    const [passwordValidity, setPasswordValidity] = useState(true);

    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();
    const {id} = useParams();

    const resetPassword = async (enteredPassword) => {
        await fetch('http://localhost:8081/api/owner/updatePassword', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                password: enteredPassword
            })
        })
    }

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredPassword = passwordInputRef.current.value;
        const enteredConfirmPassword = confirmPasswordInputRef.current.value;

        const enteredPasswordIsValid = isLongerThanSixDigits(enteredPassword) && enteredConfirmPassword === enteredPassword;

        setPasswordValidity(enteredPasswordIsValid);
        console.log(enteredPassword);

        if (!enteredPasswordIsValid) {
            return;
        }

        console.log(enteredPassword);

        resetPassword(enteredPassword).then(r => {
            console.log(r);
            navigate('/login');
            alert("Password reset");
        })
    };

    return (
        <Fragment>
            <form className={classes.form} onSubmit={confirmHandler}>
                <div className={classes.control}>
                    <label htmlFor='newPassword'>New Password</label>
                    <input type='password' id='newPassword' ref={passwordInputRef}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input type='password' id='confirmPassword' ref={confirmPasswordInputRef}/>
                    {!passwordValidity && <p>Please enter a valid password!</p>}
                </div>
                <div className={classes.actions}>
                    <button className={classes.submit}>Confirm</button>
                </div>
            </form>
        </Fragment>
    );

}

export default ResetPassword;