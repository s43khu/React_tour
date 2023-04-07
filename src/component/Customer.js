import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

export default function Customer_home() {
    const storeState = useSelector(state => state)
    const navigate = useNavigate();
    return (
        <>
            <h1>Welcome Customer, {storeState.username}</h1>
            <ul>
                <li><a href="#home" onClick={() => { navigate('/') }}>Home</a></li>
            </ul>
        </>
    )
}