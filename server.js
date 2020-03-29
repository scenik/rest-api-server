require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const db = require("./models");
db.mongoose
  .connect(db.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get('/', (req, res) => {
  res.status(200).json({ message: "RESTful Blog API." });
});

require('./routes/category.routes.js')(app);
require('./routes/post.routes.js')(app);
require('./routes/user.routes.js')(app);
require('./routes/auth.routes.js')(app);

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}.`);
});