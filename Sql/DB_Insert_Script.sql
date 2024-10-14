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
