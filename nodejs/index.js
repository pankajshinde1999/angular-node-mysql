const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12M@rch1999',
    database: 'testdb'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL database');
});

//Create a new record

app.post('/categories/add', (req, res) => {
    const { ID, Name } = req.body;
    const sql = `INSERT INTO categories (CategoryID, CategoryName) VALUES ('${ID}', '${Name}')`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(`User added with ID ${result.insertId}`);
    });
});
app.post('/products/add', (req, res) => {
    const { Name, CID } = req.body;
    const sql = `INSERT INTO Products ( ProductName, CategoryID) VALUES ( '${Name}','${CID}')`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(`User added with ID ${result.insertId}`);
    });



});

// Retrieve all records
app.get('/categories', (req, res) => {
    const sql = 'SELECT * FROM Categories';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Retrieve a record by ID
app.get('/categories/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM Categories WHERE CategoryID = ${id}`;
    //    console.log(sql)
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// app.post('/getproductbyid/:id/:pid', (req, res) => {
//     const { id , pid } = req.params;
//     const sql = `SELECT * FROM Products WHERE CategoryID = ${id} AND ProductID = ${pid}`;
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });

app.post('/getproducts/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM Products WHERE CategoryID = ${id} `;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//join and join by id
app.get('/joinproducts/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT c.CategoryID, c.CategoryName, p.ProductID, p.ProductName 
                FROM Products p 
                INNER JOIN categories c ON p.CategoryID = c.CategoryID AND c.CategoryID =${id} ;`;
    //console.log(sql)
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.get('/joinproducts', (req, res) => {
    const sql = `SELECT c.CategoryID, c.CategoryName, p.ProductID, p.ProductName 
                FROM Products p 
                INNER JOIN categories c ON p.CategoryID = c.CategoryID ;`;
    //console.log(sql)
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Update a record
app.put('/categories/:id', (req, res) => {
    const { id } = req.params;
    const { CategoryName } = req.body;
    const sql = `UPDATE categories SET CategoryName = '${CategoryName}' WHERE CategoryID = ${id}`;//, email = '${email}'
    console.log(sql)
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('User updated successfully ');
    });
});
app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { ProductName, CategoryID } = req.body;
    const sql = `UPDATE products SET ProductName = '${ProductName}', CategoryID = '${CategoryID}' WHERE ProductID = ${id}`;
    console.log(sql)
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('User updated successfully ');
    });
});

// Delete a record
app.delete('/categories/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM categories WHERE CategoryID = ${id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('User deleted successfully');
    });
});
app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM products WHERE ProductID = ${id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('User deleted successfully');
    });
});

// Get users and Add users 
app.post('/addUsers', (req, res) => {
    const { name, email, password } = req.body;
    const query = `INSERT INTO users (usersName, EmailID, Password) VALUES ('${name}', '${email}', '${password}')`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error creating user:', err);
            return res.status(500).json({ error: 'Error creating user' });
        }
        const insertedUserId = results.insertId;
        return res.status(201).json({ message: 'User created successfully', userId: insertedUserId });
    })
});
app.get('/getUsers', (req, res) => {
    const query = `SELECT * FROM users`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error getting users', err);
            return res.status(500).json({ error: 'Error getting users' })
        }
        return res.status(200).json(results);
    })
});
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT * FROM users WHERE EmailID = '${email}' AND Password = '${password}'`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error logging in:', err);
            return res.status(500).json({ error: 'Error logging in' });
        }
        if (results.length > 0) {
            return res.status(200).json({ message: 'user login ', user: results[0].usersName });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
