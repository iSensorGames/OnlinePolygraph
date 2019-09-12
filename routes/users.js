module.exports = ({ app, db }) => {
  app.get("/api/users", (req, res) => {
    db.collection("users")
      .get()
      .then(snapshot => {
        let documents = [];
        snapshot.forEach(doc => {
          documents.push(doc.data());
        });
        res.json(documents).status(200);
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  });
};
