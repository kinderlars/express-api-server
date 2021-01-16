/**
 * This router manages product requests
 */

import { Router } from 'express';
import * as uuid from "uuid";
import bodyParser from 'body-parser';
import { ProductService } from "../../../../services/product.service.js";

/**
 * Create express router to manage incoming requests
 * @type {Router}
 */
const router = Router();
router.use(bodyParser.json());

let products = [];

router.get('/',async (req, res) => {
  try{
    const productService = new ProductService();
    const result = productService.getProducts();
    console.log(result)
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