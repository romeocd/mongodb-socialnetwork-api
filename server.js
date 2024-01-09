const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const thoughtRoutes = require('./routes/thoughtRoutes');

const app = express();

app.use(express.json());

//Connect to MongoDB
mongoose.connect('mongodb://localhost/socialNetworkDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB' ))
.catch(err => console.error('Could not connect to MongoDB', err));

//Use routes with '/api' prefix
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

//Handle undefined routes
app.use('*', (req, res) => {
    res.status(404).json({ message: 'This routes does not exist' });
});

//Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;