'use strict';

require('dotenv').config();
const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const db = require("./database/db");
const connectionsRoute = require('./routes/connectionsRoute');
const connectionTypesRoute = require('./routes/connectionTypesRoute');
const currentTypeRoute = require('./routes/currentTypeRoute');
const levelsRoute = require('./routes/levelsRoute');
const stationRoute = require('./routes/stationRoute');
const authRoute = require("./routes/authRoute");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('/connections', connectionsRoute);
app.use('/connectionTypes', connectionTypesRoute);
app.use('/currenttype', currentTypeRoute);
app.use('/levels', levelsRoute);
app.use('/station', stationRoute);
app.use("/auth", authRoute);

db.on('connected', () => {
  app.listen(3000);
});
