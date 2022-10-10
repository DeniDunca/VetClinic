import {Inject, ScheduleComponent, Day, Week, Month} from "@syncfusion/ej2-react-schedule";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../store/auth-context";

const SchedulerVet = () => {
    const loginCtx = useContext(AuthContext);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const response = await fetch(`http://localhost:8081/api/vet/getAppointments/${loginCtx.userId}`);


            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const responseData = await response.json();
            const data = responseData.data.appointments;

            const loadedAppointments = [];

            for (const key in data) {
                const date = data[key].date.split('-');
                const startTime = data[key].start.split(":");
                const finishTime = data[key].finish.split(":");
                loadedAppointments.push({
                    Subject: "Appointment for: " + data[key].petName + " Owner: " + data[key].ownerName + " Reason: " + data[key].reason,
                    StartTime: new Date(date[0], parseInt(date[1]) - 1, date[2], startTime[0], startTime[1]),
                    EndTime: new Date(date[0], parseInt(date[1]) - 1, date[2], finishTime[0], finishTime[1]),
                    Id: data[key].id
                });
            }
            setAppointments(loadedAppointments);
        }

        fetchAppointments().catch(err => {
            console.log("Error loading appointments:" + err)
        });

    }, []);

    return (
        <ScheduleComponent eventSettings={{dataSource: appointments}}>
            <Inject services={[Day, Week, Month]}/>
        </ScheduleComponent>
    )
}
export default SchedulerVet;



