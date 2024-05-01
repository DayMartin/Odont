const router = require("express").Router();


// users routes

const usersRouter = require("./users");

router.use("/", usersRouter);

// servico routes

const servicoRouter = require("./servicos");

router.use("/", servicoRouter);

// os routes

const osRouter = require("./os");

router.use("/", osRouter);

// parcelas routes

const parcelasRouter = require("./parcelas");

router.use("/", parcelasRouter);


module.exports = router;
