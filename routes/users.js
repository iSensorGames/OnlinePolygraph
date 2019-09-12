module.exports = ({ app, db }) => {
  // An API endpoint that returns a short list of items
  app.get("/api/users", (req, res) => {
    db.collection("users")
      .get()
      .then(snapshot => {
        let documents = [];
        snapshot.forEach(doc => {
          documents.push(doc.data());
        });
        res.json(documents);
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  });
};
