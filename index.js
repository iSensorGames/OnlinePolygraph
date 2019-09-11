const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the React app 
app.use(express.static(path.join(__dirname, 'frontend/build')));

// An API endpoint that returns a short list of items  
app.get('/api/getList', (req, res) => {
	let list = ['player1', 'player2', 'admin'];
	res.json(list);	
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
});

// Server
app.listen(PORT, () => {
	console.log('Server listening to Port: ' + PORT);
});
