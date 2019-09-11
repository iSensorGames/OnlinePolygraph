const express = require('express');
const app = express();
const PORT = 5000;

// routes
app.get('/', (req, res) => {
	res.send('Hello World from the iStudio machine');
});

app.listen(PORT, () => {
	console.log('Server listening to Port: ' + PORT);
});
