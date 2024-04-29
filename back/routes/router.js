const router = require("express").Router();


// users routes

const usersRouter = require("./users");

router.use("/", usersRouter);

// service routes

const servicoRouter = require("./servicos");

router.use("/", servicoRouter);

module.exports = router;


