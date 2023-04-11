const router = require("express").Router();
const connection = require("../db_connection/database");
//const { body, validationResult } = require("express-validator");
const util = require("util"); // helper

router.post("/sells", async (req, res) => {
  try {
    const query = util.promisify(connection.query).bind(connection);
    await query(
      `INSERT INTO thecamp_market_sells( product_id, sells_quantity) VALUES (${req.body.product_id},${req.body.sells_quantity})`
    );
    const data = await query(
      `select sold_quantity from thecamp_market where id = ${req.body.product_id}`
    );
    data[0].sold_quantity = parseInt(data[0].sold_quantity);
    data[0].sold_quantity +=parseInt(req.body.sells_quantity) ;
    console.log(data[0]);
    await query(
      `UPDATE thecamp_market SET sold_quantity = ${data[0].sold_quantity} where id = ${req.body.product_id}`
    );
    //console.log(data[0].sold_quantity);
    res.status(200).send("post added successiful");
  } catch (err) {
    //console.log(err);
    res.status(500).send(err);
  }
});


router.get("/sells", async(req,res) =>{
    try{
        const query = util.promisify(connection.query).bind(connection);
        const data = await query(
            `select id , sold_quantity from thecamp_market where 1`
        );
        res.status(200).send(data);
    }catch(err){
        res.status(500).send(err);
    }
});
module.exports = router;
