import {useContext, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import AppointmentVet from "../../components/appointments/AppointmentVet";
import AuthContext from "../../store/auth-context";
import classes from "./Vet.module.css";
import Card from "../../utils/Card";
import SearchVet from "../../utils/SearchVet";
import SearchDateVet from "../../utils/SearchDateVet";

const AppointmentsVets = () => {
    const loginCtx = useContext(AuthContext);
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();


    const fetchAppointments = async () => {
        const response = await fetch(`http://localhost:8081/api/vet/getAppointments/${loginCtx.userId}`);

        if (!response.ok) {
            throw new Error("Something went wrong");
        }

        const responseData = await response.json();
        const loadedAppointments = [];

        const data = responseData.data.appointments;
        for (const key in data) {
            loadedAppointments.push({
                id: data[key].id,
                owner: data[key].ownerName,
                pet: data[key].petName,
                date: data[key].date,
                finish: data[key].finish,
                start: data[key].start,
                reason: data[key].reason
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

    const appointmentList = appointments.map(app => <AppointmentVet key={app.id} id={app.id} owner={app.owner}
                                                                    pet={app.pet}
                                                                    date={app.date} start={app.start}
                                                                    finish={app.finish} reason={app.reason}
                                                                    update={update}/>);

    return (
        <div>
            <h1 className={classes.h1}>My Appointments</h1>
            <div className={classes.topnav}>
                <NavLink to={"/vet"}>Home</NavLink>
            </div>
            <Card>
                <div className={classes.div}>
                    <SearchDateVet update={update}/>
                </div>
            </Card>
            <Card>
                <div className={classes.div}>
                    <SearchVet update={update}/>
                </div>
            </Card>
            <hr/>
            <Card>
                <ul className={classes.ul}>
                    {appointmentList}
                </ul>
            </Card>
        </div>
    )
};

export default AppointmentsVets;