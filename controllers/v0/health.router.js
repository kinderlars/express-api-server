import { Router} from 'express';

const router = Router();

router.get('/', async (_req, res, _next) => {
  // optional: add further things to check (e.g. connecting to dababase)
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  };
  try {
    res.status(200).send(healthcheck);
  } catch (e) {
    healthcheck.message = e;
    res.status(503).send();
  }
});


export const HealthRouter = router;