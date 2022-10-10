import {useContext, useEffect, useRef, useState} from "react";
import AuthContext from "../../store/auth-context";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classes from './Appointment.module.css';
import Card from "../../utils/Card";
import Select from "react-select";

const AddAppointments = (props) => {
    const [isAdd, setIsAdd] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [pets, setPets] = useState([]);
    const [labelPet, setLabelPet] = useState();
    const [vets, setVets] = useState([]);
    const [labelVet, setLabelVet] = useState();
    const [hours, setHours] = useState([
        {label:"08:00:00"},
        {label:"09:00:00"},
        {label:"10:00:00"},
        {label:"11:00:00"},
        {label:"12:00:00"},
        {label:"13:00:00"},
        {label:"14:00:00"},
        {label:"15:00:00"},
        {label:"16:00:00"},
        {label:"17:00:00"}]);
    const [labelHour, setLabelHour] = useState();
    const [hoursF, setHoursF] = useState([
        {label:"09:00:00"},
        {label:"10:00:00"},
        {label:"11:00:00"},
        {label:"12:00:00"},
        {label:"13:00:00"},
        {label:"14:00:00"},
        {label:"15:00:00"},
        {label:"16:00:00"},
        {label:"17:00:00"},
        {label:"18:00:00"}]);
    const [labelHourF, setLabelHourF] = useState();

    const loginCtx = useContext(AuthContext);

    const reason = useRef();

    function addHandler() {
        setIsAdd(true);
    }

    function submitHandler(event) {
        event.preventDefault();
        const fetchPets = async () => {
            await fetch('http://localhost:8081/api/appointment/save', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: startDate,
                    finish: labelHourF,
                    start: labelHour,
                    ownerId: loginCtx.userId,
                    vetName: labelVet,
                    petName: labelPet,
                    reason: reason.current.value
                })
            })
        }
        fetchPets().then(r => props.update());
        setIsAdd(false);
        alert("Your appointment has been scheduled! Please check email for confirmation!")
    }

    function backHandler() {
        setIsAdd(false);
    }

    const fetchPets = async () => {

        const response = await fetch(`http://localhost:8081/api/owner/getPets/${loginCtx.userId}`);

        if (!response.ok) {
            throw new Error("Something went wrong");
        }

        const responseData = await response.json();

        const loadedPets = [];
        const data = responseData.data.pets;
        for (const key in data) {
            loadedPets.push({
                label: data[key].name,
            });
        }

        setPets(loadedPets);
    }

    const fetchVets = async () => {
        const response = await fetch(`http://localhost:8081/api/vet/getAll/0`);

        if (!response.ok) {
            throw new Error("Something went wrong");
        }

        const responseData = await response.json();
        const loadedVets = [];

        const data = responseData.data.vets;
        for (const key in data) {
            loadedVets.push({
                label: data[key].name,
            });
        }

        setVets(loadedVets);
    }

    useEffect(() => {
        fetchPets().catch((error) => {
            console.log(error);
        })
        fetchVets().catch((error) => {
            console.log(error);
        })
    }, [loginCtx.userId]);

    const handleChangePet =(e)=> {
        setLabelPet(e.label);
    }

    const handleChangeVet =(e)=> {
        setLabelVet(e.label);
    }

    const handleChangeHour =(e)=> {
        setLabelHour(e.label);
    }
    const handleChangeHourF=(e)=> {
        setLabelHourF(e.label);
    }

    return (
        <div className={classes.actions}>
            <button onClick={addHandler}>Add new appointment</button>
            <Card>
                {isAdd && <form onSubmit={submitHandler}>
                    <h3>Enter appointment details</h3>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}/>
                    <Select placeholder={"Pet"} options={pets} onChange={handleChangePet}/>
                    <Select placeholder={"Vet"} options={vets} onChange={handleChangeVet}/>
                    <Select placeholder={"Hour Start"} options={hours} onChange={handleChangeHour}/>
                    <Select placeholder={"Hour Finish"} options={hoursF} onChange={handleChangeHourF}/>
                    <input placeholder={"Reason"} ref={reason}/>
                    <button onClick={backHandler}>Back</button>
                    <button>Confirm</button>
                </form>}
            </Card>
        </div>
    )
}
export default AddAppointments;