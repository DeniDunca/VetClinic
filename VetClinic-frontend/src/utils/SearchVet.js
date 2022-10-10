import {useState, useContext, Fragment} from "react";
import AuthContext from "../store/auth-context";
import classes from "./Card.module.css";
import AppointmentVet from "../components/appointments/AppointmentVet";

function SearchVet(props) {
    const [searchText, setSearchText] = useState("");
    const [appointments, setAppointments] = useState([]);
    const loginCtx = useContext(AuthContext);

    const fetchAppointmentsByOwner = async (text) => {
        const response = await fetch(`http://localhost:8081/api/vet/getAppointmentsForVetByOwner/${loginCtx.userId}/${text}`);

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
                pet: data[key].petName,
                date: data[key].date,
                finish: data[key].finish,
                start: data[key].start,
                reason: data[key].reason,
                owner: data[key].ownerName
            });
        }

        setAppointments(loadedAppointments);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let ownerName;
        searchText === '' ? ownerName = "all" : ownerName = searchText;

        console.log(ownerName);

        fetchAppointmentsByOwner(ownerName).catch((error) => {
            console.log(error);
        })

    }

    let appointmentList = []
    if (appointments.length > 0)
        appointmentList = appointments.map(app => <AppointmentVet key={app.id} id={app.id} owner={app.owner}
                                                                  pet={app.pet} ownerName={app.ownerName}
                                                                  petName={app.petName}
                                                                  date={app.date} start={app.start} finish={app.finish}
                                                                  reason={app.reason} update={props.update}/>);

    const handleChange = (event) => {
        setSearchText(event.target.value);
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <label>
                    <div>
                        <label>Owner name:</label>
                        <input type="text" value={searchText} onChange={handleChange}/>
                    </div>

                </label>
                {searchText.length > 0 && <input type="submit" value="Submit"/>}
            </form>
            <ul className={classes.ul}>{appointmentList}</ul>
        </Fragment>
    );
}

export default SearchVet;