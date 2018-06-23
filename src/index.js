const express = require('express');
const morgan = require('morgan');
const path = require('path');
const jwt = require('jsonwebtoken');
const { mongoose } = require('./database');

const app = express();


// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/candidatos', require('./routes/candidatos.routes'));
app.use('/api/tasks', require('./routes/task.routes'));
app.use('/api/messages', require('./routes/message.routes'));
// Statc files
app.use(express.static(path.join(__dirname, 'public' )));

// Start the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
