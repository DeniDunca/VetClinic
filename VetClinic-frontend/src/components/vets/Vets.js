import {useRef, useState} from "react";
import Card from "../../utils/Card";
import classes from "./VetComponent.module.css"

const Vets = (props) => {
    const [isModify, setIsModify] = useState(false);
    const name = useRef(props.name);
    const password = useRef(props.password);
    const phone = useRef(props.phone);
    const email = useRef(props.email);
    const clinic = useRef(props.clinic);
    const start = useRef(props.start);
    const finish = useRef(props.finish);

    function modifyHandler() {
        setIsModify(true);
    }

    function backHandler() {
        setIsModify(false);
    }

    function confirmHandler() {
        const fetchVets = async () => {
            await fetch('http://localhost:8081/api/vet/update', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: props.id,
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
        setIsModify(false);
    }

    function deleteHandler() {
        const fetchVets = async () => {
            await fetch(`http://localhost:8081/api/vet/delete/${props.id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
        }
        fetchVets().then(r => props.update());
    }

    return (
        <Card>
            <li>
                {isModify &&
                <div className={classes.actions}>
                    <input defaultValue={props.name} ref={name}/>
                    <input defaultValue={props.password} ref={password}/>
                    <input defaultValue={props.phone} ref={phone}/>
                    <input defaultValue={props.email} ref={email}/>
                    <input defaultValue={props.clinic} ref={clinic}/>
                    <input defaultValue={props.start} ref={start}/>
                    <input defaultValue={props.finish} ref={finish}/>
                </div>}
                {!isModify && <div>
                    <div>Name:{props.name} </div>
                    <div>Password:{props.password}</div>
                    <div>Phone:{props.phone}</div>
                    <div>Email:{props.email}</div>
                    <div>Clinic:{props.clinic}</div>
                    <div>Start:{props.start}</div>
                    <div>Finish:{props.finish}</div>
                </div>}
                {isModify &&
                <div className={classes.actions}>
                    <button onClick={confirmHandler}>Confirm</button>
                    <button onClick={backHandler}>Back</button>
                </div>
                }
                {!isModify &&
                <div className={classes.actions}>
                    <button onClick={modifyHandler}>Modify Vet</button>
                    <button onClick={deleteHandler}>Delete Vet</button>
                </div>
                }
            </li>
        </Card>
    );
};

export default Vets;