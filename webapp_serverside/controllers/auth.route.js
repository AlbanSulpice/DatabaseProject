// controllers/auth.route.js
const express = require('express');
const router = express.Router();
const auth = require("../utils/users.auth");
const userRepo = require("../utils/users.repository");

// http://localhost:9000/auth
// USE AUTHORIZATION HERE (the method does not know if authorization is present)
// MAC/DAC/RBAC, Claims-based authorization, Policy-based authorization, Resource-based authorization
router.get("/user", auth.authorizeRequest("USER"), userdataAction); // expose function only for USER roles
router.get("/admin", auth.authorizeRequest("ADMIN"), userdataAction); // expose function only for ADMIN roles
router.get("/protected", protectedGetAction); // execute authorization in action method: needed for resource-based auth
router.post("/login", loginPostAction);
router.get("/logout", logoutAction);
router.post("/register", registerAction);

// use same endpoints for both roles
async function userdataAction(request, response) {
  let userJson = JSON.stringify(request.user); 
  response.send(userJson);
}

async function protectedGetAction(request, response) {
  // TODO: authorize using all factors (resource / context / environment) ...
  let userRole = "GUEST CONTENT";
  if (request.isAuthenticated()) {
    if (request.user.user_role === "ADMIN") {
      userRole = "ADMIN CONTENT";
    } else {
      userRole = "USER CONTENT";
    }
  } 
  response.send(userRole);
}

async function loginPostAction(request, response) {
  // passport.authenticate('local', { successRedirect: '/' }));
  let areValid = await userRepo.areValidCredentials(request.body.username, request.body.userpass);

  if (areValid) {
    user = await userRepo.getOneUser(request.body.username);
    request.login(user, function (err) { 
      if (err) { 
        console.log("LOGINERROR");
        console.log(err); 
        areValid = false;
        // return next(err);
      }
      let resultObject = { "loginResult": areValid, "timestamp": new Date().toLocaleString() };
      response.send(JSON.stringify(resultObject));
    });
  } else {
    let resultObject = { "loginResult": areValid, "timestamp": new Date().toLocaleString() };
    response.send(JSON.stringify(resultObject));
  }
}

function logoutAction(request, response) {
  request.logout(function(err){
    let resultObject = { "logoutResult": true, "timestamp": new Date().toLocaleString() };
    if (err) { 
      console.log("LOGINERROR");
      console.log(err); 
      areValid = false;
      // return next(err);
    }
    response.send(JSON.stringify(resultObject));
  });
}
async function registerAction(request, response) {
  const { username, email, password } = request.body;

  // Vérification si tous les champs sont présents
  if (!username || !email || !password) {
    return response.status(400).json({ error: "All fields are required" });
  }

  try {
    // Vérifier si un utilisateur existe déjà avec cet e-mail
    const existingUser = await userRepo.getOneUser(username);
    if (existingUser) {
      return response.status(400).json({ error: "User with this email already exists" });
    }

    // Insertion dans la base de données avec NOW() de SQL pour l'attribut user_created
    const newUser = {
      user_name: username,
      user_email: email,
      user_role: 'USER',  // Le rôle par défaut est 'USER'
      user_pass: 'sha2(concat(NOW(), ?), 224)',
      // Nous utilisons 'NOW()' directement dans la requête SQL, donc aucun besoin de générer la date en JavaScript
      user_created: 'NOW()'
    };

    // Ajout du nouvel utilisateur dans la base de données
    const result = await userRepo.createUser(newUser, password); // À implémenter dans le fichier `users.repository.js`

    // Réponse après l'insertion
    response.status(201).json({
      message: "User registered successfully",
      user: {
        user_id: result.insertId,  // Si vous utilisez MySQL et l'insertion génère un `user_id` auto-incrémenté
        user_name: newUser.user_name,
        user_email: newUser.user_email,
        user_role: newUser.user_role,
      }
    });
  } catch (error) {
    console.error("Error during registration:", error);
    response.status(500).json({ error: "Internal server error" });
  }
}

module.exports = router;