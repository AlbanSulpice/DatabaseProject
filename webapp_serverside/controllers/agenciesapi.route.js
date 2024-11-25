// controllers/carsapi.route.js
const express = require('express');
const router = express.Router();
const agencyRepo = require('../utils/agencies.repository');

router.get('/list', agencyListAction);
router.get('/show/:agencyId', agencyShowAction);
router.get('/del/:agencyId', agencyDelAction);
router.post('/update/:agencyId', agencyUpdateAction);

async function agencyListAction(request, response) {
    var agencies = await agencyRepo.getAllAgencies();
    response.send(JSON.stringify(agencies));
}
async function agencyShowAction(request, response) {
    var oneAgency = await agencyRepo.getOneAgency(request.params.agencyId);
    response.send(JSON.stringify(oneAgency));
}
async function agencyDelAction(request, response) {
    // TODO: first remove extras for car, unless the car cannot be removed!!!
    var numRows = await agencyRepo.delOneAgency(request.params.agencyId);
    let result = { rowsDeleted: numRows };
    response.send(JSON.stringify(result));
}
async function agencyUpdateAction(request, response) {
    // var json = JSON.stringify(request.body); // bodyParser can process json in body + regular POST form input too
    // console.log(json);
    // TODO: !!! INPUT VALIDATION !!!
    var agencyId = request.params.agencyId;
    if (agencyId==="0") agencyId = await agencyRepo.addOneAgency(); 
    var numRows = await agencyRepo.editOneAgency(agencyId, 
        request.body.agency_name, 
        request.body.agency_adress, 
        request.body.agency_dateofcreation, 
        request.body.agency_numberofemployees, 
        request.body.agency_rating);
    let result = { rowsUpdated: numRows };
    response.send(JSON.stringify(result));
}

module.exports = router;