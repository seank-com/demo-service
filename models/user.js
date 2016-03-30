const db = {

};

var User = function() {
};

User.prototype.save = function(callback) {
  var that = this;
  setImmediate(function() {
    that._id = that._id || "id-" + Date.now();

    if (that.name) {
      db[that._id] = {
        _id: that._id,
        name: that.name
      };
      callback(null);
    } else {
      callback({ message: "name property required"});
    }
  });
};

module.exports = User;

module.exports.find = function(callback) {
  setImmediate(function(){
    var result = [],
      ids = Object.getOwnPropertyNames(db);
    ids.forEach(function(id) {
      result.push(db[id]);
    });
    callback(null, result);
  });
};

module.exports.findById = function(id, callback) {
  setImmediate(function() {
    if (db[id]) {
      callback(null, Object.assign({}, db[id]));
    } else {
      callback({ message: "user not found"});
    }
  })
};

module.exports.remove = function(user, callback) {
  setImmediate(function() {
    var result;
    if (user._id && db[user._id]) {
      result = db[user._id];
      delete db[user._id];
      callback(null, result);
    } else {
      callback({ message: "user not found"});
    }
  });
};
