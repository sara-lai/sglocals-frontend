import { useState, useContext, useEffect } from "react";
import EventCard from "./EventCard";

const Events = (props) => {

    return (
        <>
            <h1>Event List</h1>
            <EventCard/>
        </>

    );
};

export default Events;