import React, { Component } from "react";
/* import Filter from "../components/filter/index"; */
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
                start: new Date(moment("2019-11-04 09:30")),
                end: new Date(moment("2019-11-04 11:30")),
                title: "Some title"
            }
        ]
    };

    render() {
        return (
            <div className="Calendardiv">
                {/* <Filter /> */}
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
