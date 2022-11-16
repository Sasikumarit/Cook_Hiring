const sql = require("./db.js");

// constructor
const User = function(user) {
  this.userid=user.userid;
  this.username=user.username;
  this.email=user.email;
  this.mobileno=user.mobileno;
  this.password=user.password;
  this.confirmpassword=user.confirmpassword;
  this.userrole=user.userrole;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO user_details SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    //console.log("created user: ", { userid: res.insertId, ...newUser });
    result(null, { userid: res.insertId, ...newUser });
  });
};

User.findById = (id, result) => {
  sql.query(`SELECT * FROM user_details WHERE userid = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      //console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = (email, result) => {
  let query = "SELECT * FROM user_details";

  if (email) {
    query += ` WHERE title email '%${email}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("user_details: ", res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE user_details SET username = ?, mobileno = ?, password = ?, confirmpassword = ?, userrole = ? WHERE userid = ?",
    [user.username, user.mobileno, user.password, user.confirmpassword,user.userrole, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

     // console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM user_details WHERE userid = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    //console.log("deleted user with id: ", id);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM user_details", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log(`deleted ${res.affectedRows} user_details`);
    result(null, res);
  });
};

module.exports = User;