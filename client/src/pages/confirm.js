import React from "react";
import app from "../components/Firebase/firebase";
import { useSelector } from 'react-redux';

const Confirm = () => {
    const userData = useSelector(state => state.user);

    return (
        <>
        <h1>Reservation confirmed:</h1>
        <p>User: {userData.firstName} {userData.lastName}</p>
        <p>Email: {userData.email}</p>
        <p>Phone: {userData.phone}</p>
        <button onClick={() => app.auth().signOut()}>Sign out</button>
        </>
    );
};

export default Confirm;