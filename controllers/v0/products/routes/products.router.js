/**
 * This router manages product requests
 */

import { Router } from 'express';
import * as uuid from "uuid";
import bodyParser from 'body-parser';
import { getProducts } from "../../../../services/product.service.js";

/**
 * Create express router to manage incoming requests
 * @type {Router}
 */
const router = Router();
router.use(bodyParser.json());

let products = [];

router.get('/', async (req, res) => {
  try{
    // TODO: This is causing me problems, as I need the output of the getProducts function
    const results = await getProducts();
    results.then(products.push(results))
    console.log(products)
    
    if(products.length){
      return res.status(400).send({message: "No data was found in table"})
    }
    res.status(200).send(`I succeeded ${JSON.stringify(products)}`)
    // if(products.length===0){
    //   return res.status(400).send("No products found!")
    // }
    //res.status(200).send(JSON.stringify(products))
  }catch (e){
    console.error(e.message)
  }
})

router.post('/', async (req,res) => {
  try{
    if(Object.keys(req.body).length === 0) {
      return res.status(400).send({message: "Empty payload"})
    }

    const id = uuid.v4()

    const product = {
      id: id,
      name: req.body.name,
      description: req.body.description,
      vendor: req.body.vendor
    }

    products.push(product)
    res.status(200).send(product)

  }catch (e) {
    console.error(e.message)
  }
})

export const ProductRouter = router;