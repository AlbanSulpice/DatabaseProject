<template>
    <div class="hello">
      <p>
        ACTION = {{ action }}<br />
        ID = {{ id }}<br />
        <a href="/#/property/list/all">Back to the list</a><br />
        <a href="/#/property/edit/0">Add a new property</a><br />
      </p>
  
      <!-- For Datasheet: /property/show/42 -->
      <table v-if="action === 'show'" class="table table-striped table-bordered table-hover" > 
        <tr><td>ID</td><td>{{ oneProperty.property_id }}</td></tr>
        <tr><td>TYPE</td><td>{{ oneProperty.property_type }}</td></tr>
        <tr><td>SURFACE AREA</td><td>{{ oneProperty.property_surfacearea }}</td></tr>
        <tr><td>BATHROOMS</td><td>{{ oneProperty.property_bathrooms }}</td></tr>
        <tr><td>BEDROOMS</td><td>{{ oneProperty.property_bedrooms}}</td></tr>
        <tr><td>ADRESS</td><td>{{ oneProperty.property_adress}}</td></tr>
        <tr><td>LANDLORD</td><td>{{ oneProperty.property_landlord}}</td></tr>
      </table>
  
      <!-- For Form: /property/edit/23 -->
      <table v-if="action === 'edit'" class="table table-striped table-bordered table-hover"> 
        <tr><td>landlord</td>
          <td>
            <select name="property_landlord" v-model="oneProperty.property_landlord" >
              <option v-for="l of landlord" v-bind:key="l.landlord_id" :value="l.landlord_id" >
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
          <td>ID</td><td>NAME</td><td>SHOW DATASHEET</td><td>EDIT property</td><td>DELETE property</td>
        </tr>
        <tr v-for="p of property" v-bind:key="c.property_id">
          <td>{{ p.property_id }}</td>
          <td>{{ p.property_landlord}}</td>
          <td><a :href="'/#/property/show/' + p.property_id">[SHOW]</a></td>
          <td><a :href="`/#/property/edit/${p.property_id}`">[EDIT]</a></td>
          <td><input type="button" value="DELETE" @click="sendDeleteRequest()" /></td>
        </tr>
      </table>
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
          /*
          let responseproperty = await this.$http.get("xxxx");
          this.property = responseproperty.data;
          let responseLandlord = await this.$http.get("xxxx");
          this.landlord = responseLandlord.data;
          */
  
          this.landlord = [ { landlord_id: 1, landlord_surname: "Dupont", landlord_firstname: "Pierre" }, { landlord_id: 2, landlord_surname: "Martin", landlord_firstname: "Sophie" }, { landlord_id: 3, landlord_surname: "Durand", landlord_firstname: "Lucas" },{ landlord_id: 4, landlord_surname: "Bernard", landlord_firstname: "Elodie" },{ landlord_id: 5, landlord_surname: "Lefevre", landlord_firstname: "Nicolas" } ];
  
          this.property = [ { property_id: 1, property_type: "Appartement", property_surfacearea: "75m²", property_bathrooms: 2, property_bedrooms: 3, property_adress:"10 rue de Paris, 75001 Paris", property_landlord:1 }, { property_id: 2, property_type: "Maison", property_surfacearea: "120m²", property_bathrooms: 3, property_bedrooms: 5, property_adress: "25 avenue des Champs, 75008 Paris",property_landlord:2 },{ property_id: 3, property_type: "Studio", property_surfacearea: "25m²", property_bathrooms: 1, property_bedrooms: 1, property_adress: "5 rue de Lille, 75007 Paris",property_landlord:1 },{ property_id: 4, property_type: "Villa", property_surfacearea: "200m²", property_bathrooms: 4, property_bedrooms: 6, property_adress: "15 avenue Montaigne, 75008 Paris",property_landlord:3 },{ property_id: 5, property_type: "Maison", property_surfacearea: "150m²", property_bathrooms: 3, property_bedrooms: 4, property_adress: "12 rue du Bac, 75007 Paris",property_landlord:4 },{ property_id: 6, property_type: "Appartement", property_surfacearea: "85m²", property_bathrooms: 2, property_bedrooms: 3, property_adress: "8 rue de la Paix, 75002 Paris",property_landlord:5 } ];
  
          this.refreshoneProperty();
        }
        catch (ex) { console.log(ex); }
      }, 
      async refreshoneProperty() {
        if (this.$props.id === "all" || this.$props.id === "0") return;
        try {
          /*
            let responseproperty = await this.$http.get("xxxx");
            this.oneProperty = responseproperty.data;
          */
          this.oneProperty = this.property.find(property => property.property_id == this.$props.id);
        }
        catch (ex) { console.log(ex); }
      },
      async sendDeleteRequest() { },
      async sendEditRequest() { }
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
  a {
    color: #42b983;
  }
  p {
    color: darkgray;
  }
  #app table {
    width: 95%; margin: 20px;
  }
  #app td {
    text-align: left;
  }
  </style>