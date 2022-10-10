import React, {useRef, useState} from "react";
import classes from "./Login.module.css";
import {useNavigate} from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const isLongerThanThreeDigits = (value) => value.trim().length > 3;
const isPhoneNumber = (value) => {
    if (/[0-9]+/.test(value) && value.trim().length > 9 && value.trim().length < 13)
        return true;
}
const isEmail = (value) => {
    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value))
        return true;
}
const Register = () => {
    const navigate = useNavigate();
    const nameInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();
    const phoneInputRef = useRef();
    const emailInputRef = useRef();

    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        password: true,
        phone: true,
        email: true
    });
    const [validCaptcha, setValidCaptcha] = useState(true);
    const [captchaBox, setCaptchaBox] = useState(false);

    const register = async (nameVal, passVal, phoneVal, emailVal) => {
        const response = await fetch('http://localhost:8081/api/owner/save', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: nameVal,
                password: passVal,
                phone: phoneVal,
                email: emailVal
            })
        });
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        return response;
    }

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredConfirmPassword = confirmPasswordInputRef.current.value;
        const enteredPhone = phoneInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;

        const enteredNameIsValid = isLongerThanThreeDigits(enteredName);
        const enteredPasswordIsValid = isLongerThanThreeDigits(enteredPassword)
            && enteredConfirmPassword === enteredPassword;
        const enteredPhoneIsValid = isPhoneNumber(enteredPhone);
        const enteredEmailIsValid = isEmail(enteredEmail);


        setFormInputsValidity({
            name: enteredNameIsValid,
            password: enteredPasswordIsValid,
            phone: enteredPhoneIsValid,
            email: enteredEmailIsValid
        });

        const formIsValid = enteredNameIsValid && enteredPasswordIsValid && enteredPhoneIsValid && enteredEmailIsValid;

        if (!formIsValid) {
            return;
        }
        if (!captchaBox) {
            setValidCaptcha(false);
            return;
        }


        console.log(enteredName, enteredPassword, enteredEmail, enteredPhone);

        register(enteredName, enteredPassword, enteredPhone, enteredEmail).then(r => {
            console.log(r);
            navigate('/login');
            alert("Account created")
        });

    }

    const setErrorFalse = () => {
    }
    const goBack = () => {
        navigate('/login');

    }


    const passwordControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`;
    const nameControlClasses = `${classes.control} ${formInputsValidity.password ? '' : classes.invalid}`;
    const emailControlClasses = `${classes.control} ${formInputsValidity.email ? '' : classes.invalid}`;
    const phoneControlClasses = `${classes.control} ${formInputsValidity.phone ? '' : classes.invalid}`;

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' ref={nameInputRef} onClick={setErrorFalse}/>
                {!formInputsValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={passwordControlClasses}>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' ref={passwordInputRef} onClick={setErrorFalse}/>
                {!formInputsValidity.password && <p>Please enter a valid password!</p>}
            </div>
            <div className={passwordControlClasses}>
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input type='password' id='confirmPassword' ref={confirmPasswordInputRef} onClick={setErrorFalse}/>
                {!formInputsValidity.password && <p>Please enter a valid password!</p>}
            </div>
            <div className={phoneControlClasses}>
                <label htmlFor='phone'>Phone</label>
                <input type='text' id='phone' ref={phoneInputRef} onClick={setErrorFalse}/>
                {!formInputsValidity.phone && <p>Please enter a valid phone number!</p>}
            </div>
            <div className={emailControlClasses}>
                <label htmlFor='email'>Email</label>
                <input type='text' id='email' ref={emailInputRef} onClick={setErrorFalse}/>
                {!formInputsValidity.email && <p>Please enter a valid email!</p>}
            </div>
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
                <button className={classes.submit}>Confirm</button>
                <button className={classes.submit} onClick={goBack}>Back</button>
            </div>
        </form>
    );
}

export default Register;