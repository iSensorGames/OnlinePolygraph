const express = require('express');
const path = require('path');
const admin = require('firebase-admin');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the React app 
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Firebase Setup
admin.initializeApp({
	credential: admin.credential.applicationDefault(),
	databaseURL: 'https://online-polygraph.firebaseio.com'
});
const db = admin.firestore();

// An API endpoint that returns a short list of items  
app.get('/api/users', (req, res) => {
	let docRef = db.collection('users').get()
		.then((snapshot) => {
			let documents = [];
			snapshot.forEach(doc => {
				documents.push(doc.data());
			})
			res.json(documents);
		})
		.catch((err) => {
			console.log('Error getting documents', err);
		});	
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
});

// Server
app.listen(PORT, () => {
	console.log('Server listening to Port: ' + PORT);
});
