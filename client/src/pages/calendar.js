import React, { Component } from "react";
import Navbar from '../components/navbar/index'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
/* import 'react-big-calendar/lib/addons/dragAndDrop/styles'; */
import './calendar.css'
import moment from 'moment';
const localizer = momentLocalizer(moment)
class CalendarPage extends Component {
    state = {
        events: [
            {
                start: new Date(),
                end: new Date(moment().add(1, "days")),
                title: "Some title"
            }
        ]
    };

    render() {
        return (
            <div className="Calendardiv">
                <Navbar />
                <Calendar
                    localizer={localizer}
                    events={this.state.events}
                    startAccessor="start"
                    endAccessor="end"
                />

            </div>
        );
    }
}

export default CalendarPage;
