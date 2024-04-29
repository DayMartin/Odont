const router = require("express").Router();

const osController = require("../controllers/osController");

router.route("/os/all").get((req, res) => osController.getOss(req, res));
router.route("/os/create").post((req, res) => osController.createOs(req, res));
router.route("/os/get").post((req, res) => osController.getOs(req, res));
router.route("/os/delete").delete((req, res) => osController.deleteOS(req, res));


module.exports = router;