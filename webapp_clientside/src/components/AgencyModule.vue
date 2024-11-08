<template>
    <div class="hello">
      <header id="header">
      <div id="logo-container">
        <img src="../assets/logoPrime.png" alt="Aspire Properties Logo" id="logo">
        <h1 id="agency-name">Aspire Properties</h1>
      </div>
      <div id="auth-buttons">
        <a href="/logIn" id="login-button">Log in</a>
        <a href="/register" id="register-button">Register</a>
      </div>
    </header>
    <main id="main-content">
      <p id="navigationComponent">
        <a href="/#/agency/list/all">Back to the list</a><br />
        <button id="addNewAgencyButton" @click="addNewAgency()">Add a new agency</button><br />
        <a href="../components/HelloWorld.vue">Home page</a>
      </p>
  
      <!-- For Datasheet: /agency/show/42 -->
      <table v-if="action === 'show'" class="table table-striped table-bordered table-hover" > 
        <tr><td>ID</td><td>{{ oneagency.agency_id }}</td></tr>
        <tr><td>agency NAME</td><td>{{ oneagency.agency_name }}</td></tr>
        <tr><td>agency ADRESS</td><td>{{ oneagency.agency_adress }}</td></tr>
        <tr><td>agency DateOfCreation</td><td>{{ oneagency.agency_dateofcreation }}</td></tr>
        <tr><td>agency NumberOfEmployees</td><td>{{ oneagency.agency_numberofemployees}}</td></tr>
        <tr><td>agency RATING</td><td>{{ oneagency.agency_rating }}</td></tr>
      </table>
  
      <!-- For Form: /agency/edit/23 -->
      <table v-if="action === 'edit'" class="table table-striped table-bordered table-hover"> 
        <tr><td>agency NAME</td>
          <td><input type="text" name="agency_adress" v-model="oneagency.agency_adress" /></td></tr>
        <tr><td>agency ADRESS</td>
          <td><input type="text" name="agency_name" v-model="oneagency.agency_name" /></td></tr>
        <tr><td>agency DateOfCreation</td>
          <td><input type="text" name="agency_dateofcreation" v-model="oneagency.agency_dateofcreation" /></td></tr>
        <tr><td>agency NumberOfEmployees</td>
          <td><input type="number" name="agency_numberofemployees" v-model="oneagency.agency_numberofemployees" /></td></tr>
        <tr><td>agency RATING</td>
          <td><input type="number" name="agency_rating" v-model="oneagency.agency_rating" /></td></tr>
        <tr><td colspan="2">
          <input type="button" value="SEND" @click="sendEditRequest()" /></td></tr>
      </table>
  
      <!-- For List: /agency/list/all -->
      <table v-if="action === 'list'" class="table table-striped table-bordered table-hover"> 
        <tr>
          <td>ID</td><td>NAME</td><td>SHOW DATASHEET</td><td>EDIT agency</td><td>DELETE agency</td>
        </tr>
        <tr v-for="c of agency" v-bind:key="c.agency_id">
          <td>{{ c.agency_id }}</td>
          <td>{{ c.agency_name }}</td>
          <td><a :href="'/#/agency/show/' + c.agency_id">[SHOW]</a></td>
          <td><a :href="`/#/agency/edit/${c.agency_id}`">[EDIT]</a></td>
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
    name: 'agency',
    props: ['action', 'id'],
    data () {
      return {
        agency: [],
        oneagency: {
          agency_id: 0,
          agency_name: 'xxx',
          agency_adress: 'xxx',
          agency_dateofcreation: 'xxx',
          agency_numberofemployees: 0,
          agency_rating: 0
        }
      }
    },
    methods: {
      async getAllData() {
        try {
          /*
          let responseagencys = await this.$http.get("xxxx");
          this.agency = responseagencys.data;
          */
  
          this.agency = [ { agency_id: 1, agency_name: "Agence Paris Immo", agency_adress: "50 rue de Rivoli, 75004 Paris", agency_dateofcreation: "2010-05-01", agency_numberofemployees: 50, agency_rating: 4.5 }, { agency_id: 2, agency_name: "ImmoLux", agency_adress: "22 rue Lafayette, 75009 Paris", agency_dateofcreation: "2012-07-15", agency_numberofemployees: 40, agency_rating: 4.8 },{ agency_id: 3, agency_name: "TopAgence", agency_adress: "85 avenue Foch, 75016 Paris", agency_dateofcreation: "2015-03-20", agency_numberofemployees: 30, agency_rating: 4.2 }];
  
          this.refreshOneagency();
        }
        catch (ex) { console.log(ex); }
      }, 
      async refreshOneagency() {
        if (this.$props.id === "all" || this.$props.id === "0") return;
        try {
          /*
            let responseagency = await this.$http.get("xxxx");
            this.oneagency = responseagency.data;
          */
          this.oneagency = this.agency.find(agency => agency.agency_id == this.$props.id);
        }
        catch (ex) { console.log(ex); }
      },
      async addNewAgency() {
  try {
    // Créez un nouvel objet pour l'agence avec des valeurs par défaut
    const newAgency = {
      agency_id: this.agency.length + 1, // Générez un nouvel ID basé sur la longueur actuelle du tableau
      agency_name: 'New Agency',
      agency_adress: 'Adress to define',
      agency_dateofcreation: new Date().toISOString().split('T')[0], // Date actuelle au format AAAA-MM-JJ
      agency_numberofemployees: 0,
      agency_rating: 0
    };

    // Ajoutez la nouvelle agence au tableau simulé
    this.agency.push(newAgency);

    // Affichez un message de confirmation
    alert("New agency added with success !");
  } catch (error) {
    console.error("Error when adding of the new agency :", error);
  }
},
    async sendDeleteRequest() {
    try {
      // Suppression dans le tableau simulé
      this.agency = this.agency.filter(agency => agency.agency_id !== this.oneagency.agency_id);
      alert("Agency deleted successfully!");
      this.oneagency = {}; // Réinitialise l'objet oneagency
    } catch (error) {
      alert("Error deleting Agency:", error);
    }
  },
  async sendEditRequest() {
    try {
      // Recherche et mise à jour du client dans le tableau simulé
      const index = this.agency.findIndex(agency => agency.agency_id === this.oneagency.agency_id);
      if (index !== -1) {
        this.agency[index] = { ...this.oneagency };
        alert("Agency updated successfully!");
      } else {
        console.error("Agency not found");
      }
    } catch (error) {
      console.error("Error updating Agency:", error);
    }
  }
    },
    watch: {
      id: function(newVal, oldVal) {
        this.refreshOneagency();
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
#navigationComponent {
  display: flex;
  justify-content: center;
  gap: 15px;  /* Espacement entre les liens */
}
#addNewAgencyButton {
  color: #42b983;
  background: none;
  border: none;
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

#addNewAgencyButton:hover {
  color: #388e3c;
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