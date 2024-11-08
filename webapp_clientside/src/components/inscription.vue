<template>
    <div>
        <header>
            <header id="header">
                <div id="logo-container">
                  <img src="../assets/logoPrime.png" alt="Aspire Properties Logo" id="logo">
                  <h1 id="agency-name">Aspire Properties</h1>
                </div>
                <div id="navgiation-link">
                  <a href="/#/login" id="login-button">Log in</a>
                  <a href="HelloWorld.vue">Home page</a>
                </div>
              </header>
        </header>

        <h2>Register</h2>
        <fieldset>
            <legend>Your informations</legend>
            <form>
                <label for="last_name_input">Surname :</label>
                <input type="text" id="last_name_input"><br>

                <label for="first_name_input">Firstname :</label>
                <input type="text" id="first_name_input"><br>

                <label for="date_input">Date of birth :</label>
                <input type="date" id="date_input"><br>

                <label for="mail_input">Email adress:</label>
                <input type="email" id="mail_input"><br>

                <label for="password_input">Password :</label>
                <input type="password" id="password_input"><br>

                <label for="password_confirm_input">Confirm password :</label>
                <input type="password" id="password_confirm_input"><br>

                <label for="select_input">Status :</label>
                <select id="select_input">
                    <option value="option1">Choose</option>
                    <option value="option2">Single</option>
                    <option value="option3">Married</option>
                    <option value="option4">Civil partnership</option>
                    <option value="option5">Divorce</option>
                    <option value="option6">Widower</option>
                </select><br>
            </form>
        </fieldset>

        <fieldset>
            <legend>Situation</legend>
            <ol>
                <li>What's your job/current situation ?</li>
                <form class="frequence">
                    <input name="frequence" type="radio" id="radio1" value="radio1">
                    <label for="radio1">a. Unemployed</label><br>
                    <input name="frequence" type="radio" id="radio2" value="radio2">
                    <label for="radio2">b. Student</label><br>
                    <input name="frequence" type="radio" id="radio3" value="radio3">
                    <label for="radio3">c. Working</label><br><br>
                </form>

                <li>Tell us more</li>
                <form class="sujets">
                    <input type="checkbox" id="checkbox1" value="checkbox1">
                    <label for="checkbox1">a. Tenant</label><br>
                    <input type="checkbox" id="checkbox2" value="checkbox2">
                    <label for="checkbox2">b. Owner main residence or other</label><br>
                    <input type="checkbox" id="checkbox3" value="checkbox3">
                    <label for="checkbox3">c. Accommodated free of charge</label><br><br>
                </form>

                <li>Approximate salary per year</li>
                <form class="evenement">
                    <label for="evenement_input"></label>
                    <input type="text" id="evenement_input">
                </form>
            </ol>
            <form>
                <button type="submit">Send</button>
            </form>
        </fieldset>

        <footer>
            <p>©️2024 Aspire Properties, Inc.</p>
        </footer>
    </div>
</template>
<script>
export default {
    name: 'inscription'
}
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