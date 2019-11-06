import React from "react";
import app from "../components/Firebase/firebase";

const Confirm = () => {
    return (
        <>
        <h1>Reservation confirmed:</h1>
        <button onClick={() => app.auth().signOut()}>Sign out</button>
        </>
    );
};

export default Confirm;