import {NavLink} from "react-router-dom";
import {useContext, useEffect} from "react";
import AuthContext from "../../store/auth-context";
import classes from './Owner.module.css'
import Card from "../../utils/Card";
import photo1 from "../../assets/photo1.png"

const Owner = () => {
    const loginCtx = useContext(AuthContext);

    const logOutHandler = () => {
        loginCtx.onLogout();
    }

    return (
        <div>
            <h1 className={classes.h1}>Welcome to Dogtor's Clinic!</h1>
            <div className={classes.topnav}>
                <NavLink to={`/pets/${loginCtx.userId}`}> Pets</NavLink>
                <NavLink to={`/appointments/${loginCtx.userId}`}> Appointments</NavLink>
                <NavLink to={`/scheduleOwner/${loginCtx.userId}`}> Schedule</NavLink>
                <button onClick={logOutHandler}> Log out</button>
            </div>
            <Card><h1 className={classes.text}>Dogtor's Clinic is a website for everyone and for every little fury friend out there!</h1>
                <p className={classes.text}>Here you can create unique profiles for every pet, you can schedule appointments with our vets and
                keep in place all the information you need about your fellow cute amigos.</p>
                <p className={classes.text}>So, let's schedule a visit for a small check to your little Pufi!</p>
            </Card>
            <div>
                <img className={classes.img} alt={'photo1'} src={photo1}/>
            </div>
        </div>
    )
};

export default Owner;