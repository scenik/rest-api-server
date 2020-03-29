const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.uri = dbConfig.uri;
db.category = require("./category.model.js")(mongoose);
db.post = require("./post.model.js")(mongoose);
db.user = require("./user.model.js")(mongoose);

module.exports = db;