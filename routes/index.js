const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/place/add", (req, res, next) => {
  res.render("place-form.hbs");
});

router.post("/process-place", (req, res, next) => {
  res.send(req.body);
});


module.exports = router;
