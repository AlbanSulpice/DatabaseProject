// utils/Sales.repository.js
pool = require(__dirname + "\\db.include.js"); // use same folder as the current file

module.exports = {
    getBlankSale(){ // defines the entity model
        return {
            "sale_id": 0,
          "sale_amount": 0,
          "sale_comission": 0,
          "sale_landlord":0,
          "sale_client":0,
          "sale_agency":0
        };
    },
    async getAllLandlords(){ // TODO? move to brands.repository.js
        try {
            let sql = "SELECT * FROM landlords";
			// .execute() does: getConnection() + prepare() + query() + releaseConnection()
            const [rows, fields] = await pool.execute(sql); 
            console.log("LANDLORDS FETCHED: "+rows.length);
            return rows;
        }
        catch (err) {
            // TODO: log/send error ... 
            console.log(err);
            throw err; // return false ???
        }
    },
    async getAllClients(){ // TODO? move to brands.repository.js
        try {
            let sql = "SELECT * FROM clients";
			// .execute() does: getConnection() + prepare() + query() + releaseConnection()
            const [rows, fields] = await pool.execute(sql); 
            console.log("clients FETCHED: "+rows.length);
            return rows;
        }
        catch (err) {
            // TODO: log/send error ... 
            console.log(err);
            throw err; // return false ???
        }
    },
    async getAllAgencies(){ // TODO? move to brands.repository.js
        try {
            let sql = "SELECT * FROM agencies";
			// .execute() does: getConnection() + prepare() + query() + releaseConnection()
            const [rows, fields] = await pool.execute(sql); 
            console.log("AGENCIES FETCHED: "+rows.length);
            return rows;
        }
        catch (err) {
            // TODO: log/send error ... 
            console.log(err);
            throw err; // return false ???
        }
    },
    async getAllSales(){ 
        try {
            let sql = "SELECT * FROM sales INNER JOIN landlords ON sale_landlord=landlord_id INNER JOIN clients ON sale_client=client_id INNER JOIN agencies ON sale_agency=agency_id";
            const [rows, fields] = await pool.execute(sql);
            console.log("SaleS FETCHED: "+rows.length);
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async getSalesByName(name){ 
        try {
            let sql = "SELECT * FROM sales INNER JOIN landlords ON sale_landlord=landlord_id INNER JOIN clients ON sale_client=client_id INNER JOIN agencies ON sale_agency=agency_id WHERE upper(name) like upper(?)";
            const [rows, fields] = await pool.execute(sql, [ `%${name}%` ]);
            console.log("SaleS FILTERED: "+rows.length);
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async getOneSale(SaleId){ 
        try {
            // sql = "SELECT * FROM Sales INNER JOIN brands ON sale_landlord=landlord_id WHERE Sale_id = "+SaleId; 
            // SQL INJECTION => !!!!ALWAYS!!!! sanitize user input!
            // escape input (not very good) OR prepared statements (good) OR use orm (GOOD!)
            let sql = "SELECT * FROM sales INNER JOIN landlords ON sale_landlord=landlord_id INNER JOIN clients ON sale_client=client_id INNER JOIN agencies ON sale_agency=agency_id WHERE Sale_id = ?";
            const [rows, fields] = await pool.execute(sql, [ SaleId ]);
            console.log("SINGLE Sale FETCHED: "+rows.length);
            if (rows.length == 1) {
                return rows[0];
            } else {
                return false;
            }
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async delOneSale(SaleId){ 
        try {
            let sql = "DELETE FROM sales WHERE Sale_id = ?";
            const [okPacket, fields] = await pool.execute(sql, [ SaleId ]); 
            console.log("DELETE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async addOneSale(landlordId, propertyId, agencyId){ 
        try {
            let sql = "INSERT INTO sales (sale_id, sale_landlord, sale_client, sale_agency) VALUES (NULL, ?, ?, ?) ";
            const [okPacket, fields] = await pool.execute(sql, [ landlordId, propertyId, agencyId ]); 
            console.log("INSERT " + JSON.stringify(okPacket));
            return okPacket.insertId;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async editOneSale(SaleId, SaleAmount, SaleComission, SaleLandlord, SaleProperty, SaleAgency){ 
        try {
            let sql = "UPDATE sales SET sale_amount=?, sale_comission=?, sale_landlord=?, sale_client=?, sale_agency=? WHERE Sale_id=? "; // positional parameters
            const [okPacket, fields] = await pool.execute(sql, 
                  [SaleAmount, SaleComission, SaleLandlord, SaleProperty, SaleAgency, SaleId]); // positional parameters
            console.log("UPDATE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    }
};
