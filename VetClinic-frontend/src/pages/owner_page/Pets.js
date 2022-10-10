import {useContext, useEffect, useState} from "react";
import Pet from "../../components/pets/Pet";
import AuthContext from "../../store/auth-context";
import AddPet from "../../components/pets/AddPet";
import {NavLink} from "react-router-dom";
import classes from "./Owner.module.css";
import Card from "../../utils/Card";


const Pets = () => {
    const loginCtx = useContext(AuthContext);
    const [pets, setPets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    const fetchPets = async () => {
        console.log(loginCtx.userId, "Pets");
        const response = await fetch(`http://localhost:8081/api/owner/getPets/${loginCtx.userId}`);

        if (!response.ok) {
            throw new Error("Something went wrong");
        }

        const responseData = await response.json();
        console.log(responseData);
        const loadedPets = [];
        const data = responseData.data.pets;
        for (const key in data) {
            loadedPets.push({
                id: data[key].id,
                name: data[key].name,
                type: data[key].type,
                race: data[key].race,
                age: data[key].age,
                info: data[key].info,
                photo: data[key].photo
            });
        }

        setPets(loadedPets);
        setIsLoading(false);
    }


    useEffect(() => {
        fetchPets().catch((error) => {
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
        console.log("Pet update");
        await fetchPets();
    }


    const petList = pets.map(pet => <Pet key={pet.id} id={pet.id} name={pet.name} type={pet.type}
                                         race={pet.race} age={pet.age} info={pet.info} photo={pet.photo}
                                         update={update}/>);

    return (
        <div>
            <h1 className={classes.h1}>My Pets</h1>
            <div className={classes.topnav}>
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={`/appointments/${loginCtx.userId}`}>Appointments</NavLink>
            </div>

            <Card>
                <ul className={classes.ul}>
                    {petList}
                </ul>
            </Card>
            <AddPet update={update}/>
        </div>
    )
};

export default Pets;