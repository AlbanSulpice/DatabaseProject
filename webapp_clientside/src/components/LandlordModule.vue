<template>
    <div class="hello">
      <header id="header">
        <div id="logo-container">
          <a href="../components/HelloWorld.vue"><img src="../assets/logoPrime.png" alt="Aspire Properties Logo" id="logo"></a>
          <h1 id="landlord-name">Aspire Properties</h1>
        </div>
        <div id="auth-buttons">
          <a href="/#/auth" id="register-button">Log in</a>
          <a href="../components/HelloWorld.vue">Home page</a>
        </div>
      </header>
      <main id="main-content">
      <p id="navigationComponent">
        
        <a href="/#/landlord/list/all">Back to the list</a><br />
        <button id="addNewlandlordButton" @click="addNewLandlord()">Add a new landlord</button><br />
      </p>
  
      <!-- For Datasheet: /landlord/show/42 -->
      <table v-if="action === 'show'" class="table table-striped table-bordered table-hover" > 
        <tr><td>ID</td><td>{{ oneLandlord.landlord_id }}</td></tr>
        <tr><td>LANDLORD FIRSTNAME</td><td>{{ oneLandlord.landlord_firstname }}</td></tr>
        <tr><td>LANDLORD SURNAME</td><td>{{ oneLandlord.landlord_surname }}</td></tr>
      </table>
  
      <!-- For Form: /landlord/edit/23 -->
      <table v-if="action === 'edit'" class="table table-striped table-bordered table-hover"> 
        <tr><td>SURNAME</td>
          <td><input type="text" name="landlord_surname" v-model="oneLandlord.landlord_surname" /></td></tr>
        <tr><td>FIRSTNAME</td>
          <td><input type="text" name="landlord_firstname" v-model="oneLandlord.landlord_firstname" /></td></tr>
        <tr><td colspan="2">
          <input type="button" value="SEND" @click="sendEditRequest()" /></td></tr>
      </table>
  
      <!-- For List: /landlord/list/all -->
      <table v-if="action === 'list'" class="table table-striped table-bordered table-hover"> 
        <tr>
          <td>ID</td><td>SURNAME</td><td>FIRSTNAME</td><td>SHOW DATASHEET</td><td>EDIT landlord</td><td>DELETE landlord</td>
        </tr>
        <tr v-for="c of landlord" v-bind:key="c.landlord_id">
          <td>{{ c.landlord_id }}</td>
          <td>{{ c.landlord_surname }}</td>
          <td>{{ c.landlord_firstname }}</td>
          <td><a :href="'/#/landlord/show/' + c.landlord_id">[SHOW]</a></td>
          <td><a :href="`/#/landlord/edit/${c.landlord_id}`">[EDIT]</a></td>
          <td><input type="button" value="DELETE" @click="sendDeleteRequest(c.landlord_id)" /></td>
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
    name: 'landlord',
    props: ['action', 'id'],
    data () {
      return {
        landlord: [],
        oneLandlord: {
          landlord_id: 0,
          landlord_firstname: 'xxx',
          landlord_surname: 'xxx',
        }
      }
    },
    methods: {
      async getAllData() {
        try {
          
          let responselandlords = await this.$http.get("http://localhost:9000/landlordsapi/list");
          this.landlord = responselandlords.data;
  
          //this.landlord = [ { landlord_id: 1, landlord_firstname: "Pierre", landlord_surname: "Dupont"}, { landlord_id: 2, landlord_firstname: "Sophie", landlord_surname: "Martin"},{ landlord_id: 3, landlord_firstname: "Lucas", landlord_surname: "Durant"},{ landlord_id: 4, landlord_firstname: "Elodie", landlord_surname: "Bernard"},{ landlord_id: 5, landlord_firstname: "Nicolas", landlord_surname: "Lefevre"} ];
  
          this.refreshoneLandlord();
        }
        catch (ex) { console.log(ex); }
      }, 
      async refreshoneLandlord() {
        if (this.$props.id === "all" || this.$props.id === "0") {
          this.oneLandlord = {
            landlord_id: 0,
          landlord_firstname: 'xxx',
          landlord_surname: 'xxx'
        };
        return;
        };
        try {
          
            let responselandlord = await this.$http.get("http://localhost:9000/landlordsapi/show/"+ this.$props.id);
            this.oneLandlord = responselandlord.data;
          
          //this.oneLandlord = this.landlord.find(landlord => landlord.landlord_id == this.$props.id);
        }
        catch (ex) { console.log(ex); }
      },
      async addNewLandlord() {
  try {
    // Make a POST request to the backend to add a new landlord
    const response = await this.$http.post("http://localhost:9000/landlordsapi/add");

    // The response will contain the new landlord's ID
    const newLandlordId = response.data.newLandlordId;

    // Optionally, you can redirect the user to the newly created landlord's page
    this.$router.push({ path: `/landlord/show/${newLandlordId}` });

    // You can also refresh the landlord list if needed
    this.getAllData();
  } catch (error) {
    console.error("Error adding new landlord:", error);
    alert("Failed to add new landlord");
  }
}
,
    async sendDeleteRequest(landlordId) {
      try {
        alert("DELETING... " + landlordId);
        let response = await this.$http.get("http://localhost:9000/landlordsapi/del/" + landlordId);
        alert("DELETED: " + response.data.rowsDeleted);
        this.getAllData();
      }
      catch (ex) { console.log(ex); }
    },
    async sendEditRequest() {
      try {
        alert("EDITING... " + this.oneLandlord.landlord_id);
        let response = await this.$http.post(
              "http://localhost:9000/landlordsapi/update/" + this.oneLandlord.landlord_id, this.oneLandlord);
        alert("EDITED: " + response.data.rowsUpdated);
        this.$router.push({ path: '/landlord' });
        this.getAllData();
      }
      catch (ex) { console.log(ex); }
    }
  },
    watch: {
      id: function(newVal, oldVal) {
        this.refreshoneLandlord();
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
  #addNewlandlordButton {
    color: #42b983;
    background: none;
    border: none;
    font-size: 16px;
    text-decoration: none;
    cursor: pointer;
    transition: color 0.3s ease;
  }
  
  #addNewlandlordButton:hover {
    color: #388e3c;
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
  
  #landlord-name {
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
  
  .btn-navigation:hover {
    background-color: #218838;  /* Vert plus foncé au survol */
    border-color: #218838;  /* Bordure plus foncée au survol */
  }
  
  .btn-navigation:active {
    background-color: #1e7e34;  /* Encore plus foncé quand on clique */
    border-color: #1e7e34;
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