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
    async delOneAgency(agencyId) {
        const connection = await pool.getConnection(); // Obtenir une connexion
        try {
            await connection.beginTransaction(); // Commencer une transaction
    
            // Supprimer les ventes associées à l'agence
            let deleteSalesSql = "DELETE FROM sales WHERE sale_agency = ?";
            await connection.execute(deleteSalesSql, [agencyId]);
    
            // Supprimer l'agence
            let deleteAgencySql = "DELETE FROM agencies WHERE agency_id = ?";
            const [okPacket] = await connection.execute(deleteAgencySql, [agencyId]);
    
            await connection.commit(); // Valider la transaction
            console.log("DELETE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        } catch (err) {
            await connection.rollback(); // Annuler la transaction en cas d'erreur
            console.log(err);
            throw err;
        } finally {
            connection.release(); // Libérer la connexion
        }
    }
    ,
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
