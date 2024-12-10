<template>
    <div class="hello">
      <header id="header">
      <div id="logo-container">
        <a href="../components/HelloWorld.vue"><img src="../assets/logoPrime.png" alt="Aspire Properties Logo" id="logo"></a>
        <h1 id="property-name">Aspire Properties</h1>
      </div>
      <div id="auth-buttons">
        <a href="/#/auth" id="register-button">Log in</a>
        <a href="../components/HelloWorld.vue">Home page</a>
      </div>
    </header>
    <main id="main-content">
    <p id="navigationComponent">
        <a href="/#/property/list/all">Back to the list</a><br />
        <button id="addNewPropertyButton" @click="addNewProperty()">Add a new property</button><br />
      </p>
  
      <!-- For Datasheet: /property/show/42 -->
      <table v-if="action === 'show'" class="table table-striped table-bordered table-hover" > 
        <tr><td>ID</td><td>{{ oneProperty.property_id }}</td></tr>
        <tr><td>TYPE</td><td>{{ oneProperty.property_type }}</td></tr>
        <tr><td>SURFACE AREA</td><td>{{ oneProperty.property_surfacearea }}</td></tr>
        <tr><td>BATHROOMS</td><td>{{ oneProperty.property_bathrooms }}</td></tr>
        <tr><td>BEDROOMS</td><td>{{ oneProperty.property_bedrooms}}</td></tr>
        <tr><td>ADRESS</td><td>{{ oneProperty.property_adress}}</td></tr>
        <tr>
  <td>LANDLORD</td>
  <td>
    <select name="property_landlord" v-model="oneProperty.property_landlord">
      <!-- Afficher tous les landlords -->
      <option v-for="l of landlords" 
              v-bind:key="l.landlord_id" 
              :value="l.landlord_id">
        {{ l.landlord_firstname }}
      </option>
    </select>
  </td>
</tr>
      </table>
  
      <!-- For Form: /property/edit/23 -->
      <table v-if="action === 'edit'" class="table table-striped table-bordered table-hover"> 
        <tr><td>landlord</td>
          <td>
            <select name="property_landlord" v-model="oneProperty.property_landlord" >
              <option v-for="l of landlords" v-bind:key="l.landlord_id" :value="l.landlord_id" >
                {{ l.landlord_firstname }}
              </option>
            </select>
          </td></tr>
        <tr><td>TYPE</td>
          <td><input type="text" name="property_type" v-model="oneProperty.property_type" /></td></tr>
        <tr><td>SURFACE AREA</td>
          <td><input type="text" name="property_surfacearea" v-model="oneProperty.property_surfacearea" /></td></tr>
        <tr><td>BATHROOMS</td>
          <td><input type="number" name="property_bathrooms" v-model="oneProperty.property_bathrooms" /></td></tr>
        <tr><td>BEDROOMS</td>
          <td><input type="number" name="property_bedrooms" v-model="oneProperty.property_bedrooms" /></td></tr>
        <tr><td>ADRESS</td>
          <td><input type="text" name="property_adress" v-model="oneProperty.property_adress" /></td></tr>
        <tr><td colspan="2">
          <input type="button" value="SEND" @click="sendEditRequest()" /></td></tr>
      </table>
  
      <!-- For List: /property/list/all -->
      <table v-if="action === 'list'" class="table table-striped table-bordered table-hover"> 
        <tr>
          <td>ID</td><td>ADRESS</td><td>SHOW DATASHEET</td><td>EDIT property</td><td>DELETE property</td>
        </tr>
        <tr v-for="p of property" v-bind:key="p.property_id">
          <td>{{ p.property_id }}</td>
          <td>{{ p.property_adress}}</td>
          <td><a :href="'/#/property/show/' + p.property_id">[SHOW]</a></td>
          <td><a :href="`/#/property/edit/${p.property_id}`">[EDIT]</a></td>
          <td><input type="button" value="DELETE" @click="sendDeleteRequest(p.property_id)" /></td>
        </tr>
      </table>
    </main>
    <footer id="footer">
      <p>©2024 Aspire Properties, Inc.</p>
    </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'property',
    props: ['action', 'id'],
    data () {
      return {
        property: [],
        landlords: [],
        oneProperty: {
          property_id: 0,
          property_type: 'xxx',
          property_surfacearea: 'xxx',
          property_bathrooms: 0,
          property_bedrooms: 0,
          property_adress: 'xxx',
          property_landlord: 0
        }
      }
    },
    methods: {
      async getAllData() {
        try {
          
          let responseproperty = await fetch("http://localhost:9000/propertiesapi/list");
          this.property = await responseproperty.json();
          let responseLandlord = await this.$http.get("http://localhost:9000/propertiesapi/landlords");
          this.landlords = responseLandlord.data;
          
  
          //this.landlords = [ { landlord_id: 1, landlord_surname: "Dupont", landlord_firstname: "Pierre" }, { landlord_id: 2, landlord_surname: "Martin", landlord_firstname: "Sophie" }, { landlord_id: 3, landlord_surname: "Durand", landlord_firstname: "Lucas" },{ landlord_id: 4, landlord_surname: "Bernard", landlord_firstname: "Elodie" },{ landlord_id: 5, landlord_surname: "Lefevre", landlord_firstname: "Nicolas" } ];
  
          //this.property = [ { property_id: 1, property_type: "Appartement", property_surfacearea: "75m²", property_bathrooms: 2, property_bedrooms: 3, property_adress:"10 rue de Paris, 75001 Paris", property_landlord:1 }, { property_id: 2, property_type: "Maison", property_surfacearea: "120m²", property_bathrooms: 3, property_bedrooms: 5, property_adress: "25 avenue des Champs, 75008 Paris",property_landlord:2 },{ property_id: 3, property_type: "Studio", property_surfacearea: "25m²", property_bathrooms: 1, property_bedrooms: 1, property_adress: "5 rue de Lille, 75007 Paris",property_landlord:1 },{    property_id: 4, property_type: "Villa", property_surfacearea: "200m²", property_bathrooms: 4, property_bedrooms: 6, property_adress: "15 avenue Montaigne, 75008 Paris",property_landlord:3 },{ property_id: 5, property_type: "Maison", property_surfacearea: "150m²", property_bathrooms: 3, property_bedrooms: 4, property_adress: "12 rue du Bac, 75007 Paris",property_landlord:4 },{ property_id: 6, property_type: "Appartement", property_surfacearea: "85m²", property_bathrooms: 2, property_bedrooms: 3, property_adress: "8 rue de la Paix, 75002 Paris",property_landlord:5 } ];
  
          this.refreshoneProperty();
        }
        catch (ex) { console.log(ex); }
      }, 
      async refreshoneProperty() {
        if (this.$props.id === "all" || this.$props.id === "0") {
        this.oneProperty = {
          property_id: 0,
          property_type: 'xxx',
          property_surfacearea: 'xxx',
          property_bathrooms: 0,
          property_bedrooms: 0,
          property_adress: 'xxx',
          property_landlord: 0
        };
        return;
      };
        try {
          
            let responseproperty = await this.$http.get("http://localhost:9000/propertiesapi/show/"+ this.$props.id);
            this.oneProperty = responseproperty.data;
          
          //this.oneProperty = this.property.find(property => property.property_id == this.$props.id);
        }
        catch (ex) { console.log(ex); }
      },
      async addNewProperty() {
  try {
    // Send a request to the backend to add a new client
    let response = await this.$http.post("http://localhost:9000/propertiesapi/add");

    // Assuming the backend returns the new client ID
    if (response.status === 201) {
      alert(`New property added with ID: ${response.data.newPropertyId}`);
      this.getAllData();  // Refresh the list of clients
    } else {
      alert("Failed to add new property.");
    }
  } catch (ex) {
    console.log(ex);
    alert("An error occurred while adding the property.");
  }
  }
,
      async sendDeleteRequest(propertyId) {
      try {
        alert("DELETING... " + propertyId);
        let response = await this.$http.get("http://localhost:9000/propertiesapi/del/" + propertyId);
        alert("DELETED: " + response.data.rowsDeleted);
        this.getAllData();
      }
      catch (ex) { console.log(ex); }
    },
    async sendEditRequest() {
      try {
        alert("EDITING... " + this.oneProperty.property_id);
        let response = await this.$http.post(
              "http://localhost:9000/propertiesapi/update/" + this.oneProperty.property_id, this.oneProperty);
        alert("EDITED: " + response.data.rowsUpdated);
        this.$router.push({ path: '/property' });
        this.getAllData();
      }
      catch (ex) { console.log(ex); }
    }
  },
  getLandlordName(landlordId) {
    const landlord = this.landlords.find(l => l.landlord_id === landlordId);
    return landlord ? landlord.landlord_firstname : 'Unknown';
  },
    watch: {
      id: function(newVal, oldVal) {
        this.refreshoneProperty();
      }
    },
    created(){
      this.getAllData();
    }
  }
  </script>
  
  <style scoped>
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Style pour le header */
#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #333;
  color: white;
}
#addNewPropertyButton {
  color: #42b983;
  background: none;
  border: none;
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

#addNewPropertyButton:hover {
  color: #388e3c;
}
#navigationComponent {
  display: flex;
  justify-content: center;
  gap: 15px;  /* Espacement entre les liens */
}

.btn-navigation {
  display: inline-block;
  padding: 10px 20px;
  background-color: #28a745;  /* Fond vert */
  color: white;
  text-decoration: none;  /* Retirer le soulignement des liens */
  border: 2px solid #28a745;  /* Bordure verte */
  border-radius: 5px;
  font-weight: bold;
  text-align: center;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
#footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 15px;
  background-color: #333;
  color: white;
  font-size: 1em;
}
.btn-navigation:hover {
  background-color: #218838;  /* Vert plus foncé au survol */
  border-color: #218838;  /* Bordure plus foncée au survol */
}

.btn-navigation:active {
  background-color: #1e7e34;  /* Encore plus foncé quand on clique */
  border-color: #1e7e34;
}
#logo-container {
  display: flex;
  align-items: center;
}

#logo {
  width: 50px;
  height: auto;
  margin-right: 20px;
}

#property-name {
  font-size: 2.5em;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
}

/* Style pour les boutons de connexion et d'inscription */
#auth-buttons {
  display: flex;
  gap: 20px;
}

#auth-buttons a {
  padding: 12px 20px;
  text-decoration: none;
  color: #333;
  background-color: #1aff00;
  border-radius: 5px;
  font-weight: 500;
  transition: background-color 0.3s ease, color 0.3s ease;
}

#auth-buttons a:hover {
  background-color: #00e608;
  color: white;
}
  /* Global styles */
  a {
    color: #42b983;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  a:hover {
    color: #388e3c;
  }
  
  p {
    color: darkgray;
    font-size: 16px;
  }
  
  /* Table styles */
  table {
    width: 95%;
    margin: 20px;
    border-collapse: collapse;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  table th, table td {
    padding: 12px 18px;
    text-align: left;
    border: 1px solid #ddd;
  }
  
  table th {
    background-color: #f4f4f4;
    font-weight: bold;
  }
  
  table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  table tr:hover {
    background-color: #f1f1f1;
    transition: background-color 0.3s ease;
  }
  
  /* Input fields */
  input[type="text"], input[type="number"] {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  input[type="button"] {
    background-color: #42b983;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  input[type="button"]:hover {
    background-color: #388e3c;
  }
  
  /* Button links */
  .btn-link {
    color: #42b983;
    font-weight: bold;
    transition: color 0.3s ease;
  }
  
  .btn-link:hover {
    color: #388e3c;
  }
  
  /* Submit button */
  .btn-submit {
    background-color: #42b983;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-submit:hover {
    background-color: #388e3c;
  }
  
  /* Action buttons (SHOW/EDIT) */
  .btn-action {
    color: #42b983;
    font-weight: bold;
    text-decoration: none;
    padding: 5px 10px;
    border: 1px solid #42b983;
    border-radius: 4px;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  .btn-action:hover {
    background-color: #42b983;
    color: white;
  }
  
  /* Delete button */
  .btn-delete {
    background-color: #f44336;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-delete:hover {
    background-color: #d32f2f;
  }
  </style>