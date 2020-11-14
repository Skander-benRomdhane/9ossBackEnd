const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const port = 5000;

// import the routes
const users = require('./Routes/Users/users.js')
// const tickets = require('./Routes/Tickets/tickets.js')
// const purchase = require('./Routes/Purchase/purchase.js')
// const events = require('./Routes/Events/events.js')
// const admins = require('./Routes/Admins/admins.js')

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));


// middlwares

app.use('/users', users);
// app.use('/admins', admins);
// app.use('/tickets',tickets)
// app.use('/events',events)
// app.use('/purchase',purchase)

app.listen(port,()=>{console.log(`Connected to ${port}`)})