// controllers/landlordsapi.route.js
const express = require('express');
const router = express.Router();
const landlordRepo = require('../utils/landlords.repository');
const auth = require("../utils/users.auth");

router.get('/list', landlordListAction);
router.get('/show/:landlordId', landlordShowAction);
router.get('/del/:landlordId',auth.authorizeRequest("ADMIN"), landlordDelAction);
router.post('/update/:landlordId',auth.authorizeRequest("ADMIN"), landlordUpdateAction);
router.post('/add',auth.authorizeRequest("ADMIN"), landlordAddAction);

async function landlordListAction(request, response) {
    var landlords = await landlordRepo.getAllLandlords();
    response.send(JSON.stringify(landlords));
}
async function landlordShowAction(request, response) {
    var oneLandlord = await landlordRepo.getOneLandlord(request.params.landlordId);
    response.send(JSON.stringify(oneLandlord));
}
async function landlordDelAction(request, response) {
    // TODO: first remove extras for car, unless the car cannot be removed!!!
    var numRows = await landlordRepo.delOneLandlord(request.params.landlordId);
    let result = { rowsDeleted: numRows };
    response.send(JSON.stringify(result));
}
async function landlordUpdateAction(request, response) {
    // var json = JSON.stringify(request.body); // bodyParser can process json in body + regular POST form input too
    // console.log(json);
    // TODO: !!! INPUT VALIDATION !!!
    var landlordId = request.params.landlordId;
    if (landlordId==="0") landlordId = await landlordRepo.addOneLandlord(); 
    var numRows = await landlordRepo.editOneLandlord(landlordId, 
        request.body.landlord_firstname, 
        request.body.landlord_surname);
    let result = { rowsUpdated: numRows };
    response.send(JSON.stringify(result));
}
async function landlordAddAction(request, response) {
    try {
        const newLandlordId = await landlordRepo.addOneLandlord();

        let result = { newLandlordId };
        response.status(201).send(JSON.stringify(result));
    } catch (error) {
        console.error("Error adding new landlord:", error);
        response.status(500).send({ error: "Failed to add landlord" });
    }
}
module.exports = router;