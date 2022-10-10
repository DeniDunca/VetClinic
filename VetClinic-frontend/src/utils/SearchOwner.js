import {useState, useContext, Fragment} from "react";
import Appointment from "../components/appointments/Appointment";
import AuthContext from "../store/auth-context";
import classes from "./Card.module.css"

function Search(props) {
    const [searchText, setSearchText] = useState('');
    const [searchTextTwo, setSearchTextTwo] = useState('');
    const [appointments, setAppointments] = useState([]);
    const loginCtx = useContext(AuthContext);

    const fetchAppointmentsByDate = async (text, textPet) => {
        const response = await fetch(`http://localhost:8081/api/owner/getAppointmentsByVetOrPet/${loginCtx.userId}/${text}/${textPet}`);

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

    const handleSubmit = (event) => {
        event.preventDefault();
        let vetName, petName;
        searchText === '' ? vetName = "all" : vetName = searchText;
        searchTextTwo === '' ? petName = "all" : petName = searchTextTwo;

        console.log(vetName, petName);

        fetchAppointmentsByDate(vetName, petName).catch((error) => {
            console.log(error);
        })

    }

    let appointmentList = []
    if (appointments.length > 0)
        appointmentList = appointments.map(app => <Appointment key={app.id} id={app.id} vet={app.vet} pet={app.pet}
                                                               vetName={app.vetName} petName={app.petName}
                                                               date={app.date} start={app.start} finish={app.finish}
                                                               reason={app.reason} update={props.update}/>);

    const handleChange = (event) => {
        setSearchText(event.target.value);
    }

    const handleChangeTwo = (event) => {
        setSearchTextTwo(event.target.value);
    }
    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <label>
                    <div>
                        <label>Vet name:</label>
                        <input type="text" value={searchText} onChange={handleChange}/>
                    </div>
                    <div>
                        <label> Pet name:</label>
                        <input type="text" value={searchTextTwo} onChange={handleChangeTwo}/>
                    </div>
                </label>
                {searchText.length + searchTextTwo.length > 0 && <input type="submit" value="Submit"/>}
            </form>
            <ul className={classes.ul}>{appointmentList}</ul>

        </Fragment>
    );
}

export default Search;