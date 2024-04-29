const router = require("express").Router();

const servicoController = require("../controllers/servicosController");

router.route("/servicos/all").get((req, res) => servicoController.getService(req, res));
router.route("/servicos/create").post((req, res) => servicoController.createServico(req, res));
router.route("/servicos/get").post((req, res) => servicoController.getServico(req, res));
router.route("/servicos/delete").delete((req, res) => servicoController.deleteServico(req, res));


module.exports = router;