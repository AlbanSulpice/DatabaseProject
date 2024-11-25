// controllers/propertiesapi.route.js
const express = require('express');
const router = express.Router();
const propertyRepo = require('../utils/properties.repository');

router.get('/landlords', landlordListAction);
router.get('/list', propertyListAction);
router.get('/show/:propertyId', propertyShowAction);
router.get('/del/:propertyId', propertyDelAction);
router.post('/update/:propertyId', propertyUpdateAction);

// http://localhost:9000/propertiesapi/landlords
async function landlordListAction(request, response) {
    var landlords = await propertyRepo.getAllLandlords();
    response.send(JSON.stringify(landlords));
}

async function propertyListAction(request, response) {
    var properties = await propertyRepo.getAllProperties();
    response.send(JSON.stringify(properties));
}
async function propertyShowAction(request, response) {
    var oneProperty = await propertyRepo.getOneProperty(request.params.propertyId);
    response.send(JSON.stringify(oneProperty));
}
async function propertyDelAction(request, response) {
    // TODO: first remove extras for car, unless the car cannot be removed!!!
    var numRows = await propertyRepo.delOneProperty(request.params.propertyId);
    let result = { rowsDeleted: numRows };
    response.send(JSON.stringify(result));
}
async function propertyUpdateAction(request, response) {
    // var json = JSON.stringify(request.body); // bodyParser can process json in body + regular POST form input too
    // console.log(json);
    // TODO: !!! INPUT VALIDATION !!!
    var propertyId = request.params.propertyId;
    if (propertyId==="0") propertyId = await propertyRepo.addOneProperty(request.body.property_landlord); 
    var numRows = await propertyRepo.editOneProperty(propertyId, 
        request.body.property_landlord, 
        request.body.property_type, 
        request.body.property_surfacearea, 
        request.body.property_bathrooms, 
        request.body.property_bedrooms,
        request.body.property_adress);
    let result = { rowsUpdated: numRows };
    response.send(JSON.stringify(result));
}

module.exports = router;