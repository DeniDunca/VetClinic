import {useRef, useState} from "react";
import classes from "./VetComponent.module.css";
import Card from "../../utils/Card";

const AddVet = (props) => {
    const [isAdd, setIsAdd] = useState(false);
    const name = useRef();
    const password = useRef();
    const phone = useRef();
    const email = useRef();
    const clinic = useRef();
    const start = useRef();
    const finish = useRef();

    function addHandler() {
        setIsAdd(true);
    }

    function submitHandler(event) {
        event.preventDefault();

        const fetchVets = async () => {
            await fetch(`http://localhost:8081/api/vet/save`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name.current.value,
                    password: password.current.value,
                    phone: phone.current.value,
                    email: email.current.value,
                    clinic: clinic.current.value,
                    start: start.current.value,
                    finish: finish.current.value
                })
            })
        }
        fetchVets().then(r => props.update());
        setIsAdd(false);
    }

    function backHandler() {
        setIsAdd(false);
    }

    return (
        <div className={classes.actions}>
            <button onClick={addHandler}>Add new vet</button>
            <Card>
                {isAdd && <form onSubmit={submitHandler}>
                    <h3>Enter vets details</h3>
                    <input placeholder={"Name"} ref={name}/>
                    <input placeholder={"Password"} ref={password}/>
                    <input placeholder={"Phone"} ref={phone}/>
                    <input placeholder={"Email"} ref={email}/>
                    <input placeholder={"Clinic"} ref={clinic}/>
                    <input placeholder={"Start"} ref={start}/>
                    <input placeholder={"Finish"} ref={finish}/>
                    <button onClick={backHandler}>Back</button>
                    <button>Confirm</button>
                </form>}
            </Card>
        </div>
    )
}
export default AddVet;