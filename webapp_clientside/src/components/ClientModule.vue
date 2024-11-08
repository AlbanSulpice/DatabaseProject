<template>
  <div class="hello">
    <header id="header">
      <div id="logo-container">
        <img src="../assets/logoPrime.png" alt="Aspire Properties Logo" id="logo">
        <h1 id="agency-name">Aspire Properties</h1>
      </div>
      <div id="auth-buttons">
        <a href="/#/login" id="login-button">Log in</a>
        <a href="/#/inscription" id="register-button">Register</a>
      </div>
    </header>
    <main id="main-content">
    <p id="navigationComponent">
      
      <a href="/#/client/list/all">Back to the list</a><br />
      <button id="addNewClientButton" @click="addNewClient()">Add a new client</button><br />
      <a href="../components/HelloWorld.vue">Home page</a>
    </p>

    <!-- For Datasheet: /client/show/42 -->
    <table v-if="action === 'show'" class="table table-striped table-bordered table-hover" > 
      <tr><td>ID</td><td>{{ oneClient.client_id }}</td></tr>
      <tr><td>CLIENT GENDER</td><td>{{ oneClient.client_gender }}</td></tr>
      <tr><td>CLIENT NAME</td><td>{{ oneClient.client_name }}</td></tr>
      <tr><td>CLIENT EMAIL</td><td>{{ oneClient.client_email }}</td></tr>
      <tr><td>CLIENT NUMBER</td><td>{{ oneClient.client_number}}</td></tr>
      <tr><td>CLIENT TAX NUMBER</td><td>{{ oneClient.client_taxnumber }}</td></tr>
    </table>

    <!-- For Form: /client/edit/23 -->
    <table v-if="action === 'edit'" class="table table-striped table-bordered table-hover"> 
      <tr><td>CLIENT NAME</td>
        <td><input type="text" name="client_name" v-model="oneClient.client_name" /></td></tr>
      <tr><td>CLIENT GENDER</td>
        <td><input type="text" name="client_gender" v-model="oneClient.client_gender" /></td></tr>
      <tr><td>CLIENT EMAIL</td>
        <td><input type="text" name="client_email" v-model="oneClient.client_email" /></td></tr>
      <tr><td>CLIENT NUMBER</td>
        <td><input type="text" name="client_number" v-model="oneClient.client_number" /></td></tr>
      <tr><td>CLIENT TAX NUMBER</td>
        <td><input type="text" name="client_taxnumber" v-model="oneClient.client_taxnumber" /></td></tr>
      <tr><td colspan="2">
        <input type="button" value="SEND" @click="sendEditRequest()" /></td></tr>
    </table>

    <!-- For List: /client/list/all -->
    <table v-if="action === 'list'" class="table table-striped table-bordered table-hover"> 
      <tr>
        <td>ID</td><td>NAME</td><td>SHOW DATASHEET</td><td>EDIT client</td><td>DELETE client</td>
      </tr>
      <tr v-for="c of client" v-bind:key="c.client_id">
        <td>{{ c.client_id }}</td>
        <td>{{ c.client_name }}</td>
        <td><a :href="'/#/client/show/' + c.client_id">[SHOW]</a></td>
        <td><a :href="`/#/client/edit/${c.client_id}`">[EDIT]</a></td>
        <td><input type="button" value="DELETE" @click="sendDeleteRequest()" /></td>
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
  name: 'client',
  props: ['action', 'id'],
  data () {
    return {
      client: [],
      oneClient: {
        client_id: 0,
        client_gender: 'xxx',
        client_name: 'xxx',
        client_email: 'xxx',
        client_number: 'xxx',
        client_taxnumber: 'xxx'
      }
    }
  },
  methods: {
    async getAllData() {
      try {
        /*
        let responseclients = await this.$http.get("xxxx");
        this.client = responseclients.data;
        */

        this.client = [ { client_id: 1, client_gender: "Female", client_name: "Alice Dupuis", client_email: "alice.dupuis@example.com", client_number: "0601010101", client_taxnumber: "FR1234567890" }, { client_id: 2, client_gender: "Male", client_name: "Marc Lemoine", client_email: "marc.lemoine@example.com", client_number: "0602020202", client_taxnumber: "FR0987654321" },{ client_id: 3, client_gender: "Female", client_name: "Julie Martin", client_email: "julie.martin@example.com", client_number: "0603030303", client_taxnumber: "FR1122334455" },{ client_id: 4, client_gender: "Male", client_name: "Thomas Brun", client_email: "thomas.brun@example.com", client_number: "0604040404", client_taxnumber: "FR2233445566" },{ client_id: 5, client_gender: "Female", client_name: "Emma Lefevre", client_email: "emma.lefevre@example.com", client_number: "0605050505", client_taxnumber: "FR3344556677" } ];

        this.refreshOneclient();
      }
      catch (ex) { console.log(ex); }
    }, 
    async refreshOneclient() {
      if (this.$props.id === "all" || this.$props.id === "0") return;
      try {
        /*
          let responseclient = await this.$http.get("xxxx");
          this.oneClient = responseclient.data;
        */
        this.oneClient = this.client.find(client => client.client_id == this.$props.id);
      }
      catch (ex) { console.log(ex); }
    },
    async addNewClient() {
    try {
      // Génération d'un nouvel ID
      const newId = this.client.length ? Math.max(...this.client.map(client => client.client_id)) + 1 : 1;
      
      // Création d'un nouveau client avec les valeurs par défaut ou celles que l'utilisateur a saisies
      const newClient = {
        client_id: newId,
        client_gender: this.oneClient.client_gender || "Unknown",
        client_name: this.oneClient.client_name || "New Client",
        client_email: this.oneClient.client_email || "new@example.com",
        client_number: this.oneClient.client_number || "0000000000",
        client_taxnumber: this.oneClient.client_taxnumber || "FR0000000000"
      };
      
      // Ajout du nouveau client au tableau
      this.client.push(newClient);
      alert("New client added successfully!");

      // Réinitialisation de oneClient pour un nouveau formulaire
      this.oneClient = {
        client_id: 0,
        client_gender: "",
        client_name: "",
        client_email: "",
        client_number: "",
        client_taxnumber: ""
      };
    } catch (error) {
      console.error("Error adding new client:", error);
    }
  },
    async sendDeleteRequest() {
    try {
      // Suppression dans le tableau simulé
      this.client = this.client.filter(client => client.client_id !== this.oneClient.client_id);
      alert("Client deleted successfully!");
      this.oneClient = {}; // Réinitialise l'objet oneClient
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  },
  async sendEditRequest() {
    try {
      // Recherche et mise à jour du client dans le tableau simulé
      const index = this.client.findIndex(client => client.client_id === this.oneClient.client_id);
      if (index !== -1) {
        this.client[index] = { ...this.oneClient };
        alert("Client updated successfully!");
      } else {
        alert("Client not found");
      }
    } catch (error) {
      console.error("Error updating client:", error);
    }
  }
  },
  watch: {
    id: function(newVal, oldVal) {
      this.refreshOneclient();
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
#addNewClientButton {
  color: #42b983;
  background: none;
  border: none;
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

#addNewClientButton:hover {
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

#agency-name {
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