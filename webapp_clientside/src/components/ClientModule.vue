<template>
  <div class="hello">
    <p>
      ACTION = {{ action }}<br />
      ID = {{ id }}<br />
      <a href="/#/client/list/all">Back to the list</a><br />
      <a href="/#/client/edit/0">Add a new client</a><br />
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
    async sendDeleteRequest() { },
    async sendEditRequest() { }
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