const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const User = require("./models/user");

const router = express.Router();

function createCallback(res, message) {
  return function(err, result) {
    if (err) {
      res.send(err);
    } else if (result) {
      res.json(result);
    } else {
      res.json({ message: message});
    }
  };
}

router.get("/", function(req, res) {
  res.json({message: "horray! welcome to our api!"});
});

router.route("/users")
  .post(function(req, res) {
    var user = new User();
    user.name = req.body.name;

    user.save(createCallback(res, "User created!"));
  })
  .get(function(req, res) {
    User.find(createCallback(res, "No users found!"));
  });

router.route("/users/:user_id")
  .get(function(req, res) {
    User.findById(req.params.user_id, createCallback(res, "User not found!"));
  })
  .put(function(req, res) {
    User.findById(req.params.bear_id, function(err, user) {
      if (err) return res.send(err);
      user.name = req.body.name;
      user.save(createCallback(res, "User updated!"));
    });
  })
  .delete(function(req, res) {
    User.remove({ _id: req.params.user_id },
      createCallback(res, "Successfully deleted!"));
  });

app.use("/api", router);

app.get("/", function(req, res) {
  res.send("Hello world from Express");
});

const server = app.listen(4000, function() {
  console.log("Express is listening to http://localhost:4000");
});
