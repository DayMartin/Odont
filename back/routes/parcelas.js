const router = require("express").Router();

const parcelas = require("../controllers/parcelas");

router.route("/parcelas/all").get((req, res) => parcelas.getParcelas(req, res));
router.route("/parcelas/id").post((req, res) => parcelas.getParcela(req, res));
router.route("/parcelas/idOs").post((req, res) => parcelas.getParcelaOs(req, res));
router.route("/parcelas/delete").delete((req, res) => parcelas.deleteParcela(req, res));


module.exports = router;