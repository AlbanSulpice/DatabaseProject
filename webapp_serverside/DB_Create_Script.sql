CREATE database if not exists realestateDB;
use realestateDB;

DROP TABLE if exists agencies_properties;
DROP TABLE if exists agencies_clients;
DROP TABLE if exists sales;
DROP TABLE if exists agencies;
DROP TABLE if exists properties;
DROP TABLE if exists landlords;
DROP TABLE if exists clients;

CREATE TABLE landlords (
    landlord_id INT PRIMARY KEY,
    landlord_surname VARCHAR (50) NOT NULL,
    landlord_firstname VARCHAR(50) NOT NULL
);

CREATE TABLE properties (
    property_id INT PRIMARY KEY,
    property_type VARCHAR(50) NOT NULL,
    property_surfacearea VARCHAR(255) NOT NULL,
    property_bathrooms INT ,
    property_bedrooms INT NOT NULL,
    property_adress VARCHAR(255) NOT NULL,
    property_landlord INT,
    CONSTRAINT fk_property_landlord FOREIGN KEY (property_landlord) REFERENCES landlords(landlord_id)
);

CREATE TABLE agencies (
    agency_id INT PRIMARY KEY,
    agency_name VARCHAR(100) NOT NULL UNIQUE,
    agency_adress VARCHAR(255) NOT NULL,
    agency_dateofcreation VARCHAR(255) NOT NULL,
    agency_numberofemployees INT NOT NULL,
    agency_rating INT 
);

CREATE TABLE clients (
    client_id INT PRIMARY KEY,
    client_gender VARCHAR(1) NOT NULL,
    client_name VARCHAR(100) NOT NULL,
    client_email VARCHAR(100) NOT NULL UNIQUE,
    client_number VARCHAR(20) NOT NULL UNIQUE,
    client_taxnumber VARCHAR(20) NOT NULL
);

CREATE TABLE sales (
    sale_id INT PRIMARY KEY,
    sale_amount INT NOT NULL,
    sale_comission INT NOT NULL,
    sale_landlord INT NOT NULL,
    sale_client INT NOT NULL,
    sale_agency INT NOT NULL,
    CONSTRAINT fk_sale_landlord FOREIGN KEY (sale_landlord) REFERENCES landlords(landlord_id),
    CONSTRAINT fk_sale_client FOREIGN KEY (sale_client) REFERENCES clients(client_id),
    CONSTRAINT fk_sale_agency FOREIGN KEY (sale_agency) REFERENCES agencies(agency_id)
);

CREATE TABLE agencies_properties (
    agencies_properties_property INT,
    agencies_properties_agency INT,
    PRIMARY KEY (agencies_properties_property, agencies_properties_agency),
    CONSTRAINT fk_agency_property_property FOREIGN KEY (agencies_properties_property) REFERENCES properties(property_id),
    CONSTRAINT fk_agency_property_agency FOREIGN KEY (agencies_properties_agency) REFERENCES agencies(agency_id)
);

CREATE TABLE agencies_clients (
    agencies_clients_agency INT,
    agencies_clients_client INT,
    PRIMARY KEY (agencies_clients_agency, agencies_clients_client),
    CONSTRAINT fk_agency_client_agency FOREIGN KEY (agencies_clients_agency) REFERENCES agencies(agency_id),
    CONSTRAINT fk_agency_client_client FOREIGN KEY (agencies_clients_client) REFERENCES clients(client_id)
);

INSERT INTO landlords (landlord_id, landlord_surname, landlord_firstname) VALUES
(1, 'Dupont', 'Pierre'),
(2, 'Martin', 'Sophie'),
(3, 'Durand', 'Lucas'),
(4, 'Bernard', 'Elodie'),
(5, 'Lefevre', 'Nicolas');

INSERT INTO properties (property_id, property_type, property_surfacearea, property_bathrooms, property_bedrooms, property_adress, property_landlord) VALUES
(1, 'Appartement', 75.00, 2, 3, '10 rue de Paris, 75001 Paris', 1),
(2, 'Maison', 120.00, 3, 5, '25 avenue des Champs, 75008 Paris', 2),
(3, 'Studio', 35.00, 1, 1, '5 rue de Lille, 75007 Paris', 1),
(4, 'Villa', 200.00, 4, 6, '15 avenue Montaigne, 75008 Paris', 3),
(5, 'Maison', 150.00, 3, 4, '12 rue du Bac, 75007 Paris', 4),
(6, 'Appartement', 85.00, 2, 3, '8 rue de la Paix, 75002 Paris', 5);

INSERT INTO agencies (agency_id, agency_name, agency_adress, agency_dateofcreation, agency_numberofemployees, agency_rating) VALUES
(1, 'Agence Paris Immo', '50 rue de Rivoli, 75004 Paris', '2010-05-01', 50, 4),
(2, 'ImmoLux', '22 rue Lafayette, 75009 Paris', '2012-07-15', 40, 5),
(3, 'TopAgence', '85 avenue Foch, 75016 Paris', '2015-03-20', 30, 3);

INSERT INTO clients (client_id, client_name, client_gender, client_email, client_number, client_taxnumber) VALUES
(1, 'Alice Dupuis', 'F', 'alice.dupuis@example.com', '0601010101', 'FR1234567890'),
(2, 'Marc Lemoine', 'M', 'marc.lemoine@example.com', '0602020202', 'FR0987654321'),
(3, 'Julie Martin', 'F', 'julie.martin@example.com', '0603030303', 'FR1122334455'),
(4, 'Thomas Brun', 'M', 'thomas.brun@example.com', '0604040404', 'FR2233445566'),
(5, 'Emma Lefevre', 'F', 'emma.lefevre@example.com', '0605050505', 'FR3344556677');

INSERT INTO sales (sale_id, sale_amount, sale_comission, sale_landlord, sale_client, sale_agency) VALUES
(1, 500000, 15000, 1, 1, 1),
(2, 300000, 9000, 2, 2, 1),
(3, 250000, 7500, 3, 3, 2),
(4, 700000, 21000, 4, 4, 2),
(5, 400000, 12000, 5, 5, 3);

INSERT INTO agencies_properties (agencies_properties_property, agencies_properties_agency) VALUES
(1, 1),
(1, 2),
(2, 1),
(3, 2),
(4, 2),
(5, 3),
(6, 3);

INSERT INTO agencies_clients (agencies_clients_agency, agencies_clients_client) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 5);

SET sql_mode = 'ONLY_FULL_GROUP_BY';

DROP VIEW if exists salesSummaryByAgency;

CREATE VIEW salesSummaryByAgency AS
SELECT 
    agencies.agency_id,
    agencies.agency_name,
    COUNT(sales.sale_id) AS total_sales,
    SUM(sales.sale_amount) AS total_amount,
    SUM(sales.sale_comission) AS total_commission
FROM 
    sales
    INNER JOIN agencies ON sales.sale_agency = agencies.agency_id
GROUP BY 
    agencies.agency_id;

DROP VIEW if exists averagePropertyPriceByType;

CREATE VIEW averagePropertyPriceByType AS
SELECT 
    properties.property_type,
    AVG(sales.sale_amount) AS average_price
FROM 
    properties
    INNER JOIN sales ON properties.property_id = sales.sale_landlord
GROUP BY 
    properties.property_type;

DROP VIEW if exists availablePropertiesPerAgency;

CREATE VIEW availablePropertiesPerAgency AS
SELECT 
    agencies.agency_id,
    agencies.agency_name,
    properties.property_id,
    properties.property_type,
   properties.property_surfacearea,
   properties.property_bedrooms,
    properties.property_bathrooms,
    properties.property_adress
FROM 
    agencies
    INNER JOIN agencies_properties ON agencies.agency_id = agencies_properties.agencies_properties_agency
    INNER JOIN properties ON agencies_properties.agencies_properties_property = properties.property_id
WHERE 
    properties.property_id NOT IN (SELECT sales.sale_landlord FROM sales);

DROP VIEW if exists clientPurchases;

CREATE VIEW clientPurchases AS
SELECT 
    clients.client_id,
    clients.client_name,
    sales.sale_amount AS purchase_amount,
    sales.sale_comission AS purchase_commission,
    agencies.agency_name AS agency_name
FROM 
    clients
    INNER JOIN sales ON clients.client_id = sales.sale_client
    INNER JOIN agencies ON sales.sale_agency = agencies.agency_id;

DROP VIEW if exists topPerformingAgencies;

CREATE VIEW topPerformingAgencies AS
SELECT 
    agency_id,
    agency_name,
    agency_rating
FROM 
    agencies
WHERE 
    agency_rating > (SELECT AVG(agency_rating) FROM agencies);
