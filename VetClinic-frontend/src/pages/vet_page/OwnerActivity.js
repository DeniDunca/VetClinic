import {useContext, useEffect, useState} from "react";
import AuthContext from "../../store/auth-context";
import Activity from "../../components/activity/Activity";
import classes from "./Vet.module.css";
import {NavLink} from "react-router-dom";
import Card from "../../utils/Card";
import SearchActivity from "../../utils/SearchActivity";

const OwnerActivity = () =>{
    const loginCtx = useContext(AuthContext);
    const [ownerActivity, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    const fetchActivityForAll = async () =>{
        const response = await fetch('http://localhost:8081/api/activity/getActivities');
        if (!response.ok) {
            throw new Error("Something went wrong");
        }

        const responseData = await response.json();
        const loadedActivities = [];

        const data = responseData.data.ownerActivity;

        for(const key in data){
            loadedActivities.push({
                id: data[key].id,
                ownerId: data[key].ownerId,
                ownerName: data[key].ownerName,
                login: data[key].login,
                logout: data[key].logout
            });
        }

        setActivities(loadedActivities);
        setIsLoading(false);
        console.log(data);
    }

    useEffect(() =>{
        fetchActivityForAll().catch((error) =>{
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
        console.log("Activity update");
        await fetchActivityForAll();
    }


    const activityList = ownerActivity.map(activity => <Activity key={activity.id} id={activity.id}
                                                              ownerId={activity.ownerId} ownerName={activity.ownerName}
                                                              login={activity.login} logout={activity.logout} update={update}/>);

    return(
        <div>
            <h1 className={classes.h1}>My Appointments</h1>
            <div className={classes.topnav}>
                <NavLink to={"/vet"}>Home</NavLink>
            </div>
            <Card>
                <div className={classes.div}>
                    <SearchActivity update={update}/>
                </div>
            </Card>
            <hr/>
            <Card>
                <ul className={classes.ul}>
                    {activityList}
                </ul>
            </Card>
        </div>
    )


}
export default OwnerActivity;