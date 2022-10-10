import { NavLink} from "react-router-dom";
import {useContext, useEffect} from "react";
import AuthContext from "../../store/auth-context";
import classes from "./Vet.module.css";
import * as SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import Card from "../../utils/Card";
import photo1 from "../../assets/photo1.png";

const Vet = () => {
    const loginCtx = useContext(AuthContext);

    const logOutHandler = () => {
        loginCtx.onLogout();
    }

    useEffect(() => {
        console.log("In Connect");
        const URL = "http://localhost:8081/socket";
        const websocket = new SockJS(URL);
        const stompClient = Stomp.over(websocket);
        stompClient.connect({}, frame => {
            console.log("Conectat la " + frame);
            stompClient.subscribe("/notification/socket/api/appointment", notification => {
                const values = notification.body.split(":");
                const vetId = parseInt(values[values.length - 1].slice(0,-1));
                if (loginCtx.userId === vetId) {
                    alert("Check your new appointment!");
                }
            })
        })
    },[])

    return (
        <div>
            <h1 className={classes.h1}>Hello Vet!</h1>
            <div className={classes.topnav}>
                <NavLink to={`/appointmentsVet/${loginCtx.userId}`}>See appointments</NavLink>
                <NavLink to={`/manageVets/${loginCtx.userId}`}>Manage vets</NavLink>
                <NavLink to={`/scheduleVets/${loginCtx.userId}`}>Schedule</NavLink>
                <NavLink to={'/ownerActivity'}>OwnerActivity</NavLink>
                <button onClick={logOutHandler}>Log out</button>
            </div>
            <Card><p className={classes.p}>This is the administration page</p></Card>
            <div>
                <img className={classes.img} alt={'photo1'} src={photo1}/>
            </div>
        </div>
    );
}

export default Vet;