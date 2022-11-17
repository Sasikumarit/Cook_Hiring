const Jobseeker = require("../models/jobseeker.model.js");

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

  // Save Jobseeker in the database
  Jobseeker.create(jobseeker, (err, data) => {
    if (err)
      res.status(500).send({
        status: 500,
        error: err.message || "Some error occurred while creating the Jobseeker.",
      });
    else res.send({
      status: 200,
      error: null,
      response: "Created Successfully",
    });
  });
};

// Retrieve all Users from the database (with condition).
exports.findAll = (req, res) => {
  const jobseekername = req.query.jobseekername;

  Jobseeker.getAll(jobseekername, (err, data) => {
    if (err)
      res.status(500).send({
        status: 500,
        error: err.message || "Some error occurred while retrieving users.",
      });
    else res.send({
      status: 200,
      error: null,
      response: data,
    });
  });
};

// Find a single Jobseeker by Id
exports.findOne = (req, res) => {
  Jobseeker.findById(req.params.id, (err, results) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: 404,
          error: `Not found Jobseeker with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          status: 500,
          error: "Error retrieving Jobseeker with id " + req.params.id,
        });
      }
    } 
        res.send({
          status: 200,
          error: null,
          response: results,
        });
  });
};

// Update a Jobseeker identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      status:400,
      error: "Content can not be empty!",
    });
  }

    Jobseeker.updateById(req.params.id, new Jobseeker(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          error: `Not found Jobseeker with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          error: "Error updating Jobseeker with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Jobseeker with the specified id in the request
exports.delete = (req, res) => {
  Jobseeker.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status:404,
          error: `Not found Jobseeker with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          status:500,
          error: "Could not delete Jobseeker with id " + req.params.id,
        });
      }
    } else
      res.send({
        status: 200,
        error: null,
        message: `Jobseeker was deleted successfully!`,
      });
  });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  Jobseeker.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        status:500,
        error: err.message || "Some error occurred while removing all users.",
      });
    else
      res.send({
        status: 200,
        error: null,
        message: `All Users were deleted successfully!`,
      });
  });
};
