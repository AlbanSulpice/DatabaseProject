CREATE database DB1;
use DB1;
CREATE TABLE Landlord (
    id_landlord INT PRIMARY KEY,
    landlord_surname VARCHAR (50) NOT NULL,
    landlord_firstname VARCHAR(50) NOT NULL
);

CREATE TABLE Property (
    id_property INT PRIMARY KEY,
    typeProperty VARCHAR(50) NOT NULL,
    surface_area DECIMAL(10, 2) NOT NULL,
    bathrooms INT ,
    bedrooms INT NOT NULL,
    adress VARCHAR(255) NOT NULL,
    id_landlord INT,
    CONSTRAINT fk_landlord FOREIGN KEY (id_landlord) REFERENCES Landlord(id_landlord)
);

CREATE TABLE Agency (
    id_agency INT PRIMARY KEY,
    agency_name VARCHAR(100) NOT NULL UNIQUE,
    agency_adress VARCHAR(255) NOT NULL,
    agencyDateOfCreation DATE NOT NULL,
    numberOfEmployees INT NOT NULL,
    agency_rating DECIMAL(3, 2) 
);

CREATE TABLE Client (
    id_client INT PRIMARY KEY,
    client_name VARCHAR(100) NOT NULL,
    client_gender CHAR(1) NOT NULL,
    client_email VARCHAR(100) NOT NULL UNIQUE,
    client_number VARCHAR(20) NOT NULL UNIQUE,
    client_tax_number VARCHAR(20) NOT NULL
);

CREATE TABLE Sale (
    id_sale INT PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    comission DECIMAL(10, 2) NOT NULL,
    id_landlord INT,
    id_client INT,
    id_agency INT,
    CONSTRAINT fk_sale_landlord FOREIGN KEY (id_landlord) REFERENCES Landlord(id_landlord),
    CONSTRAINT fk_sale_client FOREIGN KEY (id_client) REFERENCES Client(id_client),
    CONSTRAINT fk_sale_agency FOREIGN KEY (id_agency) REFERENCES Agency(id_agency)
);

CREATE TABLE Agency_Property (
    id_property INT,
    id_agency INT,
    PRIMARY KEY (id_property, id_agency),
    CONSTRAINT fk_agency_property_property FOREIGN KEY (id_property) REFERENCES Property(id_property),
    CONSTRAINT fk_agency_property_agency FOREIGN KEY (id_agency) REFERENCES Agency(id_agency)
);

CREATE TABLE Agency_Client (
    id_agency INT,
    id_client INT,
    PRIMARY KEY (id_agency, id_client),
    CONSTRAINT fk_agency_client_agency FOREIGN KEY (id_agency) REFERENCES Agency(id_agency),
    CONSTRAINT fk_agency_client_client FOREIGN KEY (id_client) REFERENCES Client(id_client)
);

INSERT INTO Landlord (id_landlord, landlord_surname, landlord_firstname) VALUES
(1, 'Dupont', 'Pierre'),
(2, 'Martin', 'Sophie'),
(3, 'Durand', 'Lucas'),
(4, 'Bernard', 'Elodie'),
(5, 'Lefevre', 'Nicolas');

INSERT INTO Property (id_property, typeProperty, surface_area, bathrooms, bedrooms, adress, id_landlord) VALUES
(1, 'Appartement', 75.00, 2, 3, '10 rue de Paris, 75001 Paris', 1),
(2, 'Maison', 120.00, 3, 5, '25 avenue des Champs, 75008 Paris', 2),
(3, 'Studio', 35.00, 1, 1, '5 rue de Lille, 75007 Paris', 1),
(4, 'Villa', 200.00, 4, 6, '15 avenue Montaigne, 75008 Paris', 3),
(5, 'Maison', 150.00, 3, 4, '12 rue du Bac, 75007 Paris', 4),
(6, 'Appartement', 85.00, 2, 3, '8 rue de la Paix, 75002 Paris', 5);

INSERT INTO Agency (id_agency, agency_name, agency_adress, agencyDateOfCreation, numberOfEmployees, agency_rating) VALUES
(1, 'Agence Paris Immo', '50 rue de Rivoli, 75004 Paris', '2010-05-01', 50, 4.5),
(2, 'ImmoLux', '22 rue Lafayette, 75009 Paris', '2012-07-15', 40, 4.8),
(3, 'TopAgence', '85 avenue Foch, 75016 Paris', '2015-03-20', 30, 4.2);

INSERT INTO Client (id_client, client_name, client_gender, client_email, client_number, client_tax_number) VALUES
(1, 'Alice Dupuis', 'F', 'alice.dupuis@example.com', '0601010101', 'FR1234567890'),
(2, 'Marc Lemoine', 'M', 'marc.lemoine@example.com', '0602020202', 'FR0987654321'),
(3, 'Julie Martin', 'F', 'julie.martin@example.com', '0603030303', 'FR1122334455'),
(4, 'Thomas Brun', 'M', 'thomas.brun@example.com', '0604040404', 'FR2233445566'),
(5, 'Emma Lefevre', 'F', 'emma.lefevre@example.com', '0605050505', 'FR3344556677');

INSERT INTO Sale (id_sale, amount, comission, id_landlord, id_client, id_agency) VALUES
(1, 500000.00, 15000.00, 1, 1, 1),
(2, 300000.00, 9000.00, 2, 2, 1),
(3, 250000.00, 7500.00, 3, 3, 2),
(4, 700000.00, 21000.00, 4, 4, 2),
(5, 400000.00, 12000.00, 5, 5, 3);

INSERT INTO Agency_Property (id_property, id_agency) VALUES
(1, 1),
(1, 2),
(2, 1),
(3, 2),
(4, 2),
(5, 3),
(6, 3);

INSERT INTO Agency_Client (id_agency, id_client) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 5);
