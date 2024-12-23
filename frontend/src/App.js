import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import AttendeesPage from "./pages/AttendeesPage";
import TasksPage from "./pages/TasksPage";
import Login from "./pages/Login";
import ProtectedRoute from './Protector/protectedRoute';
import "./styles/App.css";

// const App = () => {
//   return (
//     <Router>
//       { <Navbar /> }
//       <Routes>
//         <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
//         <Route path="/events" element={<ProtectedRoute><EventsPage /></ProtectedRoute>} />
//         <Route path="/attendees" element={<ProtectedRoute><AttendeesPage /></ProtectedRoute>} />
//         <Route path="/tasks" element={<ProtectedRoute><TasksPage /></ProtectedRoute>} />
//         <Route path="/login" element={<Login/>}/>
//       </Routes>
//     </Router>
//   );
// };

// export default App;

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navbar />
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Navbar />
              <EventsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendees"
          element={
            <ProtectedRoute>
              <Navbar />
              <AttendeesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Navbar />
              <TasksPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;