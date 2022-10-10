import {useContext, useRef, useState} from "react";
import AuthContext from "../../store/auth-context";
import classes from './Pet.module.css';
import Card from "../../utils/Card";

const AddPet = (props) => {
    const [isAdd, setIsAdd] = useState(false);
    const loginCtx = useContext(AuthContext);
    const name = useRef();
    const race = useRef();
    const type = useRef();
    const age = useRef();
    const info = useRef();

    function addHandler() {
        setIsAdd(true);
    }

    function submitHandler(event) {
        event.preventDefault();

        const fetchPets = async () => {
            await fetch(`http://localhost:8081/api/pet/save`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name.current.value,
                    race: race.current.value,
                    type: type.current.value,
                    age: age.current.value,
                    info: info.current.value,
                    ownerId: loginCtx.userId
                })
            })
        }
        fetchPets().then(r => props.update());
        setIsAdd(false);
    }

    function backHandler() {
        setIsAdd(false);
    }

    return (
        <div className={classes.actions}>
            <button onClick={addHandler}>Add new pet</button>
            <Card>
                {isAdd && <form onSubmit={submitHandler}>
                    <h3>Enter pets details</h3>
                    <input placeholder={"Name"} ref={name}/>
                    <input placeholder={"Race"} ref={race}/>
                    <input placeholder={"Type"} ref={type}/>
                    <input placeholder={"Age"} ref={age}/>
                    <input placeholder={"Info"} ref={info}/>
                    <button onClick={backHandler}>Back</button>
                    <button>Confirm</button>
                </form>}
            </Card>
        </div>
    )
}
export default AddPet;