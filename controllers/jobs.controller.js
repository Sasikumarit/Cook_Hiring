const Jobs = require("../models/job.model.js");
const jwt = require("jsonwebtoken");

// Create and Save a new Job
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      status: 400,
      error: "Content can not be empty!",
    });
  }

  // Create a Job
  const job = new Jobs({
    id:req.body.id,
    jobdescription: req.body.jobdescription,
    wageperday: req.body.wageperday,
    location: req.body.location,
    fromdate: req.body.fromdate,
    todate: req.body.todate,
    userid:req.body.userid
  });

  // Save Job in the database
  Jobs.create(job, (err, data) => {
    if (err)
      res.status(500).send({
        status: 500,
        error: err.message || "Some error occurred while creating the job.",
      });
    else
      res.send({
        status: 200,
        error: null,
        response: "Created Successfully",
      });
  });
};

// Retrieve all Jobs from the database (with condition).
exports.findAll = (req, res) => {
  const id = req.query.id;

  Jobs.getAll(id, (err, data) => {
    if (err)
      res.status(500).send({
        status: 500,
        error: err.message || "Some error occurred while retrieving jobs.",
      });
    else
      res.send({
        status: 200,
        error: null,
        response: data,
      });
  });
};

// Find a single Job by Id
exports.findOne = (req, res) => {
  Jobs.findById(req.params.id, (err, results) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: 404,
          error: `Not found job with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          status: 500,
          error: "Error retrieving job with id " + req.params.id,
        });
      }
    }
        res.send({
          status: 200,
          error: null,
          response:results,
        });
  });
};

// Find a findUser
exports.findUser = (req, res) => {
  Jobs.findUserId(req.params.userid, (err, results) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: 404,
          error: `Not found job with userid ${req.params.userid}.`,
        });
      } else {
        res.status(500).send({
          status: 500,
          error: "Error retrieving job with userid " + req.params.userid,
        });
      }
    }
        res.send({
          status: 200,
          error: null,
          response:results,
        });
  });
};

// Find a single Job by Id
exports.findAppliedUser = (req, res) => {
  Jobs.findAppliedUserById(req.params.id, (err, results) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: 404,
          error: `Not found AppliedUser with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          status: 500,
          error: "Error retrieving job with id " + req.params.id,
        });
      }
    }
        res.send({
          status: 200,
          error: null,
          response:results,
        });
  });
};

exports.findJobByUser = (req, res) => {
  Jobs.findJobByUserId(req.params.id, (err, results) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: 404,
          error: `Not found AppliedUser with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          status: 500,
          error: "Error retrieving job with id " + req.params.id,
        });
      }
    }
        res.send({
          status: 200,
          error: null,
          response:results,
        });
  });
};




// Update a Job identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      status: 400,
      error: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Jobs.updateById(req.params.id, new Jobs(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          error: `Not found job with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          error: "Error updating job with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Job with the specified id in the request
exports.delete = (req, res) => {
  Jobs.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: 404,
          error: `Not found job with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          status: 500,
          error: "Could not delete job with id " + req.params.id,
        });
      }
    } else
      res.send({
        status: 200,
        error: null,
        message: `job was deleted successfully!`,
      });
  });
};

// Delete all Job from the database.
exports.deleteAll = (req, res) => {
  Jobs.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        status: 500,
        error: err.message || "Some error occurred while removing all jobs.",
      });
    else
      res.send({
        status: 200,
        error: null,
        message: `All jobs were deleted successfully!`,
      });
  });
};
