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
                startTime: Date,
                endTime: Date,
                roomName: String
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
                /* this.state.events = res.data */
                console.log(res.data)
                console.log(this.state.events)
            })
    }

    render() {
        return (
            <div className="Calendardiv">
                {/* <Filter /> */}
                <Calendar
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
