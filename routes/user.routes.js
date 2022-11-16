module.exports = app => {
    const users = require("../controllers/users.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", users.create);
  
    // Retrieve all Tutorials
    router.get("/", users.findAll);

        // Retrieve a single Tutorial with id
    router.get("/:id", users.findOne);
  
     // Retrieve a single Tutorial with id
     router.post("/login", users.findLoginUser);
  

    // Update a Tutorial with id
    router.put("/:id", users.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", users.delete);
  
    // Delete all Tutorials
    router.delete("/", users.deleteAll);
  
    app.use('/users', router);
  };