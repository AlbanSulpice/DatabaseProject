<template>
  <div class="hello">
    <h1>Authentication demo</h1>
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
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
    }
  },

}
</script>
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;  /* Police moderne */
}

/* Style pour le header */
#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #282828;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);  /* Ombre subtile */
  border-radius: 8px 8px 0 0;
}

#logo-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

#logo {
  width: 50px;
  height: auto;
}

#agency-name {
  font-size: 2.5em;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  letter-spacing: 1px;
  transition: color 0.3s ease;
}

#agency-name:hover {
  color: #1aff00;  /* Changement de couleur au survol */
}

#navgiation-link {
  display: flex;
  gap: 30px;
}

#navgiation-link a {
  color: #fff;
  text-decoration: none;
  font-size: 1.1em;
  padding: 12px 20px;
  background-color: #42b983;
  border-radius: 6px;
  font-weight: 500;
  transition: background-color 0.3s ease, color 0.3s ease;
}

#navgiation-link a:hover {
  background-color: #388e3c;
  color: white;
}

/* Style pour le formulaire et les champs */
form {
  margin: 20px auto;
  max-width: 600px;
  background: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

legend {
  font-size: 1.5em;
  margin-bottom: 15px;
  color: #333;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="date"],
select {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 2px solid #ddd;
  border-radius: 6px;
  background-color: #fff;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus,
select:focus {
  border-color: #42b983;
  background-color: #eaf9f2;
}

button[type="submit"] {
  background-color: #42b983;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-size: 1.2em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #388e3c;
}

fieldset {
  margin: 20px 0;
  padding: 15px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Style pour les liens dans le contenu */
a {
  color: #42b983;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

a:hover {
  color: #388e3c;
}

/* Footer */
footer {
  text-align: center;
  padding: 20px;
  background-color: #282828;
  color: white;
  margin-top: 20px;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
}

/* Table styling */
table {
  width: 100%;
  margin: 20px 0;
  border-collapse: collapse;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

table th,
table td {
  padding: 15px;
  text-align: left;
  border-bottom: 2px solid #ddd;
}

table th {
  background-color: #f9f9f9;
}

table tr:hover {
  background-color: #f1f1f1;
  transition: background-color 0.3s ease;
}

table tr:nth-child(even) {
  background-color: #f9f9f9;
}

/* Button hover effects */
button,
input[type="button"],
input[type="submit"] {
  transition: all 0.3s ease;
}

button:hover,
input[type="button"]:hover,
input[type="submit"]:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

#addNewClientButton {
  color: #fff;
  background: #42b983;
  border: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 6px;
  padding: 10px 20px;
  transition: background-color 0.3s ease;
}

#addNewClientButton:hover {
  background-color: #388e3c;
}

#footer p {
  font-size: 0.9em;
  color: #aaa;
}

/* Additional styling for buttons in list and actions */
.btn-link {
  color: #42b983;
  font-weight: bold;
  transition: color 0.3s ease;
}

.btn-link:hover {
  color: #388e3c;
}

.btn-action {
  padding: 6px 12px;
  background-color: #42b983;
  border-radius: 4px;
  color: white;
  font-weight: 600;
  border: none;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn-action:hover {
  background-color: #388e3c;
  transform: scale(1.05);
}

.btn-delete {
  background-color: #f44336;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn-delete:hover {
  background-color: #d32f2f;
  transform: scale(1.05);
}
.main-container {
  background-image: url('../assets/fond.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  height: 100vh; /* Assure que l'image de fond couvre toute la hauteur de la fenêtre */
  color: #fff; /* Assure que le texte est lisible */
}
</style>