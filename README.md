# e-commerce

## Basic Notes
##### deploy site: https://ecosmetics23.efratsadeli.online/

### Installation and Getting Started
```sh
$ npm init
$ npm install
$ npm run dev (server side)
$ live-server (client side)
```  

### List of API  

#### User - General (w/o authentication)
##### User register

Route | HTTP | Description | 
----- | ---- | ----------- | 
/user/register | POST | sign up for new user |  

##### Expected Input
###### name: e.g. Tomiko Van (put in req.body)
###### email: e.g. tomiko@van.com (put in req.body, should be unique)
###### password: e.g. thisispassword (put in req.body)

##### Expected Output
###### if success will give a jsonwebtoken
###### if failed will give an error message 
(e.g. email is not valid or email is not unique )

##### User login

Route | HTTP | Description | 
----- | ---- | ----------- | 
/user/login | POST | sign in for existing user |  

##### Expected Input
###### email: e.g. tomiko@van.com (put in req.body)
###### password: e.g. thisispassword (put in req.body)  

##### Expected Output
###### if success will give a jsonwebtoken
###### if failed will give an error message 
(e.g. email is not valid)  

##### User login via Google

Route | HTTP | Description | 
----- | ---- | ----------- | 
/user/logingoogle | POST | sign in or signup via Google |  

##### Expected Input
###### idToken: Token from Google (put in req.body)  

##### Expected Output
###### if success will give a jsonwebtoken

##### Set Administrator

Route | HTTP | Description | 
----- | ---- | ----------- | 
/user/setadmin | POST | Register system administrator |  

##### Expected Input
###### secretcode: Secret code from system developer (put in req.headers)  
###### name: e.g. Admin (put in req.body)
###### email: e.g. admin@mail.com (put in req.body, should be unique)
###### password: e.g. thisispassword (put in req.body)

##### Expected Output
###### if success will give a jsonwebtoken

#### User (with authentication)
##### User get detail information

Route | HTTP | Description | 
----- | ---- | ----------- | 
/users/detail | GET | Get a detail information of a speficic user |  

##### Expected Input
###### token: jsonwebtoken (put in req.headers)
######  

##### Expected Output
###### if success will give a JSON Object
###### if failed will give an error message 
(e.g. Token is not Valid or User not found)
######  

##### User get credentials

Route | HTTP | Description | 
----- | ---- | ----------- | 
/users/detail | GET | Get limited information of a speficic user such as name, email and role |  

##### Expected Input
###### token: jsonwebtoken (put in req.headers)
######  

##### Expected Output
###### if success will give a JSON Object
###### if failed will give an error message 
(e.g. Token is not Valid or User not found)
######  

#### Category transaction   
##### Category - Create

Route | HTTP | Description | 
----- | ---- | ----------- | 
/categories/ | POST | Create new Categories (admin only) |  

##### Expected Input
###### token: jsonwebtoken (put in req.headers)
###### name: (put in req.body)
e.g. Lipstick 
######  

##### Expected Output
###### if success will give a JSON Object
###### if failed will give an error message 
(e.g. Token is not Valid, Name should not be empty)
######  

##### Category - Edit

Route | HTTP | Description | 
----- | ---- | ----------- | 
/categories/:id | PUT | Edit a Category (admin only) |  

##### Expected Input
###### token: jsonwebtoken (put in req.headers)
###### id: Category ID (put in req.params)
###### Name: (put in req.body)
e.g. Powder
######  

##### Expected Output
###### if success will give a JSON Object
###### if failed will give an error message 
(e.g. Token is not Valid, Validation Error)
######  

##### Category - Delete

Route | HTTP | Description | 
----- | ---- | ----------- | 
/categories/:id | DELETE | Delete a Category |  

##### Expected Input
###### token: jsonwebtoken (put in req.headers)
###### id: Category ID (put in req.params)
######  

##### Expected Output
###### if success will give a JSON Object
###### if failed will give an error message 
(e.g. Token is not Valid or user is not authorized to delete)
######  

##### Category - Display

Route | HTTP | Description | 
----- | ---- | ----------- | 
/categories/:id | GET | Display an existing Category |  

##### Expected Input
###### id: Category ID (put in req.params)
######  

##### Expected Output
###### if success will give a JSON Object
###### if failed will give an error message (e.g. Token is not Valid)
######  

##### Category - Display List of Categories

Route | HTTP | Description | 
----- | ---- | ----------- | 
/categories/lists | GET | Display list of categories |  


##### Expected Output
###### if success will give a JSON Object
######

#### Item transaction   
##### Item - Create

Route | HTTP | Description | 
----- | ---- | ----------- | 
/items/ | POST | Create new item (admin only) |  

##### Expected Input
###### token: jsonwebtoken (put in req.headers)
###### itemname: e.g. Lipstick Maybelline (put in req.body)
###### itemcategoryid: (put in req.body)
###### itemurlimage: (url link of an image and put in req.body)
###### itemprice: e.g 100000 (pun in req.body)
######  

##### Expected Output
###### if success will give a JSON Object
###### if failed will give an error message 
(e.g. Token is not Valid)
######  

##### Item - Edit

Route | HTTP | Description | 
----- | ---- | ----------- | 
/items/:id | PUT | Edit an item (admin only) |  

##### Expected Input
###### token: jsonwebtoken (put in req.headers)
###### id: item ID (put in req.params)
###### itemname: e.g. Lipstick Maybelline (put in req.body)
###### itemcategoryid: (put in req.body)
###### itemurlimage: (url link of an image and put in req.body)
###### itemprice: e.g 100000 (pun in req.body)

######  

##### Expected Output
###### if success will give a JSON Object
###### if failed will give an error message 
(e.g. Token is not Valid, or user is not authorized to edit)
######  

##### Item - Upload

Route | HTTP | Description | 
----- | ---- | ----------- | 
/items/uploads | POST | Upload an image with .jpg, .jpeg, or .png extension to Google Storage (admin only) |  

##### Expected Input
###### token: jsonwebtoken (put in req.headers)
###### file: e.g. Lipstick Maybelline (put in req.file)
######  

##### Expected Output
###### if success will give a succes message and url link of the image
###### if failed will give an error message 
(e.g. Token is not Valid)
######


##### Item - Delete

Route | HTTP | Description | 
----- | ---- | ----------- | 
/item/:id | DELETE | Delete an item (admin only) |  

##### Expected Input
###### token: jsonwebtoken (put in req.headers)
###### id: item ID (put in req.params)
######  

##### Expected Output
###### if success will give a JSON Object
###### if failed will give an error message 
(e.g. Token is not Valid or user is not authorized to delete)
######  

##### Item - Display

Route | HTTP | Description | 
----- | ---- | ----------- | 
/items/:id | GET | Display an item |  

##### Expected Input
###### id: item ID (put in req.params)
######  

##### Expected Output
###### if success will give a JSON Object
######

##### Item - Display List of Items

Route | HTTP | Description | 
----- | ---- | ----------- | 
/items/lists | GET | Display list of items |  

##### Expected Input
######  

##### Expected Output
###### if success will give a JSON Object
###### 

##### Item - Search by name

Route | HTTP | Description | 
----- | ---- | ----------- | 
/items/search | GET | Display list of items based on keywords given |  

##### Expected Input
###### keyword: e.g. lip (put in req.body)
######  

##### Expected Output
###### if success will give a JSON Object
###### 

#### Transaction transaction   
##### Transactions - Create

Route | HTTP | Description | 
----- | ---- | ----------- | 
/transactions/ | POST | Create new transactions |  

##### Expected Input
###### token: jsonwebtoken (put in req.headers)
###### transactionitemid: Array of item's ID (put in req.body)
###### transactionamount: e.g. 4000000 (put in req.body)
######  

##### Expected Output
###### if success will give a JSON Object and email to the user
######

##### Transactions - Display List of Transactions

Route | HTTP | Description | 
----- | ---- | ----------- | 
/transactions/lists | GET | Display list of transactions (admin only) |  

##### Expected Input
###### token: jsonwebtoken (put in req.headers)
######  

##### Expected Output
###### if success will give a JSON Object
###### if failed will give an error message (e.g. Token is not Valid)
######
