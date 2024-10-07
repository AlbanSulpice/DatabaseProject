ABOULEILA Selim
SULPICE Alban

Real Estate Management System 
Entities and Attributes

1. Landlord

Represents the owner of a property.

id_landlord (Primary Key) – Unique identifier for each landlord.
landlord_surname 
landlord_firstname

2. Property

Represents a real estate property managed by an agency and owned by a landlord.

id_property (Primary Key) – Unique identifier for each property.
surface_area – The size of the property in square units.
bathrooms – Number of bathrooms in the property.
bedrooms – Number of bedrooms in the property.
address – The address where the property is located.
id_landlord (Foreign Key) – Links to the Landlord entity that owns the property.

3. Property-Agency

id_agence (Foreign Key) – Links to the Agency entity that manages the property.
id_property (Foreign Key) – Links to the Property entity.

4. Agency

Represents a real estate agency that manages properties and facilitates transactions.

id_agence (Primary Key) – Unique identifier for each agency.
agency_name – The name of the agency.
agency_rating – A rating score representing the agency’s reputation.
agency_address – The address of the agency.
agencyDateOfCreartion
numbersOfEmployees

5. Client

Represents the buyer involved in property transactions.

id_client (Primary Key) – Unique identifier for each client.
client_name – Name of the client.
client_gender – Specifies whether the client is a male or a female.
client_email – The email address of the client.
client_number – The phone number of the client.
client_tax_number – Tax identification number for the client (if applicable).

6. Agency_Client

id_agence (Foreign Key) – Links to the Agency entity that manages the property.
id_client (Foreign Key) – Links to the Client entity.


7. Sale

Represents the transaction of a property being sold to a client.

id_sale (Primary Key) – Unique identifier for each sale transaction.
amount – The total sale amount of the property.
commission – The commission amount taken by the agency.
id_property (Foreign Key) – Links to the Property entity being sold.
id_client (Foreign Key) – Links to the Client entity buying the property.
id_agence (Foreign Key) – Links to the Agency entity handling the sale.
