import React, { Component } from "react";
/* import Filter from "../components/filter/index"; */
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
/* import 'react-big-calendar/lib/addons/dragAndDrop/styles'; */
import './calendar.css'
import moment from 'moment';
import API from "../utils/api"
const localizer = momentLocalizer(moment)
class CalendarPage extends Component {
    state = {
        events: [
            {
                startTime: "",
                endTime: "",
                roomName: ""
            }
        ]
    };
    componentDidMount() {
        this.loadEvents()
    }
    loadEvents = () => {
        API.getEvents()
            .then(res => {
                this.setState({
                    events: res.data
                })
            })
    }

    render() {
        return (
            <div className="Calendardiv">
                {/* <Filter /> */}
                <Calendar
                    views={["month", "agenda"]}
                    localizer={localizer}
                    events={this.state.events}
                    startAccessor="startTime"
                    endAccessor="endTime"
                    titleAccessor="roomName"
                />

            </div>
        );
    }
}

export default CalendarPage;
