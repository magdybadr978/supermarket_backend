const router = require("express").Router();
//const { body, validationResult } = require("express-validator");
const util = require("util"); // helper
const connection = require("../db_connection/database");
router.post("/products", async (req, res) => {
  try {
    const query = util.promisify(connection.query).bind(connection);
    await query(
      `INSERT INTO thecamp_market(product_name, product_value, product_quantity) VALUES ("${req.body.product_name}",${req.body.product_value},${req.body.product_quantity})`
    );
    res.status(200).send("post added successiful");
  } catch (err) {
    //console.log(err);
    res.status(500).send(err);
  }
});

router.get("/products", async(req,res) =>{
    try{
        const query = util.promisify(connection.query).bind(connection);
        const data = await query(
            `SELECT * FROM thecamp_market where 1`
        );
        res.status(200).send(data);
    }catch(err){
        res.status(500).send(err);
    }
});

module.exports = router;
