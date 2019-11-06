import React from "react";
import app from "../components/Firebase/firebase";
import { useSelector } from 'react-redux';

const Confirm = () => {
    const counter = useSelector(state => state.counter);

    return (
        <>
        <h1>Reservation confirmed:</h1>
        <h2>Counter: {counter}</h2>
        <button onClick={() => app.auth().signOut()}>Sign out</button>
        </>
    );
};

export default Confirm;