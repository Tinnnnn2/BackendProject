const express = require('express');
const Sequelize = require('sequelize');
const app = express();

app.use(express.json());

const sequelize = new Sequelize('database','username','password',{
    host: 'localhost',
    dialect: 'sqlite',
    storage: './Database/User.sqlite'
});

const Products = sequelize.define('Product', {
    
    Productid:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    size:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price:{
        type: Sequelize.FLOAT,
        allowNull: false
    },
    Name_product:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

const user = sequelize.define('users',{
    userid:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    phone:{
        type: Sequelize.STRING,
        allowNull: false
    },
    userAdress:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

const orders = sequelize.define('order', {
    
    orderid:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userid:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Productid:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    userAdress:{
        type: Sequelize.STRING,
        allowNull: false
    },
    employeeld:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

const employees = sequelize.define('employee',{
    employeeld:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    username:{
        type: Sequelize.STRING,
        allowNull: false
    },
    age:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    phone:{
        type: Sequelize.STRING,
        allowNull: false
    },
    adress:{
        type: Sequelize.STRING,
        allowNull: false
    }
});


sequelize.sync();

app.get('/Product',(req, res) =>{
    Products.findAll().then(Products => {
        res.json(Products);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get('/Product/:id',(req, res) =>{
    Products.findByPk(req.params.id).then(Products => {
        if (!Products){
            res.status(404).send('Product not found');
        } else{
            res.json(Products);
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.post('/Product',(req, res) =>{
    Products.create(req.body).then(Products => {
        res.send(Products);
    }).catch(err => {
            res.status(500).send(err);
        });
    });

app.put('/Product/:id',(req,res) => {
    Products.findByPk(req.params.id).then(Products => {
        if (!Products) {
            res.status(404).send('Book not found');
        } else {
            Products.update(req.body).then(() =>{
                res.send(Products);
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.delete('/Product/:id',(req,res) => {
    Products.findByPk(req.params.id).then(Products => {
        if (!Products){
            res.status(404).send('Book not found');
        } else {
            Products.destroy().then(() => {
                res.send({});
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port http://localhost:${port}`));  