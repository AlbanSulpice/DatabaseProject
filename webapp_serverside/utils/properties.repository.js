// utils/properties.repository.js
pool = require(__dirname + "\\db.include.js"); // use same folder as the current file

module.exports = {
    getBlankProperty(){ // defines the entity model
        return {
            "property_id": 0,
          "property_type": "XXXX",
          "property_surfacearea": "XXXX",
          "property_bathrooms": 0,
          "property_bedrooms": 0,
          "property_adress": "XXXX",
          "property_landlord": 0
        };
    },
    async getAllLandlords(){ // TODO? move to landlords.repository.js
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
    async getAllProperties(){ 
        try {
            let sql = "SELECT * FROM properties "; // INNER JOIN landlords ON property_landlord=landlord_id
            const [rows, fields] = await pool.execute(sql);
            console.log("PROPERTIES FETCHED: "+rows.length);
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async getPropertiesByName(name){ 
        try {
            let sql = "SELECT * FROM properties INNER JOIN landlords ON property_landlord=landlord_id WHERE upper(name) like upper(?)";
            const [rows, fields] = await pool.execute(sql, [ `%${name}%` ]);
            console.log("PROPERTIES FILTERED: "+rows.length);
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async getOneProperty(PropertyId){ 
        try {
            // sql = "SELECT * FROM properties INNER JOIN landlords ON property_landlord=landlord_id WHERE property_id = "+PropertyId; 
            // SQL INJECTION => !!!!ALWAYS!!!! sanitize user input!
            // escape input (not very good) OR prepared statements (good) OR use orm (GOOD!)
            let sql = "SELECT * FROM properties WHERE property_id = ?";
            const [rows, fields] = await pool.execute(sql, [ PropertyId ]);
            console.log("SINGLE PROPERTY FETCHED: "+rows.length);
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
    async delOneProperty(PropertyId){ 
        try {
            let sql = "DELETE FROM properties WHERE property_id = ?";
            const [okPacket, fields] = await pool.execute(sql, [ PropertyId ]); 
            console.log("DELETE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async addOneProperty(){ 
        try {
            let sql = "INSERT INTO properties (property_id) VALUES (NULL) ";
            const [okPacket, fields] = await pool.execute(sql); 
            console.log("INSERT " + JSON.stringify(okPacket));
            return okPacket.insertId;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async editOneProperty(PropertyId, PropertyLandlord, PropertyType, PropertySurfaceArea, PropertyBathrooms, PropertyBedrooms,PropertyAdress){ 
        try {
            let sql = "UPDATE properties SET property_landlord=?, property_type=?, property_surfacearea=?, property_bathrooms=?, property_bedrooms=?, property_adress=? WHERE property_id=? "; // positional parameters
            const [okPacket, fields] = await pool.execute(sql, 
                  [PropertyLandlord, PropertyType, PropertySurfaceArea, PropertyBathrooms, PropertyBedrooms, PropertyAdress, PropertyId]); // positional parameters
            console.log("UPDATE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    }
};
