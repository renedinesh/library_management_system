require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json());

const sequelize = require('./config/database')

const routers = require("./router");
routers(app);

databaseConnectivity = async () => {
    try {
        await sequelize.authenticate();
        // await sequelize.sync({ force: true });

        
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

databaseConnectivity();

app.listen(process.env.PORT, ()=> {

    console.log('working in ' + process.env.PORT);
})