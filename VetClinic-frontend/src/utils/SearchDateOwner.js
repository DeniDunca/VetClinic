import {useState, useContext, Fragment} from "react";
import DatePicker from "react-datepicker";
import Appointment from "../components/appointments/Appointment";
import AuthContext from "../store/auth-context";
import classes from "./Card.module.css"

function SearchDateOwner(props) {
    const [startDate, setStartDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);
    const loginCtx = useContext(AuthContext);

    const fetchAppointmentsByDate = async (dateString) => {
        const response = await fetch(`http://localhost:8081/api/owner/getAppointmentsByDate/${loginCtx.userId}/${dateString}`);

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
    }

    const getAppointments = (date) => {
        setStartDate(date);
        let dateString = date.getFullYear();
        dateString += "-";
        let month = parseInt(date.getMonth()) + 1;
        if (month < 10) {
            dateString += "0" + month;
        } else {
            dateString += month;
        }
        dateString += "-";
        let day = parseInt(date.getDate());
        if (day < 10) {
            dateString += "0" + day;
        } else {
            dateString += day;
        }
        console.log(dateString);


        fetchAppointmentsByDate(dateString).catch((error) => {
            console.log(error);
        })

    }

    let appointmentList = []
    if (appointments.length > 0)
        appointmentList = appointments.map(app => <Appointment key={app.id} id={app.id} vet={app.vet} pet={app.pet}
                                                               vetName={app.vetName} petName={app.petName}
                                                               date={app.date} start={app.start} finish={app.finish}
                                                               reason={app.reason} update={props.update}/>);


    return (
        <Fragment>
            <label>Search appointments for day:</label>
            <DatePicker selected={startDate} onChange={getAppointments} dateFormat={"yyyy-MM-dd"}/>
            <ul className={classes.ul}>{appointmentList}</ul>

        </Fragment>
    );
}

export default SearchDateOwner;