require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const eventRoutes = require('./routes/eventRoutes');
const attendeeRoutes = require('./routes/attendeeRoutes');
const taskRoutes = require('./routes/taskRoutes');
const adminRoutes = require("./routes/login");
const app = express();

app.use(cors());
app.use(bodyParser.json());

//Routes
app.use('/api/events', eventRoutes);
app.use('/api/attendees', attendeeRoutes);
app.use('/api/tasks', taskRoutes);
app.use("/api/admin",adminRoutes);

//mongoDB connection
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDb Connection failed :',err));

const PORT = process.env.PORT || 8000;
app.listen(PORT,() => {
    console.log(`Server running on http://localhost:${PORT}`);
});