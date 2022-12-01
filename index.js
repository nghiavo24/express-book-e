//=============================================================================
// Basic Config
//=============================================================================
const express = require('express');
const cors = require('cors')
// instantiate express
const app = express();
app.set('port', process.env.PORT || 8000);

//=============================================================================
// Middleware
//=============================================================================
// `express.json` parses application/json request data and
//  adds it to the request object as request.body
// app.use(express.json());

// `express.urlencoded` parses x-ww-form-urlencoded request data and
//  adds it to the request object as request.body
app.use(express.urlencoded({ extended: true }));

// enable CORS
app.use(cors())
//=============================================================================
// ROUTES
//=============================================================================
// Redirect
app.get('/', (req, res) => {
	res.redirect('/api/bookmarks');
});
/* START CONTROLLERS HERE */

const bookmarksController = require('./controllers/bookmarksController');
app.use('/api/bookmarks/', bookmarksController);

const usersController = require('./controllers/usersController');
app.use('/api/users/', usersController);

/* END CONTROLLERS HERE */

app.use((err, req, res, next) => {
	const statusCode = res.statusCode || 500;
	const message = err.message || 'Internal Server Error';
	res.status(statusCode).send(message);
  });


//=============================================================================
// START SERVER
//=============================================================================
app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🌟`);
});