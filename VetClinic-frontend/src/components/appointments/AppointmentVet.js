import "react-datepicker/dist/react-datepicker.css";
import Card from "../../utils/Card";
import classes from "./Appointment.module.css";

const AppointmentVet = (props) => {

    function deleteHandler() {
        const fetchPets = async () => {
            await fetch(`http://localhost:8081/api/appointment/delete/${props.id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
        }
        fetchPets().then(r => props.update());
    }

    return (
        <Card>
            <li>
                <div>Date: {props.date}</div>
                <div>Start: {props.start}</div>
                <div>Finish: {props.finish}</div>
                <div>Reason: {props.reason}</div>
                <div>Owner: {props.owner}</div>
                <div>Pet: {props.pet}</div>
                <div className={classes.actions}>
                    <button onClick={deleteHandler}>Delete Appointment</button>
                </div>
            </li>
        </Card>
    );
};

export default AppointmentVet;