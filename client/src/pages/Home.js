import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);

const myEventsList = [
  {
    id: 0,
    title: "All Day Event very long title",
    allDay: true,
    start: new Date(2021, 9, 3),
    end: new Date(2021, 9, 3),
  },
  {
    id: 1,
    title: "Long Event",
    start: new Date(2021, 9, 21),
    end: new Date(2021, 9, 21),
  },
];

export default function Home() {
  const [event, setEvent] = useState({});
  const [tomorrow, setTomorrow] = useState(null);
  const [yesterday, setYesterday] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      let res = await axios.get("/api/events");
      console.log(res);
      setEvent(res.data);
      setTomorrow(moment(res.data.tomorrow));
      setYesterday(moment(res.data.yesterday));
      setEvents([
        ...events,
        {
          id: 1,
          title: "Long Event",
          start: new Date(moment(res.data.yesterday)),
          end: new Date(moment(res.data.tomorrow)),
        },
      ]);
    } catch (err) {}
  };
  const handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    //TODO: need to an api call to our DB
    setEvents([
      ...events,
      {
        title,
        start,
        end,
      },
    ]);
    console.log("called");
    console.log("start", start);
    console.log("end", end);
  };
  const handleSelectEvent = (event, synthenticEvent) => {
    console.log("handleSelectEvent called");
    console.log(event);
    console.log(synthenticEvent);
  };
  return (
    <div>
      <h1>Home!</h1>
      <code>{JSON.stringify(event)}</code>
      <h1>Current: {moment().format("LLL")}</h1>
      <br />
      {tomorrow && <h1>future date: {tomorrow.format("LLL")}</h1>}
      <br />
      {yesterday && <h1>past date: {yesterday.format("LLL")}</h1>}
      <Calendar
        selectable
        onSelectSlot={handleSelect}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
}
