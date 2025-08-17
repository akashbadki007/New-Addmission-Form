const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./config/dbConnect");
db();

const loginRoutes = require("./routes/loginRoutes")
app.use('/api/v1/', loginRoutes);
const userRoutes = require('./routes/userRoutes');
app.use('/api/v1/', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to the New Admission Form API');
});



// http://localhost:3000/api/v1/create/user  --->> Postman test create API form Submit wali API ----> Post
// http://localhost:3000/api/v1/get/users  --->> Postman test get all users API ---->>  get
// http://localhost:3000/api/v1/get/user/:id  --->> Postman test get user by ID API  ---->> get
// http://localhost:3000/api/v1/update/user/:id  --->> Postman test update user API   --->> Put
// http://localhost:3000/api/v1/delete/user/:id  --->> Postman test user delete API  --->> Delete