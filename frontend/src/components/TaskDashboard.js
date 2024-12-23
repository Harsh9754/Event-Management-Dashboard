// import React, { useEffect, useState } from "react";
// import "./../styles/Dashboard.css";

// const TaskDashboard = () => {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8000/api/tasks")
//       .then((response) => response.json())
//       .then((data) => setTasks(data));
//   }, []);

//   return (
//     <div className="dashboard">
//       <h2>Task Dashboard</h2>
//       <ul>
//         {tasks.map((task) => (
//           <li key={task._id}>
//             <h3>{task.name}</h3>
//             <p>Status: {task.status}</p>
//             <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TaskDashboard;
import React, { useState, useEffect } from "react";
import "./../styles/Dashboard.css";

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  //  "name":"Harsh",
  // "deadline":"2003-05-20",
  // "assignedAttendee":"67685024cce012eca0c32214",
  //  "event":"6765d061adb3bb2a5e8b3e9f"
  // const [newTask, setNewTask] = useState({ name: "", eventId: "", attendeeId: "", status: "pending" });
  const [newTask, setNewTask] = useState({ name: "",deadline: "",assignedAttendee: "", event: "" });
  const [events, setEvents] = useState([]);
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    // Fetch events data
    fetch("http://localhost:8000/api/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));

    // Fetch attendees data
    fetch("http://localhost:8000/api/attendees")
      .then((response) => response.json())
      .then((data) => {
        // Ensure data is an array before setting state
        if (Array.isArray(data)) {
          setAttendees(data);
        } else {
          setAttendees([]);
        }
      })
      .catch((error) => console.error("Error fetching attendees:", error));

    // Fetch tasks data
    fetch("http://localhost:8000/api/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data)
        console.log(data)
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newTask);
    fetch("http://localhost:8000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        // setTasks([...tasks, data]);
        // console.log(tasks)
        setNewTask({ name: "",deadline: "",assignedAttendee: "", event: "" });
        console.log("Date Submitted succefully")
      })
      .catch((error) => console.error("Error adding task:", error));
  };
  const handleDelete = (taskId) => {
    fetch(`http://localhost:8000/api/tasks/${taskId}`, {
      method: "DELETE",
    })
      .then(() => {
        // Remove the deleted task from the state
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  return (
    <div className="dashboard">
      <h2>Task Dashboard</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.name}</h3>
            <p>Assigned to: {task.assignedAttendee}</p>
            <p>Event: {task.event}</p>
            <p>Status: {task.status}</p>
            <button onClick={() => handleDelete(task._id)}>Delete Task</button>
          </li>
        ))}
      </ul>

      <h3>Add New Task</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Task Name"
          value={newTask.name}
          onChange={handleInputChange}
          required
        />
        <input
        name="deadline"
          type="date"
          value={newTask.deadline}
          onChange={handleInputChange}
        />
        <select
          name="event"
          value={newTask.event}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Event</option>
          {events.map((event) => (
            <option key={event._id} value={event._id}>
              {event.name}
            </option>
          ))}
        </select>
        <select
          name="assignedAttendee"
          value={newTask.assignedAttendee}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Attendee</option>
          {attendees.map((attendee) => (
            <option key={attendee._id} value={attendee._id}>
              {attendee.name}
            </option>
          ))}
        </select>
        {/* <select
          name="status"
          value={newTask.status}
          onChange={handleInputChange}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select> */}
        <button type="submit" onClick={handleSubmit}>Add Task</button>
      </form>
    </div>
  );
};

export default TaskDashboard;

