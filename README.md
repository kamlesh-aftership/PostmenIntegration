#Postmen Integration

 Here crud operation is done on Shipper-Accounts using MEAN stack.

Getting Started

 Open your project directory in termial and enter command.

 npm install

 After installing all dependencies in pakage.json. Enter below command in the terminal

 node mainApp.js

Then goto webbrowser and hit URL localhost:8081
and for rest call goto Postmen and hit the following URL for CRUD operations

 1.List of Shipper-Accounts- GET http://localhost:8081/shipperaccounts
 2.Get Shipper-Accounts By Id- GET http://localhost:8081/shipperaccount/{id}
 3.Create Shipper-Account- POST http://localhost:8081/shipperaccount
 4.Update Shipper-Account- PUT http://localhost:8081/shipperaccount/{id}
 5.Delete Shipper-Accounts-DELETE http://localhost:8081/shipperaccount/{id}

Prerequisites
 
 Mongo DB : 3.4.1 (https://www.mongodb.com/download-center#community)
 Nodejs : 6.9.2 (https://nodejs.org/en/)

Versioning

 Version : 1.0.0
