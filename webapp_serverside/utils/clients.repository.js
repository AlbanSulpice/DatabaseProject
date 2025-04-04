// utils/clients.repository.js
pool = require(__dirname + "\\db.include.js"); // use same folder as the current file

module.exports = {
    getBlankClient(){ // defines the entity model
        return {
            "client_id": 0,
            "client_gender": "M",
            "client_name": "XXXX",
            "client_email": "XXXX",
            "client_number": "XXXX",
            "client_taxnumber": "XXXX"
        };
    },

    async getAllClients(){ 
        try {
            let sql = "SELECT * FROM clients";
            const [rows, fields] = await pool.execute(sql);
            console.log("CLIENTS FETCHED: "+rows.length);
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async getClientsByName(name){ 
        try {
            let sql = "SELECT * FROM clients WHERE upper(name) like upper(?)";
            const [rows, fields] = await pool.execute(sql, [ `%${name}%` ]);
            console.log("CLIENTS FILTERED: "+rows.length);
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async getOneClient(clientId){ 
        try {
            // sql = "SELECT * FROM clients INNER JOIN brands ON client_brand=brand_id WHERE client_id = "+clientId; 
            // SQL INJECTION => !!!!ALWAYS!!!! sanitize user input!
            // escape input (not very good) OR prepared statements (good) OR use orm (GOOD!)
            let sql = "SELECT * FROM clients WHERE client_id = ?";
            const [rows, fields] = await pool.execute(sql, [ clientId ]);
            console.log("SINGLE CLIENT FETCHED: "+rows.length);
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
    async delOneClient(clientId) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
    
            // Supprimer les ventes associées
            let deleteSalesSql = "DELETE FROM sales WHERE sale_client = ?";
            await connection.execute(deleteSalesSql, [clientId]);
    
            // Supprimer le client
            let deleteClientSql = "DELETE FROM clients WHERE client_id = ?";
            const [okPacket] = await connection.execute(deleteClientSql, [clientId]);
    
            await connection.commit();
            console.log("DELETE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        } catch (err) {
            await connection.rollback();
            console.log(err);
            throw err;
        } finally {
            connection.release();
        }
    
    },
    async addOneClient() {
        let connection;
        try {
            connection = await pool.getConnection(); // Obtenir une connexion du pool
    
            // Insérer un client avec tous les champs à NULL (puisque les colonnes acceptent NULL)
            let sqlInsert = `INSERT INTO clients (client_gender, client_name, client_email, client_number, client_taxnumber) 
                             VALUES (?, ?, ?, ?, ?)`;
    
            // Exécution de la requête avec NULL pour tous les champs
            const [okPacket] = await connection.execute(sqlInsert, [null, null, null, null, null]);
    
            console.log("INSERT " + JSON.stringify(okPacket));
            
            // Retourner l'ID généré automatiquement pour ce client
            return okPacket.insertId; 
    
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            if (connection) connection.release(); // Libérer la connexion
        }
    }
    ,
    async editOneClient(clientId, clientGender, clientName, clientEmail, clientNumber, clientTaxNumber){ 
        try {
            let sql = "UPDATE clients SET client_gender=?, client_name=?, client_email=?, client_number=?, client_taxnumber=? WHERE client_id=? "; // positional parameters
            const [okPacket, fields] = await pool.execute(sql, 
                  [clientGender, clientName, clientEmail, clientNumber, clientTaxNumber, clientId]); // positional parameters
            console.log("UPDATE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
};
