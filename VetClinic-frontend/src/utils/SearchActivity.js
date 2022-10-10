import {Fragment, useState} from "react";
import Activity from "../components/activity/Activity";
import classes from "./Card.module.css";
import Card from "./Card";

const SearchActivity =(props) =>{
    const [searchText, setSearchText] = useState("");
    const [activities, setActivities] = useState([]);
    const [xml, setXml] = useState("");

    const fetchActivitiesByOwner = async (text) => {
        const response = await fetch(`http://localhost:8081/api/owner/getActivities/${text}`);

        if (!response.ok) {
            throw new Error("Something went wrong");
        }

        const responseData = await response.json();
        const loadedActivities = [];

        const data = responseData.data.activities;
        for (const key in data) {
            loadedActivities.push({
                id: data[key].id,
                ownerId: data[key].ownerId,
                ownerName: data[key].ownerName,
                login: data[key].login,
                logout: data[key].logout
            });
        }

        setActivities(loadedActivities);
        console.log(loadedActivities);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let ownerName;
        searchText === '' ? ownerName = "all" : ownerName = searchText;

        console.log(ownerName);

        fetchActivitiesByOwner(ownerName).catch((error) => {
            console.log(error);
        })

    }

    const generateXML=()=>{
        const fetchXML = async () =>{
            const response = await fetch(`http://localhost:8081/api/owner/export/${searchText}`);
            if (!response.ok) {
                throw new Error("Something went wrong");
            }
            const responseData = await response.json();
            return responseData.data.ownerActivity;
        }
        fetchXML().then((data)=>{setXml(data)}).catch((error)=>{console.log(error)})
    }

    let activityList = []
    if (activities.length > 0)
        activityList = activities.map(activity => <Activity key={activity.id} id={activity.id}
                                                    ownerId={activity.ownerId} ownerName={activity.ownerName}
                                                    login={activity.login} logout={activity.logout} update={props.update}/>);


    const handleChange = (event) => {
        setSearchText(event.target.value);
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <label>
                    <div>
                        <label>Owner name:</label>
                        <input type="text" value={searchText} onChange={handleChange}/>
                    </div>

                </label>
                {searchText.length > 0 && <input type="submit" value="Submit"/>}
                {searchText.length > 0 && <button onClick={generateXML}>Generate XML</button>}
                {xml && <Card>{xml}</Card>}
            </form>
            <ul className={classes.ul}>{activityList}</ul>
        </Fragment>
    );

}
export default SearchActivity;