<template>
  <div>
    <!-- Header -->
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

    <!-- Main Section -->
    <main id="main-content">
      <div id="side-navigation">
        <a href="/#/client" class="side-nav-link" id="client-link">Client</a>
        <a href="/#/agency" class="side-nav-link" id="agency-link">Agency</a>
        <a href="/#/property" class="side-nav-link" id="property-link">Property</a>
        <a href="/#/landlord" class="side-nav-link" id="landlord-link">Landlord</a>
      </div>

      <!-- Company Description -->
      <section id="company-description">
        <h2>About Us</h2>
        <p>
          Welcome to <strong>Aspire Properties</strong>, your trusted partner for all real estate transactions.
          We offer a diverse selection of high-quality properties and personalized service to meet your unique needs.
          Our dedicated team is here to support you at every step of your journey, whether you are buying, selling, or renting.
        </p>
      </section>

      <!-- Eco Responsibility Section with Accordion -->
      <section id="eco-responsibility">
        <h2>Our Environmental Responsibility</h2>
        <div class="accordion">
          <div class="accordion-item">
            <button class="accordion-button">Sustainable Building Practices</button>
            <div class="accordion-content">
              <p>We prioritize eco-friendly materials and energy-efficient solutions in our projects, aiming to reduce the environmental impact of our buildings.</p>
            </div>
          </div>
          <div class="accordion-item">
            <button class="accordion-button">Community and Green Spaces</button>
            <div class="accordion-content">
              <p>Our designs incorporate green spaces to promote biodiversity, reduce pollution, and offer healthy environments for our clients and communities.</p>
            </div>
          </div>
          <div class="accordion-item">
            <button class="accordion-button">Waste Reduction and Recycling</button>
            <div class="accordion-content">
              <p>We implement waste reduction strategies and recycling initiatives during construction and property management to minimize our ecological footprint.</p>
            </div>
          </div>
          <div class="accordion-item">
            <button class="accordion-button">Energy Conservation</button>
            <div class="accordion-content">
              <p>Our properties are equipped with energy-saving technologies and renewable energy sources to reduce consumption and lower carbon emissions.</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer id="footer">
      <p>©2024 Aspire Properties, Inc.</p>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld'
}

// JavaScript pour l'effet d'accordéon
document.addEventListener("DOMContentLoaded", () => {
  const accordionButtons = document.querySelectorAll(".accordion-button");
  accordionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("active");
      const content = button.nextElementSibling;
      content.style.display = content.style.display === "block" ? "none" : "block";
    });
  });
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

/* Main Content */
#main-content {
  position: relative;
  text-align: center;
  min-height: 100vh;
  background-image: url('../assets/fond.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 100px 20px;
}

#image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}

#agency-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(6px) brightness(0.7);
}

/* Navigation Links */
#navigation {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 50px;
}

.nav-link {
  text-decoration: none;
  color: #44ff00;
  font-size: 1.5em;
  font-weight: 500;
  transition: color 0.3s ease, transform 0.3s ease;
}

.nav-link:hover {
  color: #2ee600;
  transform: scale(1.1);
}
#side-navigation {
  position: fixed;
  top: 50%;
  left: 10;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.side-nav-link {
  display: block;
  padding: 15px 30px;
  background-color: #1aff00;
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 500;
  text-align: center;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.side-nav-link:hover {
  background-color: #00e608;
  transform: translateX(10px);
}

/* Company Description */
#company-description {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 50px auto;
  padding: 30px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}

#company-description h2 {
  font-size: 2.2em;
  margin-bottom: 15px;
  color: #00ff6e;
  text-transform: uppercase;
  font-weight: 600;
}

#company-description p {
  font-size: 1.1em;
  line-height: 1.6;
  color: #fff;
}

/* Footer */
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

/* Accordion Style */
#eco-responsibility {
  max-width: 800px;
  margin: 60px auto;
}

.accordion {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.accordion-item {
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.accordion-button {
  width: 100%;
  padding: 18px;
  background-color: lightgreen;
  color: white;
  text-align: left;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.accordion-button:hover {
  background-color: #00b303;
  transform: translateX(10px);
}

.accordion-content {
  padding: 20px;
  display: none;
  background-color: #f5f5f5;
  color: #333;
  border-top: 1px solid #ddd;
}

.accordion-button::after {
  content: "➔";
  float: right;
  transform: rotate(0deg);
  transition: transform 0.3s ease;
}

.accordion-button.active::after {
  transform: rotate(90deg);
}

.accordion-item.active .accordion-content {
  display: block;
}
</style>
