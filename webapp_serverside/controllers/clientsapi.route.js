// controllers/clientsapi.route.js
const express = require('express');
const router = express.Router();
const clientRepo = require('../utils/clients.repository');
const auth = require("../utils/users.auth");

router.get('/list', clientListAction);
router.get('/show/:clientID', clientShowAction);
router.get('/del/:clientID',auth.authorizeRequest("ADMIN"), clientDelAction);
router.post('/update/:clientID',auth.authorizeRequest("ADMIN"), clientUpdateAction);
router.post('/add',auth.authorizeRequest("ADMIN"), clientAddAction);

async function clientListAction(request, response) {
    var clients = await clientRepo.getAllClients();
    response.send(JSON.stringify(clients));
}
async function clientShowAction(request, response) {
    var oneClient = await clientRepo.getOneClient(request.params.clientID);
    response.send(JSON.stringify(oneClient));
}
async function clientDelAction(request, response) {
    // TODO: first remove extras for client, unless the client cannot be removed!!!
    var numRows = await clientRepo.delOneClient(request.params.clientID);
    let result = { rowsDeleted: numRows };
    response.send(JSON.stringify(result));
}
async function clientUpdateAction(request, response) {
    // var json = JSON.stringify(request.body); // bodyParser can process json in body + regular POST form input too
    // console.log(json);
    // TODO: !!! INPUT VALIDATION !!!
    var clientID = request.params.clientID;
    if (clientID==="0") clientID = await clientRepo.addOneClient();
     
    var numRows = await clientRepo.editOneClient(clientID, 
        request.body.client_gender, 
        request.body.client_name, 
        request.body.client_email, 
        request.body.client_number, 
        request.body.client_taxnumber);
    let result = { rowsUpdated: numRows };
    response.send(JSON.stringify(result));
}
async function clientAddAction(request, response) {
    try {
        // Ajoute un client et récupère son ID
        const newClientId = await clientRepo.addOneClient();

        // Retourne une réponse avec l'ID du nouveau client
        let result = { newClientId };
        response.status(201).send(JSON.stringify(result));
    } catch (error) {
        console.error("Error adding new client:", error);
        response.status(500).send({ error: "Failed to add client" });
    }
}
module.exports = router;