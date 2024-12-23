// import React, { useEffect, useState } from "react";
// import "./../styles/Dashboard.css";

// const AttendeeDashboard = () => {
//   const [attendees, setAttendees] = useState([]);
//   const [newAttendee, setNewAttendee] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     eventId: "",
//   });

//   useEffect(() => {
//     fetch("http://localhost:8000/api/attendees")
//       .then((response) => response.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setAttendees(data);
//         } else {
//           setAttendees([]);
//         }
//       })
//       .catch((error) => console.error("Error fetching attendees:", error));
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewAttendee({ ...newAttendee, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     fetch("http://localhost:8000/api/attendees", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newAttendee),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setAttendees((prevAttendees) => [...prevAttendees, data]);
//         setNewAttendee({ name: "", email: "", phone: "", eventId: "" });
//       })
//       .catch((error) => console.error("Error adding attendee:", error));
//   };

//   const handleDelete = (id) => {
//     fetch(`http://localhost:8000/api/attendees/${id}`, {
//       method: "DELETE",
//     })
//       .then((response) => response.json())
//       .then(() => {
//         setAttendees(attendees.filter((attendee) => attendee._id !== id));
//       })
//       .catch((error) => console.error("Error deleting attendee:", error));
//   };

//   const handleUpdate = (id) => {
//     const updatedName = prompt("Enter the new name:");
//     if (updatedName) {
//       fetch(`http://localhost:8000/api/attendees/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name: updatedName }),
//       })
//         .then((response) => response.json())
//         .then((updatedAttendee) => {
//           setAttendees(
//             attendees.map((attendee) =>
//               attendee._id === id ? updatedAttendee : attendee
//             )
//           );
//         })
//         .catch((error) => console.error("Error updating attendee:", error));
//     }
//   };

//   return (
//     <div className="dashboard">
//       <h2>Attendee Dashboard</h2>
//       <ul>
//         {attendees.length > 0 ? (
//           attendees.map((attendee) => (
//             <li key={attendee._id}>
//               <h3>{attendee.name}</h3>
//               <p>Email: {attendee.email}</p>
//               <p>Phone: {attendee.phone}</p>
//               <button onClick={() => handleDelete(attendee._id)}>Delete</button>
//               <button onClick={() => handleUpdate(attendee._id)}>Update</button>
//             </li>
//           ))
//         ) : (
//           <p>No attendees found.</p>
//         )}
//       </ul>

//       <h3>Add New Attendee</h3>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={newAttendee.name}
//           onChange={handleInputChange}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={newAttendee.email}
//           onChange={handleInputChange}
//           required
//         />
//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone"
//           value={newAttendee.phone}
//           onChange={handleInputChange}
//           required
//         />
//         <input
//           type="text"
//           name="eventId"
//           placeholder="Event ID"
//           value={newAttendee.eventId}
//           onChange={handleInputChange}
//           required
//         />
//         <button type="submit">Add Attendee</button>
//       </form>
//     </div>
//   );
// };

// export default AttendeeDashboard;

import React, { useEffect, useState } from "react";
import "./../styles/Dashboard.css";

const AttendeeDashboard = () => {
  const [attendees, setAttendees] = useState([]);
  const [newAttendee, setNewAttendee] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    // Fetching the attendees from the backend
    fetch("http://localhost:8000/api/attendees")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAttendees(data);
        } else {
          setAttendees([data]);
        }
      })
      .catch((error) => {
        console.error("Error fetching attendees:", error);
      });
  }, []);

  // Function to handle new attendee submission
  const handleAddAttendee = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/api/attendees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAttendee),
    })
      .then((response) => response.json())
      .then((data) => {
        setAttendees((prevAttendees) => [...prevAttendees, data]); // Update state with new attendee
        setNewAttendee({ name: "", email: "", phone: "" }); // Reset form
      })
      .catch((error) => {
        console.error("Error adding attendee:", error);
      });
  };

  // Function to handle attendee deletion
  const handleDeleteAttendee = (id) => {
    fetch(`http://localhost:8000/api/attendees/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setAttendees((prevAttendees) => prevAttendees.filter((attendee) => attendee._id !== id)); // Update state after deletion
        } else {
          console.error("Failed to delete attendee");
        }
      })
      .catch((error) => {
        console.error("Error deleting attendee:", error);
      });
  };

  return (
    <div className="dashboard">
      <h2>Attendee Dashboard</h2>
      <ul>
        {attendees.map((attendee) => (
          <li key={attendee._id}>
            <h3>{attendee.name}</h3>
            <p>Email: {attendee.email}</p>
            <p>Phone: {attendee.phone}</p>
            <button onClick={() => handleDeleteAttendee(attendee._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Add Attendee Form */}
      <div className="add-attendee-form">
        <h3>Add Attendee</h3>
        <form onSubmit={handleAddAttendee}>
          <label>Name:</label>
          <input
            type="text"
            value={newAttendee.name}
            onChange={(e) => setNewAttendee({ ...newAttendee, name: e.target.value })}
            required
          />
          <label>Email:</label>
          <input
            type="email"
            value={newAttendee.email}
            onChange={(e) => setNewAttendee({ ...newAttendee, email: e.target.value })}
            required
          />
          <label>Phone:</label>
          <input
            type="text"
            value={newAttendee.phone}
            onChange={(e) => setNewAttendee({ ...newAttendee, phone: e.target.value })}
            required
          />
          <button type="submit">Add Attendee</button>
        </form>
      </div>
    </div>
  );
};

export default AttendeeDashboard;
