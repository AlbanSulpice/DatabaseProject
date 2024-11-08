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
        <a href="/#/sale/list/all">Back to the list</a><br />
        <button id="addNewSaleButton" @click="addNewSale()">Add a new sale</button><br />
        <a href="../components/HelloWorld.vue">Home page</a>
      </p>
  
      <!-- For Datasheet: /sale/show/42 -->
      <table v-if="action === 'show'" class="table table-striped table-bordered table-hover" > 
        <tr><td>ID</td><td>{{ oneSale.sale_id }}</td></tr>
        <tr><td>AMOUNT</td><td>{{ oneSale.sale_amount }}</td></tr>
        <tr><td>COMISSION</td><td>{{ oneSale.sale_comission }}</td></tr>
        <tr><td>LANDLORD</td><td>
            <select name="sale_landlord" v-model="oneSale.sale_landlord" >
              <option v-for="l of landlords" v-bind:key="l.landlord_id" :value="l.landlord_id" >
                {{ l.landlord_surname }}
              </option>
            </select>
          </td></tr>
        <tr><td>CLIENT</td><td>
            <select name="sale_client" v-model="oneSale.sale_client" >
              <option v-for="l of client" v-bind:key="l.client_id" :value="l.client_id" >
                {{ l.client_name }}
              </option>
            </select>
          </td></tr>
        <tr><td>AGENCY</td><td>
            <select name="sale_agency" v-model="oneSale.sale_agency" >
              <option v-for="l of agency" v-bind:key="l.agency_id" :value="l.agency_id" >
                {{ l.agency_name }}
              </option>
            </select>
          </td></tr>
      </table>
  
      <!-- For Form: /sale/edit/23 -->
      <table v-if="action === 'edit'" class="table table-striped table-bordered table-hover"> 
        <tr><td>landlord</td>
          <td>
            <select name="sale_landlord" v-model="oneSale.sale_landlord" >
              <option v-for="l of landlords" v-bind:key="l.landlord_id" :value="l.landlord_id" >
                {{ l.landlord_surname }}
              </option>
            </select>
          </td></tr>
          <tr><td>client</td>
          <td>
            <select name="sale_client" v-model="oneSale.sale_client" >
              <option v-for="l of client" v-bind:key="l.client_id" :value="l.client_id" >
                {{ l.client_name }}
              </option>
            </select>
          </td></tr>
          <tr><td>agency</td>
          <td>
            <select name="sale_agency" v-model="oneSale.sale_agency" >
              <option v-for="l of agency" v-bind:key="l.agency_id" :value="l.agency_id" >
                {{ l.agency_name }}
              </option>
            </select>
          </td></tr>
        <tr><td>AMOUNT</td>
          <td><input type="text" name="sale_amount" v-model="oneSale.sale_amount" /></td></tr>
        <tr><td>COMISSION</td>
          <td><input type="text" name="sale_comission" v-model="oneSale.sale_comission" /></td></tr>
        <tr><td colspan="2">
          <input type="button" value="SEND" @click="sendEditRequest()" /></td></tr>
      </table>
  
      <!-- For List: /sale/list/all -->
      <table v-if="action === 'list'" class="table table-striped table-bordered table-hover"> 
        <tr>
          <td>ID</td><td>AMOUNT</td><td>SHOW DATASHEET</td><td>EDIT sale</td><td>DELETE sale</td>
        </tr>
        <tr v-for="p of sale" v-bind:key="p.sale_id">
          <td>{{ p.sale_id }}</td>
          <td>{{ p.sale_amount}}</td>
          <td><a :href="'/#/sale/show/' + p.sale_id">[SHOW]</a></td>
          <td><a :href="`/#/sale/edit/${p.sale_id}`">[EDIT]</a></td>
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
    name: 'sale',
    props: ['action', 'id'],
    data () {
      return {
        sale: [],
        landlords: [],
        client:[],
        agency:[],
        oneSale: {
          sale_id: 0,
          sale_amount: 'xxx',
          sale_comission: 'xxx',
        }
      }
    },
    methods: {
      async getAllData() {
        try {
          /*
          let responsesale = await this.$http.get("xxxx");
          this.sale = responsesale.data;
          let responseLandlord = await this.$http.get("xxxx");
          this.landlord = responseLandlord.data;
          */
          this.agency = [ { agency_id: 1, agency_name: "Agence Paris Immo", agency_adress: "50 rue de Rivoli, 75004 Paris", agency_dateofcreation: "2010-05-01", agency_numberofemployees: 50, agency_rating: 4.5 }, { agency_id: 2, agency_name: "ImmoLux", agency_adress: "22 rue Lafayette, 75009 Paris", agency_dateofcreation: "2012-07-15", agency_numberofemployees: 40, agency_rating: 4.8 },{ agency_id: 3, agency_name: "TopAgence", agency_adress: "85 avenue Foch, 75016 Paris", agency_dateofcreation: "2015-03-20", agency_numberofemployees: 30, agency_rating: 4.2 }];
          this.landlords = [ { landlord_id: 1, landlord_surname: "Dupont", landlord_firstname: "Pierre" }, { landlord_id: 2, landlord_surname: "Martin", landlord_firstname: "Sophie" }, { landlord_id: 3, landlord_surname: "Durand", landlord_firstname: "Lucas" },{ landlord_id: 4, landlord_surname: "Bernard", landlord_firstname: "Elodie" },{ landlord_id: 5, landlord_surname: "Lefevre", landlord_firstname: "Nicolas" } ];
          this.client = [ { client_id: 1, client_gender: "Female", client_name: "Alice Dupuis", client_email: "alice.dupuis@example.com", client_number: "0601010101", client_taxnumber: "FR1234567890" }, { client_id: 2, client_gender: "Male", client_name: "Marc Lemoine", client_email: "marc.lemoine@example.com", client_number: "0602020202", client_taxnumber: "FR0987654321" },{ client_id: 3, client_gender: "Female", client_name: "Julie Martin", client_email: "julie.martin@example.com", client_number: "0603030303", client_taxnumber: "FR1122334455" },{ client_id: 4, client_gender: "Male", client_name: "Thomas Brun", client_email: "thomas.brun@example.com", client_number: "0604040404", client_taxnumber: "FR2233445566" },{ client_id: 5, client_gender: "Female", client_name: "Emma Lefevre", client_email: "emma.lefevre@example.com", client_number: "0605050505", client_taxnumber: "FR3344556677" } ];
          this.sale = [ { sale_id: 1, sale_amount: "500000", sale_comission: "15000", sale_landlord: 1, sale_client: 1, sale_agency:1}, { sale_id: 2, sale_amount: "300000", sale_comission: "9000", sale_landlord: 2, sale_client: 2, sale_agency:1},{ sale_id: 3, sale_amount: "250000", sale_comission: "7500", sale_landlord: 3, sale_client: 3, sale_agency:2},{    sale_id: 4, sale_amount: "700000", sale_comission: "21000", sale_landlord: 4, sale_client: 4, sale_agency:2 },{ sale_id: 5, sale_amount: "400000", sale_comission: "12000", sale_landlord: 5, sale_client: 5, sale_agency:3 }];
  
          this.refreshoneSale();
        }
        catch (ex) { console.log(ex); }
      }, 
      async refreshoneSale() {
        if (this.$props.id === "all" || this.$props.id === "0") return;
        try {
          /*
            let responsesale = await this.$http.get("xxxx");
            this.oneSale = responsesale.data;
          */
          this.oneSale = this.sale.find(sale => sale.sale_id == this.$props.id);
        }
        catch (ex) { console.log(ex); }
      },
      async addNewSale() {
    try {
      // Create a new sale with default values
      const newSale = {
        sale_id: this.sale.length + 1, // Auto-increment ID based on array length
        sale_amount: "Unknown",
        sale_comission: "Unknown",
        sale_landlord: this.landlords.length > 0 ? this.landlords[0].landlord_id:0,
        sale_client: this.client.length > 0 ? this.client[0].client_id:0,
        sale_agency: this.agency.length > 0 ? this.agency[0].agency_id:0
      };

      // Add the new sale to the local array
      this.sale.push(newSale);
      console.log('New sale successfully added (simulation)');
    } catch (error) {
      console.error('Error while adding a new sale (simulation):', error);
    }
  },
      async sendDeleteRequest() {
    try {
      // Simulate deletion by removing the sale from the local array
      this.sale = this.sale.filter(p => p.sale_id !== this.oneSale.sale_id);
      alert('sale successfully deleted ');
    } catch (error) {
      console.error('Error while deleting the sale :', error);
    }
  },

  // Function to simulate editing a sale
  async sendEditRequest() {
    try {
      // Simulate updating the sale in the local array
      const index = this.sale.findIndex(p => p.sale_id === this.oneSale.sale_id);
      if (index !== -1) {
        this.sale[index] = { ...this.oneSale };
        console.log('sale successfully edited (simulation)');
      } else {
        console.error('sale not found for editing (simulation)');
      }
    } catch (error) {
      console.error('Error while editing the sale (simulation):', error);
    }
  }
    },
    watch: {
      id: function(newVal, oldVal) {
        this.refreshoneSale();
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
#addNewSaleButton {
  color: #42b983;
  background: none;
  border: none;
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

#addNewSaleButton:hover {
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