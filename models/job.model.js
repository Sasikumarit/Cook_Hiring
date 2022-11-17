const sql = require("./db.js");

// constructor
const Jobs = function (job) {
  this.jobid = job.jobid;
  this.jobdescription = job.jobdescription;
  this.wageperday = job.wageperday;
  this.location = job.location;
  this.fromdate = job.fromdate;
  this.todate = job.todate;
};

Jobs.create = (newJob, result) => {
  sql.query("INSERT INTO jobs SET ?", newJob, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    //console.log("created jobs: ", { id: res.insertId, ...newJob });
    result(null, { ...newJob });
  });
};

Jobs.findById = (id, result) => {
  sql.query(`SELECT * FROM jobs WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      //console.log("found job: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Job with the id
    result({ kind: "not_found" }, null);
  });
};

Jobs.findLogin = (email, result) => {
  sql.query(`SELECT * FROM jobs WHERE email = '${email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      //console.log("found jobs: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Jobs with the id
    result({ kind: "not_found" }, null);
  });
};

Jobs.getAll = (email, result) => {
  let query = "SELECT * FROM jobs";

  if (email) {
    query += ` WHERE title email '%${email}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("jobs: ", res);
    result(null, res);
  });
};

Jobs.updateById = (id, job, result) => {
  sql.query(
    "UPDATE jobs SET jobdescription = ?, wageperday = ?, location = ?,  fromdate = ?, todate = ? WHERE jobid = ?",
    [
      job.jobdescription,
      job.wageperday,
      job.location,
      job.fromdate,
      job.todate,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Jobs with the id
        result({ kind: "not_found" }, null);
        return;
      }

      // console.log("updated jobs: ", { id: id, ...job });
      result(null, { id: id, ...job });
    }
  );
};

Jobs.remove = (id, result) => {
  sql.query("DELETE FROM jobs WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Job with the id
      result({ kind: "not_found" }, null);
      return;
    }

    //console.log("deleted job with id: ", id);
    result(null, res);
  });
};

Jobs.removeAll = (result) => {
  sql.query("DELETE FROM jobs", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log(`deleted ${res.affectedRows} jobs`);
    result(null, res);
  });
};

module.exports = Jobs;
