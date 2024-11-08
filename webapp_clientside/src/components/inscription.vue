<template>
    <div>
        <header>
            <header id="header">
                <div id="logo-container">
                  <img src="../assets/logoPrime.png" alt="Aspire Properties Logo" id="logo">
                  <h1 id="agency-name">Aspire Properties</h1>
                </div>
                <div id="navgiation-link">
                  <a href="seConnecter.html" id="login-button">Log in</a>
                  <a href="HelloWorld.vue">Home page</a>
                </div>
              </header>
        </header>

        <h1>Aspire Properties</h1>
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
            <legend>Job</legend>
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
            <p>©️©2024 Aspire Properties, Inc.</p>
        </footer>
    </div>
</template>
<script scoped>

</script>
<style lang="css">

</style>