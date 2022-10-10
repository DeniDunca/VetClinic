import {Route, Routes} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Owner from "./pages/owner_page/Owner";
import Pets from "./pages/owner_page/Pets";
import Appointments from "./pages/owner_page/Appointments";
import AuthProvider from "./store/AuthProvider";
import Login from "./pages/login_page/Login";
import Register from "./pages/login_page/Register";
import Vet from "./pages/vet_page/Vet";
import AppointmentsVets from "./pages/vet_page/AppointmentsVets";
import ManageVets from "./pages/vet_page/ManageVets";
import SchedulerOwner from "./pages/scheduler_page/SchedulerOwner";
import SchedulerVet from "./pages/scheduler_page/SchedulerVet";
import ForgotPassword from "./pages/login_page/ForgotPassword";
import CheckEmail from "./pages/login_page/CheckEmail";
import ResetPassword from "./pages/login_page/ResetPassword";
import OwnerActivity from "./pages/vet_page/OwnerActivity";

function App() {
    return (
        <AuthProvider >
            <Routes>
                <Route exact path="/" element={<PrivateRoute/>}>
                    <Route exact path="/" element={<Owner/>}/>
                    <Route exact path="/pets/:id" element={<Pets/>}/>
                    <Route exact path="/appointments/:id" element={<Appointments/>}/>
                    <Route exact path="/appointmentsVet/:id" element={<AppointmentsVets/>}/>
                    <Route exact path="/manageVets/:id" element={<ManageVets/>}/>
                    <Route exact path="/scheduleVets/:id" element={<SchedulerVet/>}/>
                    <Route exact path="/scheduleOwner/:id" element={<SchedulerOwner/>}/>
                    <Route exact path="/vet" element={<Vet/>}/>
                    <Route exact path="/ownerActivity" element={<OwnerActivity/>}/>
                </Route>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/register" element={<Register/>}/>
                <Route exact path="/forgotPassword" element={<ForgotPassword/>}/>
                <Route exact path="/checkEmail" element={<CheckEmail/>}/>
                <Route exact path="/resetPassword/:id" element={<ResetPassword/>}/>
            </Routes>
        </AuthProvider >
    );
}

export default App;
