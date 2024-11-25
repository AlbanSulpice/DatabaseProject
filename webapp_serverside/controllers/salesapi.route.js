// controllers/salesapi.route.js
const express = require('express');
const router = express.Router();
const saleRepo = require('../utils/sales.repository');

router.get('/landlords', landlordsListAction);
router.get('/properties', propertiesListAction);
router.get('/agencies', agenciesListAction);
router.get('/list', saleListAction);
router.get('/show/:saleId', saleShowAction);
router.get('/del/:saleId', saleDelAction);
router.post('/update/:saleId', saleUpdateAction);

// http://localhost:9000/salesapi/brands
async function landlordsListAction(request, response) {
    var landlords = await saleRepo.getAllLandlords();
    response.send(JSON.stringify(landlords));
}
async function propertiesListAction(request, response) {
    var properties = await saleRepo.getAllProperties();
    response.send(JSON.stringify(properties));
}
async function agenciesListAction(request, response) {
    var agencies = await saleRepo.getAllAgencies();
    response.send(JSON.stringify(agencies));
}
async function saleListAction(request, response) {
    var sales = await saleRepo.getAllSales();
    response.send(JSON.stringify(sales));
}
async function saleShowAction(request, response) {
    var oneSale = await saleRepo.getOneSale(request.params.saleId);
    response.send(JSON.stringify(oneSale));
}
async function saleDelAction(request, response) {
    // TODO: first remove extras for car, unless the car cannot be removed!!!
    var numRows = await saleRepo.delOneSale(request.params.saleId);
    let result = { rowsDeleted: numRows };
    response.send(JSON.stringify(result));
}
async function saleUpdateAction(request, response) {
    // var json = JSON.stringify(request.body); // bodyParser can process json in body + regular POST form input too
    // console.log(json);
    // TODO: !!! INPUT VALIDATION !!!
    var saleId = request.params.saleId;
    if (saleId==="0") saleId = await saleRepo.addOneSale(request.body.sale_landlord, request.body.sale_property, request.body.sale_agency); 
    var numRows = await saleRepo.editOneSale(saleId, 
        request.body.sale_amount, 
        request.body.sale_comission, 
        request.body.sale_landlord, 
        request.body.sale_property, 
        request.body.sale_agency);
    let result = { rowsUpdated: numRows };
    response.send(JSON.stringify(result));
}

module.exports = router;