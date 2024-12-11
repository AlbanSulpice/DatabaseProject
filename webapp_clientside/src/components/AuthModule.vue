<template>
  <div class="hello">
    <h1>Aspire Properties account</h1>
    <a href="../components/HelloWorld.vue">Home page</a>
    <p>{{ msg }}</p>
        <!-- Formulaire de connexion -->
    <div v-if="isLogin">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required>
      </div>
      <input type="button" @click="handleLogin()" value="Log in"/>
      <input type="button" @click="sendRequest('get', 'logout')" value="LOGOUT" />
      <p>No account ? <a href="#" @click="toggleMode">Register</a></p>
    </div>

    <!-- Formulaire d'inscription -->
    <div v-else>
      <div class="form-group">
        <label for="newUsername">Username</label>
        <input type="text" id="newUsername" v-model="newUser.username" required>
      </div>
      <div class="form-group">
        <label for="newPassword">Password</label>
        <input type="password" id="newPassword" v-model="newUser.password" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="newUser.email" required>
      </div>
      <input type="button" @click="handleRegister()" value="Sign up"/>
      <input type="button" @click="sendRequest('get', 'logout')" value="LOGOUT" />
      <p>Already an account? <a href="#" @click="toggleMode">Log in</a></p>
    </div>
    <!-- <input type="button" @click="sendRequest('post', 'login', { username: 'joeuser', userpass: 'joepass' })" value="LOGIN USER" />
    <input type="button" @click="sendRequest('post', 'login', { username: 'joeadmin', userpass: 'joepass' })" value="LOGIN ADMIN" />
    <input type="button" @click="sendRequest('get', 'user')" value="ACCESS /user" />
    <input type="button" @click="sendRequest('get', 'admin')" value="ACCESS /admin" />
    <input type="button" @click="sendRequest('get', 'protected')" value="ACCESS /protected" />
    <input type="button" @click="sendRequest('get', 'logout')" value="LOGOUT" /> -->
  </div>
</template>

<script>
export default {
  name: 'AuthenticationDemo',
  data () {
    return {
      isLogin: true,
      msg: 'Welcome to Your Vue.js App',
      newUser: {
        username: '',
        password: '',
        email: ''
      }
    }
  },
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
    },
    async handleLogin() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Appelez votre fonction sendRequest ici
            this.sendRequest('post', 'login', { username: username, userpass: password });
        },
      async  toggleMode() {
      this.isLogin = !this.isLogin; // Change l'état pour afficher l'autre formulaire
    },
    async sendRequest(method, endpoint, params) {
      try {
        let response = null;
        if (method === "post") 
          response = await this.$http.post("http://localhost:9000/auth/" + endpoint, params);
        else
          response = await this.$http.get("http://localhost:9000/auth/" + endpoint);
        this.msg = JSON.stringify(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async handleRegister() {
      const { username, password, email } = this.newUser;
      if (username && password && email) {
        this.sendRequest('post', 'register', { username, password, email });
        this.toggleMode(); // Retourne au mode login après inscription
      } else {
        alert("Complete all the fields !");
      }
    }
  }
}
</script>
<style scoped>
/* Style global */
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Prend toute la hauteur de la fenêtre */
  width: 100vw; /* Prend toute la largeur de la fenêtre */
  box-sizing: border-box; /* Assure que le padding et margin ne cassent pas la mise en page */
}

/* Conteneur principal */
.hello {
  width: 100%;
  max-width: 500px; /* Limite la largeur du formulaire */
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Ajoute cette propriété pour centrer aussi verticalement */
}

/* Titre */
h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}

/* Liens */
a {
  color: #27ae60;
  text-decoration: none;
  font-weight: bold;
}

a:hover {
  text-decoration: underline;
}

/* Formulaire */
.form-group {
  margin-bottom: 15px;
  text-align: left;
  width: 100%;
}

label {
  display: block;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 5px;
}

input[type="text"], input[type="password"], input[type="email"] {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;
}

input[type="button"] {
  width: 100%;
  padding: 12px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin: 10px 0;
  transition: background-color 0.3s;
}

input[type="button"]:hover {
  background-color: #2ecc71;
}

/* Formulaire d'inscription et connexion */
p {
  color: #2c3e50;
}

input[type="button"]:first-of-type {
  margin-top: 20px;
}

/* Gestion des états d'affichage */
input[type="button"]:nth-of-type(2) {
  background-color: #e74c3c;
}

input[type="button"]:nth-of-type(2):hover {
  background-color: #c0392b;
}

/* Message d'erreur ou succès */
.msg {
  margin-top: 20px;
  color: #e74c3c;
  font-weight: bold;
}
</style>