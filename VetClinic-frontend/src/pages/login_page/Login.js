import classes from './Login.module.css'
import React, {useContext, useRef, useState, Fragment} from "react";
import {Navigate, NavLink, useNavigate} from "react-router-dom";
import AuthContext from "../../store/auth-context";
import ReCAPTCHA from "react-google-recaptcha";
const isLongerThanThreeDigits = (value) => value.trim().length > 3;

const Login = () => {
    const navigate = useNavigate();
    const loginCtx = useContext(AuthContext);
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        password: true
    });
    const [validCaptcha, setValidCaptcha] = useState(true);
    const [captchaBox, setCaptchaBox] = useState(false);

    const nameInputRef = useRef();
    const passwordInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        const enteredNameIsValid = isLongerThanThreeDigits(enteredName);
        const enteredPasswordIsValid = isLongerThanThreeDigits(enteredPassword);

        setFormInputsValidity({
            name: enteredNameIsValid,
            password: enteredPasswordIsValid,
        });

        let formIsValid = enteredNameIsValid && enteredPasswordIsValid;

        if (!formIsValid) {
            return;
        }
        if (!captchaBox) {
            setValidCaptcha(false);
            return;
        }

        console.log(enteredName);
        console.log(enteredPassword);
        loginCtx.onLogin(enteredName, enteredPassword);
    };

    const passwordControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`;
    const nameControlClasses = `${classes.control} ${formInputsValidity.password ? '' : classes.invalid}`;

    const setErrorFalse = () => {
        loginCtx.setLogInError();
    }

    const redirectRegister = () => {
        navigate('/register');
    }

    return (
        <div>
        <Fragment>
            {loginCtx.isVet && <Navigate to="/vet"/>}
            {loginCtx.isAuthenticated && !loginCtx.isVet && <Navigate to="/"/>}
            <form className={classes.form} onSubmit={confirmHandler}>
                <div className={passwordControlClasses}>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' ref={nameInputRef} onClick={setErrorFalse}/>
                    {!formInputsValidity.name && <p>Please enter a valid name!</p>}
                </div>
                <div className={nameControlClasses}>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' ref={passwordInputRef} onClick={setErrorFalse}/>
                    {!formInputsValidity.password && <p>Please enter a valid password!</p>}
                </div>
                {loginCtx.logInError && <p>Invalid log in Data. Please try again!</p>}
                <div align="center">
                    <ReCAPTCHA
                        sitekey="6LeXNKYfAAAAAHB1f4RSa_-Ki-8zi9ETphhTkgy_"
                        onChange={() => {
                            setCaptchaBox(true)
                        }}
                    />
                    {!validCaptcha && <p>Please check the Captcha!</p>}
                </div>
                <div className={classes.actions}>
                    <p>Forgot password?</p> <NavLink className={classes.navLink} to={'/forgotPassword'}>Reset
                    here</NavLink>
                    <button type='button' onClick={redirectRegister}>
                        Create Account
                    </button>
                    <button className={classes.submit}>Confirm</button>
                </div>
            </form>
        </Fragment>
        </div>
    );

}

export default Login;