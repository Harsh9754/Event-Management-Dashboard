import React, { useState, useEffect } from "react";
import "./../styles/Dashboard.css";

const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: "", date: "", location: "" });

  useEffect(() => {
    fetch("http://localhost:8000/api/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    })
      .then((response) => response.json())
      .then((data) => {
        setEvents([...events, data]);
        setNewEvent({ name: "", date: "", location: "" });
      })
      .catch((error) => console.error("Error adding event:", error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/api/events/${id}`, {
      method: "DELETE",
    })
      .then(() => setEvents(events.filter((event) => event._id !== id)))
      .catch((error) => console.error("Error deleting event:", error));
  };

  const handleUpdate = (id) => {
    const updatedName = prompt("Enter the new event name:");
    if (updatedName) {
      fetch(`http://localhost:8000/api/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: updatedName }),
      })
        .then((response) => response.json())
        .then((updatedEvent) => {
          setEvents(
            events.map((event) => (event._id === id ? updatedEvent : event))
          );
        })
        .catch((error) => console.error("Error updating event:", error));
    }
  };

  return (
    <div className="dashboard">
      <h2>Event Dashboard</h2>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h3>{event.name}</h3>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
            <button onClick={() => handleDelete(event._id)}>Delete</button>
            <button onClick={() => handleUpdate(event._id)}>Update</button>
          </li>
        ))}
      </ul>

      <h3>Add New Event</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={newEvent.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="date"
          value={newEvent.date}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newEvent.location}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default EventDashboard;
