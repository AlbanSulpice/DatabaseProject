<template>
  <div class="hello">
    <h1>Log in</h1>
    <a href="../components/HelloWorld.vue">Home page</a>
    <p>{{ msg }}</p>
    <input type="button" @click="sendRequest('post', 'login', { username: 'joeuser', userpass: 'joeXXX' })" value="LOGIN BAD" />
    <input type="button" @click="sendRequest('post', 'login', { username: 'joeuser', userpass: 'joepass' })" value="LOGIN USER" />
    <input type="button" @click="sendRequest('post', 'login', { username: 'joeadmin', userpass: 'joepass' })" value="LOGIN ADMIN" />
    <input type="button" @click="sendRequest('get', 'user')" value="ACCESS /user" />
    <input type="button" @click="sendRequest('get', 'admin')" value="ACCESS /admin" />
    <input type="button" @click="sendRequest('get', 'protected')" value="ACCESS /protected" />
    <input type="button" @click="sendRequest('get', 'logout')" value="LOGOUT" />
  </div>
</template>

<script>
export default {
  name: 'AuthenticationDemo',
  
  methods: {
    async sendRequest(method, endpoint, params) {
      try {
        let response = null;
        if (method === "post") 
          response = await this.$http.post("http://localhost:9000/auth/"+endpoint, params);
        else
          response = await this.$http.get("http://localhost:9000/auth/"+endpoint);
        this.msg = JSON.stringify(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  },

}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
}

/* Background Style */
.hello {
  background-color: #f0f0f0;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
}

h1 {
  font-size: 3em;
  color: #333;
  margin-bottom: 20px;
  text-transform: uppercase;
  font-weight: 700;
}

p {
  font-size: 1.2em;
  color: #666;
  margin-bottom: 40px;
  text-align: center;
}

/* Style des boutons de connexion */
input[type="button"] {
  padding: 15px 25px;
  background-color: #1aff00;
  color: white;
  font-size: 1.2em;
  border: none;
  border-radius: 5px;
  margin: 10px 0;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

input[type="button"]:hover {
  background-color: #00e608;
  transform: translateY(-2px);
}

input[type="button"]:active {
  background-color: #00b303;
  transform: translateY(2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  h1 {
    font-size: 2.5em;
  }

  p {
    font-size: 1.1em;
  }

  input[type="button"] {
    font-size: 1em;
    padding: 12px 20px;
  }
}
/* Style pour le lien Home page */
a {
  display: inline-block;
  text-decoration: none;
  color: #1aff00;
  font-size: 1.2em;
  font-weight: 500;
  padding: 10px 15px;
  border: 2px solid #1aff00;
  border-radius: 5px;
  transition: all 0.3s ease;
}

a:hover {
  background-color: #1aff00;
  color: white;
  transform: translateY(-5px);
}

</style>