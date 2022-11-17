module.exports = (app) => {
    const jobseeker = require("../controllers/jobseeker.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", jobseeker.create);
  
    // Retrieve all Tutorials
    router.get("/", jobseeker.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", jobseeker.findOne);
  
    // Retrieve a single Tutorial with id
    router.post("/login", jobseeker.findLoginUser);
  
    // Update a Tutorial with id
    router.put("/:id", jobseeker.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", jobseeker.delete);
  
    // Delete all Tutorials
    router.delete("/", jobseeker.deleteAll);
  
    app.use("/jobseeker", router);
  };
  