const sql = require("./db.js");

// constructor
const Jobseeker = function (jobseeker) {
  this.id = jobseeker.id;
  this.jobseekername = jobseeker.jobseekername;
  this.location = jobseeker.location;
  this.mobileno = jobseeker.mobileno;
  this.email = jobseeker.email;
  this.yearofxp = jobseeker.yearofxp;
};

Jobseeker.create = (newJobseeker, result) => {
  sql.query("INSERT INTO job_seeker SET ?", newJobseeker, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    //console.log("created jobseeker: ", { id: res.insertId, ...newJobseeker });
    result(null, { ...newJobseeker });
  });
};

Jobseeker.findById = (id, result) => {
  sql.query(`SELECT * FROM job_seeker WHERE id = ${id}`, (err, res) => {
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

Jobseeker.findLogin = (email, result) => {
  sql.query(`SELECT * FROM job_seeker WHERE email = '${email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      //console.log("found jobseeker: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found JobSeeker with the id
    result({ kind: "not_found" }, null);
  });
};

Jobseeker.getAll = (email, result) => {
  let query = "SELECT * FROM job_seeker";

  if (email) {
    query += ` WHERE title email '%${email}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("job_seeker: ", res);
    result(null, res);
  });
};

Jobseeker.updateById = (id, jobseeker, result) => {
  sql.query(
    "UPDATE job_seeker SET jobseekername = ?, location = ?, mobileno = ?,  email = ?, yearofxp = ? WHERE id = ?",
    [
      jobseeker.jobseekername,
      jobseeker.location,
      jobseeker.mobileno,
      jobseeker.email,
      jobseeker.yearofxp,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Jobseeker with the id
        result({ kind: "not_found" }, null);
        return;
      }

      // console.log("updated jobseeker: ", { id: id, ...jobseeker });
      result(null, { id: id, ...jobseeker });
    }
  );
};

Jobseeker.remove = (id, result) => {
  sql.query("DELETE FROM job_seeker WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Jobseeker with the id
      result({ kind: "not_found" }, null);
      return;
    }

    //console.log("deleted user with id: ", id);
    result(null, res);
  });
};

Jobseeker.removeAll = (result) => {
  sql.query("DELETE FROM job_seeker", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log(`deleted ${res.affectedRows} job_seeker`);
    result(null, res);
  });
};

module.exports = Jobseeker;
