<template>
    <div class="hello">
      <p>
        ACTION = {{ action }}<br />
        ID = {{ id }}<br />
        <a href="/#/agency/list/all">Back to the list</a><br />
        <a href="/#/agency/edit/0">Add a new agency</a><br />
      </p>
  
      <!-- For Datasheet: /agency/show/42 -->
      <table v-if="action === 'show'" class="table table-striped table-bordered table-hover" > 
        <tr><td>ID</td><td>{{ oneagency.agency_id }}</td></tr>
        <tr><td>agency NAME</td><td>{{ oneagency.agency_name }}</td></tr>
        <tr><td>agency ADRESS</td><td>{{ oneagency.agency_adress }}</td></tr>
        <tr><td>agency DateOfCreation</td><td>{{ oneagency.agency_dateofcreation }}</td></tr>
        <tr><td>agency NumberOfEmployees/td><td>{{ oneagency.agency_numberofemployees}}</td></tr>
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
      async sendDeleteRequest() { },
      async sendEditRequest() { }
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