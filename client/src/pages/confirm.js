import react from "react";
import app from "../components/Firebase";

const Confirm = () => {
    return (
        <>
        <h1>Reservation confirmed:</h1>
        <button onClick={() => app.auth().signOut()}>Sign out</button>
        </>
    )
}