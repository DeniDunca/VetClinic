import {useContext, useEffect, useState} from "react";
import Appointment from "../../components/appointments/Appointment";
import AuthContext from "../../store/auth-context";
import AddAppointment from "../../components/appointments/AddAppointment";
import {NavLink} from "react-router-dom";
import SearchDateOwner from "../../utils/SearchDateOwner";
import SearchBy from "../../utils/SearchOwner";
import classes from "./Owner.module.css";
import Card from "../../utils/Card";

const Appointments = () => {
    const loginCtx = useContext(AuthContext);
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    const fetchAppointments = async () => {
        const response = await fetch(`http://localhost:8081/api/owner/getAppointments/${loginCtx.userId}`);

        if (!response.ok) {
            throw new Error("Something went wrong");
        }

        const responseData = await response.json();
        const loadedAppointments = [];

        const data = responseData.data.appointments;
        for (const key in data) {
            loadedAppointments.push({
                id: data[key].id,
                vet: data[key].vetId,
                pet: data[key].petId,
                date: data[key].date,
                finish: data[key].finish,
                start: data[key].start,
                reason: data[key].reason,
                vetName: data[key].vetName,
                petName: data[key].petName
            });
        }

        setAppointments(loadedAppointments);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchAppointments().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [loginCtx.userId]);

    if (isLoading) {
        return <section>
            <p>Loading...</p>
        </section>
    }

    if (httpError) {
        return <section>
            <p>{httpError}</p>
        </section>
    }

    const update = async () => {
        console.log("Appointment update");
        await fetchAppointments();
    }


    const appointmentList = appointments.map(app => <Appointment key={app.id} id={app.id} vet={app.vetName}
                                                                 pet={app.petName} vetName={app.vetName}
                                                                 petName={app.petName}
                                                                 date={app.date} start={app.start} finish={app.finish}
                                                                 reason={app.reason} update={update}/>);

    return (
        <div>
            <h1 className={classes.h1}>My Appointments</h1>
            <div className={classes.topnav}>
                <NavLink to={"/"}>Home</NavLink>
            </div>
            <Card>
                <div className={classes.div}>
                    <SearchDateOwner update={update}/>
                </div>
            </Card>
            <Card>
                <div className={classes.div}>
                    <SearchBy update={update}/>
                </div>
            </Card>
            <hr/>
            <Card>
                <ul className={classes.ul}>
                    {appointmentList}
                </ul>
            </Card>
            <AddAppointment update={update}/>

        </div>
    )
};

export default Appointments;