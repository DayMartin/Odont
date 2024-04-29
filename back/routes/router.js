const router = require("express").Router();


// users routes

const usersRouter = require("./users");

router.use("/", usersRouter);

// servico routes

const servicoRouter = require("./servicos");

router.use("/", servicoRouter);

module.exports = router;

// os routes

const osRouter = require("./os");

router.use("/", osRouter);

module.exports = router;
