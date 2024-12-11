pool = require(__dirname + "\\db.include.js"); // use same folder as the current file

module.exports = {
    getBlankLandlord(){ // defines the entity model
        return {
            "landlord_id": 0,
          "landlord_firstname": "XXXX",
          "landlord_surname": "XXXX",
        };
    },
    
    async getAllLandlords(){ 
        try {
            let sql = "SELECT * FROM landlords";
            const [rows, fields] = await pool.execute(sql);
            console.log("LANDLORDS FETCHED: "+rows.length);
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async getLandlordsByName(name){ 
        try {
            let sql = "SELECT * FROM landlords WHERE upper(name) like upper(?)";
            const [rows, fields] = await pool.execute(sql, [ `%${name}%` ]);
            console.log("landlordS FILTERED: "+rows.length);
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async getOneLandlord(landlordId){ 
        try {
            // sql = "SELECT * FROM landlords INNER JOIN brands ON landlord_brand=brand_id WHERE landlord_id = "+landlordId; 
            // SQL INJECTION => !!!!ALWAYS!!!! sanitize user input!
            // escape input (not very good) OR prepared statements (good) OR use orm (GOOD!)
            let sql = "SELECT * FROM landlords  WHERE landlord_id = ?";
            const [rows, fields] = await pool.execute(sql, [ landlordId ]);
            console.log("SINGLE LANDLORD FETCHED: "+rows.length);
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
    async delOneLandlord(landlordId) {
        const connection = await pool.getConnection(); // Obtenir une connexion
        try {
            await connection.beginTransaction(); // Commencer une transaction
    
            // Supprimer les ventes associées au landlord
            let deleteSalesSql = "DELETE FROM sales WHERE sale_landlord = ?";
            await connection.execute(deleteSalesSql, [landlordId]);
    
            // Supprimer les propriétés associées au landlord
            let deletePropertiesSql = "DELETE FROM properties WHERE property_landlord = ?";
            await connection.execute(deletePropertiesSql, [landlordId]);
    
            // Supprimer le landlord
            let deleteLandlordSql = "DELETE FROM landlords WHERE landlord_id = ?";
            const [okPacket] = await connection.execute(deleteLandlordSql, [landlordId]);
    
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
    async addOneLandlord(){ 
        try {
            let sql = "INSERT INTO landlords (landlord_id) VALUES (NULL) ";
            const [okPacket, fields] = await pool.execute(sql); 
            console.log("INSERT " + JSON.stringify(okPacket));
            return okPacket.insertId;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async editOneLandlord(landlordId, landlordFirstName, landlordSurName){ 
        try {
            let sql = "UPDATE landlords SET landlord_firstname=?, landlord_surname=? WHERE landlord_id=? "; // positional parameters
            const [okPacket, fields] = await pool.execute(sql, 
                  [landlordFirstName, landlordSurName, landlordId]); // positional parameters
            console.log("UPDATE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    }
};
