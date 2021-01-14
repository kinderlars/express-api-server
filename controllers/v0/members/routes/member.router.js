import { Router } from 'express';
import bodyParser from 'body-parser';
import * as uuid from 'uuid';

const router = Router();
router.use(bodyParser.json());

/* Temporary storage for testing only */
let members = [];

/* GET test member. */
router.get('/test', async (req, res, next) => {
  res.json({
    "id": 1,
    "firstname": "Peter",
    "surname": "Griffin",
    "email": "Test@test.com",
    "status":"active"
  });
});

/* GET all users, if exists */
router.get('/',async (req,res) => {
  try{
    let queryParam = req.query;

    if(members.length === 0){
      return res.status(400).send({message:"No data found!"});
    }

    // Checking for params === {} will not work
    if( Object.keys(queryParam).length === 0 ){
     return res.status(200).json(members).send();
    }

    const member = findUserByParam(queryParam);
    if(typeof member === 'undefined'){
      return res.status(400).send({message:`No entry found that matches the query parameter ${Object.keys(queryParam)}`})
    }
    console.log(member);
    res.status(200).json(member).send();

  }catch(e){
    console.error(e.message)
  }
});

router.get('/:id',async (req,res) => {
  try{
    let { id } = req.params;
    console.log(id)
    const member = findUserById(id);
    res.status(200).send(member);

  }catch(e){
    console.error(e.message);
  }
})

router.get('/',async (req,res) => {
  try {
    let queryParam = req.query;
    console.log(queryParam);
    res.status(200);

  }catch (e) {
    console.error(e.message)
  }
})

/* POST new user, and add uuid as id */
router.post('/',async (req,res) => {
  try{
    if(Object.keys(req.body).length === 0){
      return res.status(400).send({message: "Empty payload"})
    }

    const id = uuid.v4()

    const member = {
      id: id,
      firstname: req.body.firstname,
      surname: req.body.surname,
      email: req.body.email,
      status: req.body.status
    }

    members.push(member)
    res.status(200).send(member)
  }catch (e){
    console.error(e.message);
  }
})

function findUserById(id){
  console.log(id)
  return members.find(value =>
    value.id === id
  )
}

function findUserByParam(queryParam) {
  // console.log(Object.keys(queryParam));
  // console.log(Object.values(queryParam));

  const qParams = queryParam;
  const qKeys = Object.keys(queryParam);
  const qValues = Object.values(queryParam);

  console.log(`Params ${JSON.stringify(qParams)}`)
  console.log(`Keys ${qKeys}`)
  console.log(`Values ${qValues}`)

  console.log(`qkey variable has a length of ${qKeys.length}`)

  let result;

  if(qKeys.length > 1){
    console.log("multiple params provided")

    let filteredMembers = members.filter(value => value[qKeys] === qParams[qKeys])
    console.log(`Output for filteredMembers: ${JSON.stringify(filteredMembers)}`)
    qKeys.shift()

    if(qKeys.length > 1){
      let tmp = filteredMembers;
      for( let q of qKeys) {
        console.log(`Looping keys, now applying key ${q}`);
        tmp = tmp.filter(value =>
            value[q] === qParams[q])
        console.log(`Content of tmp ${JSON.stringify(tmp)}`)
      }

      result = tmp;
      return result;
    }

    return filteredMembers.filter(value =>
        value[qKeys] === qParams[qKeys]
    )
    return result;
  }

  console.log(`The query key ${qKeys}`)

  result = members.filter(value =>
    value[qKeys] === qParams[qKeys]
  )
  return result;
}

export const MemberRouter = router;
