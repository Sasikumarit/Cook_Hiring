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
  try{
  Jobs.create(job, (err, data) => {
  
      res.send({
        status: 200,
        error: null,
        response: "Created Successfully",
      });
  });
}catch(err){
  res.status(500).send({
    status: 500,
    error: err.message || "Some error occurred while creating the job.",
  });
}
};

// Retrieve all Jobs from the database (with condition).
exports.findAll = (req, res) => {
  const id = req.query.id;
  try{
  Jobs.getAll(id, (err, data) => {
   
      res.send({
        status: 200,
        error: null,
        response: data,
      });
   
  });
}
catch(err){
  res.status(500).send({
    status: 500,
    error: err.message || "Some error occurred while retrieving jobs.",
  });
}
};

// Find a single Job by Id
exports.findOne = (req, res) => {
  try{
  Jobs.findById(req.params.id, (err, results) => {
   
        res.send({
          status: 200,
          error: null,
          response:results,
        });
     
  });
}
catch(err){
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
};

// Find a findUser
exports.findUser = (req, res) => {
  try{
  Jobs.findUserId(req.params.userid, (err, results) => {
  
         res.send({
          status: 200,
          error: null,
          response:results,
        });
     
  });
}
catch(err){
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
};

// Find a single Job by Id
exports.findAppliedUser = (req, res) => {
  try{
   
  Jobs.findAppliedUserById(req.params.id, (err, results) => {
  
        res.send({
          status: 200,
          error: null,
          response:results,
        });
  });
}
catch(err){
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
};

exports.findJobByUser = (req, res) => {
  try{
  Jobs.findJobByUserId(req.params.id, (err, results) => {
  
        res.send({
          status: 200,
          error: null,
          response:results,
        });
      
  });
}
catch(err){
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
  try{
  Jobs.updateById(req.params.id, new Jobs(req.body), (err, data) => {
   res.send(data);
  });
}
catch(err){
    if (err.kind === "not_found") {
      res.status(404).send({
        error: `Not found job with id ${req.params.id}.`,
      });
    } else {
      res.status(500).send({
        error: "Error updating job with id " + req.params.id,
      });
    }
}
};

// Delete a Job with the specified id in the request
exports.delete = (req, res) => {
  try{
  Jobs.remove(req.params.id, (err, data) => {
    
      res.send({
        status: 200,
        error: null,
        message: `job was deleted successfully!`,
      });
  
  });
}
catch(err){
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
}
};

// Delete all Job from the database.
exports.deleteAll = (req, res) => {
  try{
  Jobs.removeAll((err, data) => {
      res.send({
        status: 200,
        error: null,
        message: `All jobs were deleted successfully!`,
      });
  });}
  catch(err){
    res.status(500).send({
      status: 500,
      error: err.message || "Some error occurred while removing all jobs.",
    });
  }
};
