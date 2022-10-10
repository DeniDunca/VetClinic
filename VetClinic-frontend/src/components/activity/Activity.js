import Card from "../../utils/Card";

const Activity = (props) =>{
    return (
        <Card>
            <li>
                <div>User Name: {props.ownerName}</div>
                <div>Login: {props.login}</div>
                <div>Logout: {props.logout}</div>
            </li>
        </Card>
    );
}
export default Activity;