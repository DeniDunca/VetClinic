import {useContext, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import Vets from "../../components/vets/Vets";
import AuthContext from "../../store/auth-context";
import AddVet from "../../components/vets/AddVet";
import classes from "./Vet.module.css";
import Card from "../../utils/Card";

const ManageVets = () => {
    const loginCtx = useContext(AuthContext);
    const [vets, setVets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();


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
                id: data[key].id,
                name: data[key].name,
                password: data[key].password,
                phone: data[key].phone,
                email: data[key].email,
                clinic: data[key].clinic,
                start: data[key].start,
                finish: data[key].finish
            });
        }

        setVets(loadedVets);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchVets().catch((error) => {
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
        console.log("vet update");
        await fetchVets();
    }

    const vetList = vets.map(vet => <Vets key={vet.id} id={vet.id} name={vet.name} password={vet.password}
                                          phone={vet.phone} email={vet.email} clinic={vet.clinic} start={vet.start}
                                          finish={vet.finish} update={update}/>);

    return (
        <section>
            <h1 className={classes.h1}>Vets Management</h1>
            <div className={classes.topnav}>
                <NavLink to={"/vet"}>Home</NavLink>
            </div>
            <Card>
                <ul className={classes.ul}>
                    {vetList}
                </ul>
            </Card>
            <AddVet update={update}/>
        </section>
    )
};

export default ManageVets;