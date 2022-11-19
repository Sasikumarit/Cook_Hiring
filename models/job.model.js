const sql = require("./db.js");

// constructor
const Jobs = function (job) {
  //this.id = job.id;
  this.jobdescription = job.jobdescription;
  this.wageperday = job.wageperday;
  this.location = job.location;
  this.fromdate = job.fromdate;
  this.todate = job.todate;
  this.userid = job.userid;
};

Jobs.create = (newJob, result) => {
  sql.query("INSERT INTO jobs SET ?", newJob, (err, res) => {
    if (err) {
     // console.log("error: ", err);
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
      // console.log("error: ", err);
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


Jobs.findUserId = (userid, result) => {
  sql.query(`SELECT * FROM jobs WHERE userid = ${userid}`, (err, res) => {
    if (err) {
      // console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      //console.log("found job: ", res[0]);
      result(null, res);
      return;
    }

    // not found Job with the id
    result({ kind: "not_found" }, null);
  });
};

Jobs.findAppliedUserById = (id, result) => {
  sql.query(`select a.*, b.applieduserid,b.id as jobseekerid, b.jobseekername from jobs a, job_seeker b where b.jobid=a.id and b.applieduserid= ${id}`, (err, res) => {
    if (err) {
      // console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      //console.log("found job: ", res[0]);
      result(null, res);
      return;
    }

    // not found Job with the id
    result({ kind: "not_found" }, null);
  });
};

Jobs.getAll = (id, result) => {
  let query = "SELECT * FROM jobs";

  if (id) {
    query += ` WHERE id '%${id}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      // console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("jobs: ", res);
    result(null, res);
  });
};

Jobs.updateById = (id, job, result) => {
  sql.query(
    "UPDATE jobs SET jobdescription = ?, wageperday = ?, location = ?,  fromdate = ?, todate = ?,userid=? WHERE id = ?",
    [
      job.jobdescription,
      job.wageperday,
      job.location,
      job.fromdate,
      job.todate,
      job.userid,
      id,
    ],
    (err, res) => {
      if (err) {
        // console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Jobs with the id
        result({ kind: "not_found" }, null);
        return;
      }

      // console.log("updated jobs: ", { id: id, ...job });
      result(null,job);
    }
  );
};

Jobs.remove = (id, result) => {
  sql.query("DELETE FROM jobs WHERE id = ?", id, (err, res) => {
    if (err) {
      // console.log("error: ", err);
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
      // console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log(`deleted ${res.affectedRows} jobs`);
    result(null, res);
  });
};

module.exports = Jobs;
