import { Router} from 'express';
import {HealthRouter} from "./health.router.js";
import {MemberRouter} from "./members/routes/member.router.js";

const router = Router();

router.use("/health", HealthRouter);
router.use("/members", MemberRouter);


router.get('/', function(req, res, next) {
  res.send('V0');
});

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index');
});

router.post('/',function (req,res) {

})

export const IndexRouter = router;
