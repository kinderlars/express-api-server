import { Router} from 'express';
import {HealthRouter} from "./health.router";
import {MemberRouter} from "./members/routes/member.router";
import {ProductRouter} from "./products/routes/products.router";

const router = Router();

router.use("/health", HealthRouter);
router.use("/members", MemberRouter);
router.use("/products", ProductRouter)


router.get('/', function(req, res, next) {
  res.send('V0');
});

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.send("Index")
});

export const IndexRouter = router;
