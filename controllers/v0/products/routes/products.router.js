/**
 * This router manages product requests
 */

import { Router } from 'express';
import * as uuid from "uuid";
import bodyParser from 'body-parser';
import {
  createProduct, deleteProduct, getProduct,
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

router.get('/:id',async (req, res) => {
    try{
      const matches = await getProduct(req.params.id)
      if(matches.length === 0 ){
        return res.status(400).send({message: "No product found with this id"})
      }
      res.status(200).send(matches)

    }catch (e){
      console.error(e)
    }
  }
)

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

router.delete('/:id',async (req,res) =>{
  try {
    const id = req.params.id

    // More generic would be to implement !==36
    // TODO: Implement once all old items are removed from Dynamodb table
    // if (id.length < 36){
    //   console.log(`Passed uuid is too short ${id.length}`)
    //   res.status(400).send({message: "The uuid provided seems to be too short"})
    // } else if (id.length >36){
    //   console.log(`Passed uuid is too long ${id.length}`)
    // }

    if(!await getProduct(id)){
      res.status(400).send({message: "No product with this id found"})
    }
    const productsDelete = await deleteProduct(id)
    res.status(200).send({message: `Product with the id ${id} deleted.`})
  }catch (e) {
    console.error(e.message)
  }
})

export const ProductRouter = router;