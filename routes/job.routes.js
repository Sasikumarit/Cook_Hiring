module.exports = (app) => {
    const jobs = require("../controllers/jobs.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", jobs.create);
  
    // Retrieve all Tutorials
    router.get("/", jobs.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", jobs.findOne);
  
    // Retrieve a single Tutorial with id
    router.post("/login", jobs.findLoginUser);
  
    // Update a Tutorial with id
    router.put("/:id", jobs.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", jobs.delete);
  
    // Delete all Tutorials
    router.delete("/", jobs.deleteAll);
  
    app.use("/jobs", router);
  };
  