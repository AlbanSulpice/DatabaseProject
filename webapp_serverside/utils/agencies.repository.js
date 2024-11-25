// utils/agencies.repository.js
pool = require(__dirname + "\\db.include.js"); // use same folder as the current file

module.exports = {
    getBlankAgency(){ // defines the entity model
        return {
            "agency_id": 0,
            "agency_name": "XXXX",
            "agency_adress": "XXXX",
            "agency_dateofcreation": "XXXX",
            "agency_numberofemployees": 0,
            "agency_rating": 0
        };
    },
    
    async getAllAgencies(){ 
        try {
            let sql = "SELECT * FROM agencies";
            const [rows, fields] = await pool.execute(sql);
            console.log("AGENCIES FETCHED: "+rows.length);
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async getAgenciesByName(name){ 
        try {
            let sql = "SELECT * FROM agencies WHERE upper(name) like upper(?)";
            const [rows, fields] = await pool.execute(sql, [ `%${name}%` ]);
            console.log("AGENCIES FILTERED: "+rows.length);
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async getOneAgency(agencyId){ 
        try {
            // sql = "SELECT * FROM agencies INNER JOIN brands ON agency_brand=brand_id WHERE agency_id = "+agencyId; 
            // SQL INJECTION => !!!!ALWAYS!!!! sanitize user input!
            // escape input (not very good) OR prepared statements (good) OR use orm (GOOD!)
            let sql = "SELECT * FROM agencies WHERE agency_id = ?";
            const [rows, fields] = await pool.execute(sql, [ agencyId ]);
            console.log("SINGLE agency FETCHED: "+rows.length);
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
    async delOneAgency(agencyId){ 
        try {
            let sql = "DELETE FROM agencies WHERE agency_id = ?";
            const [okPacket, fields] = await pool.execute(sql, [ agencyId ]); 
            console.log("DELETE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async addOneAgency(){   
        try {
            let sql = "INSERT INTO agencies (agency_id) VALUES (NULL) ";
            const [okPacket, fields] = await pool.execute(sql); 
            console.log("INSERT " + JSON.stringify(okPacket));
            return okPacket.insertId;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async editOneAgency(agencyId, agencyAdress, agencyName, agencyDateOfCreation, agencyNumberOfEmployee, agencyRating){ 
        try {
            let sql = "UPDATE agencies SET agency_name=?, agency_adress=?, agency_dateofcreation=?, agency_numberofemployees=?, agency_rating=? WHERE agency_id=? "; // positional parameters
            const [okPacket, fields] = await pool.execute(sql, 
                  [agencyName, agencyAdress, agencyDateOfCreation, agencyNumberOfEmployee, agencyRating, agencyId]); // positional parameters
            console.log("UPDATE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    }
};
