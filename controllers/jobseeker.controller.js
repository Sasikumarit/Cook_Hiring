const Jobseeker = require("../models/jobseeker.model.js");
const jwt = require("jsonwebtoken");

// Create and Save a new Jobseeker
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      status: 400,
      error: "Content can not be empty!",
    });
  }

  // Create a Jobseeker
  const jobseeker = new Jobseeker({
    jobseekername: req.body.jobseekername,
    wageperday: req.body.wageperday,
    location: req.body.location,
    fromdate: req.body.fromdate,
    todate: req.body.todate,
  });

  // Save jobseeker in the database
  Jobseeker.create(jobseeker, (err, data) => {
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
  const email = req.query.email;

  Jobseeker.getAll(email, (err, data) => {
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
  Jobseeker.findById(req.params.id, (err, results) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: 404,
          error: `Jobseeker not found with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          status: 500,
          error: "Error retrieving jobseeker with id " + req.params.id,
        });
      }
    } else {
      if (results.length !== 0) {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
          time: Date(),
          userId: results.userId,
        };
        const token = jwt.sign(data, jwtSecretKey);
        res.send({
          status: 200,
          error: null,
          response: { ...results, token: token },
        });
      } else {
        return res
          .status(404)
          .send({ status: 404, error: "Please Check Email and Password." });
      }
    }
  });
};

// Find a single Job by Id
exports.findLoginjob = (req, res) => {
  Jobseeker.findLogin(req.body.email, req.body.password, (err, results) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: 404,
          error: `Jobseeker not found with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          status: 500,
          error: "Error retrieving jobseeker data with id " + req.params.id,
        });
      }
    } else {
      if (results.length !== 0) {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
          time: Date(),
          jobId: results.jobId,
        };
        const token = jwt.sign(data, jwtSecretKey);
        res.send({
          status: 200,
          error: null,
          response: { ...results, token: token },
        });
      } else {
        return res
          .status(404)
          .send({ status: 404, error: "Please Check Email and Password." });
      }
    }
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

  Jobseeker.updateById(req.params.id, new Jobseeker(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          error: `Jobseeker not found with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          error: "Error updating jobseeker with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Job with the specified id in the request
exports.delete = (req, res) => {
  Jobseeker.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: 404,
          error: `Jobseeker not found with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          status: 500,
          error: "Could not delete jobseeker with id " + req.params.id,
        });
      }
    } else
      res.send({
        status: 200,
        error: null,
        message: `Jobseeker Data was deleted successfully!`,
      });
  });
};

// Delete all Jobseeker data from the database.
exports.deleteAll = (req, res) => {
  Jobseeker.removeAll((err, data) => {
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
