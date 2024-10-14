CREATE database DB;
use DB;
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