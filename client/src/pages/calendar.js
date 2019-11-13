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
                start: "",
                end: "",
                title: ""
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
                    events: [
                        {
                            start: new Date(moment(res.data[i].startTime)),
                            end: new Date(moment(res.data[i].endTime)),
                            title: res.data.userName
                        }
                    ]
                })
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
                    startAccessor="start"
                    endAccessor="end"
                />

            </div>
        );
    }
}

export default CalendarPage;
