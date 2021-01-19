/**
 * This router manages product requests
 */

import { Router } from 'express';
import * as uuid from "uuid";
import bodyParser from 'body-parser';
import {
  createProduct,
  getProducts
} from "../../../../services/product.service.js";

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
    // Check for singelton
    // const productService = new ProductService();
    // const results = await productService.getProducts();

    products = await getProducts()
    //console.info(products)

    if(products.length === 0){
      return res.status(400).send({message: "No data was found in table"})
    }
    res.status(200).send(products)
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
    console.log(product)

    const status = await createProduct(product)
    if (!status){
      res.status(400).send("Product was not added!")
    }
    res.status(200).send("Product was added!")


  }catch (e) {
    console.error(e.message)
  }
})

export const ProductRouter = router;