require('dotenv').config()

const express = require('express'),
	massive = require('massive'),
	ctrl = require('./controller'),
	app = express(),
	{ SERVER_PORT, CONNECTION_STRING } = process.env

app.use(express.json())

massive({
	connectionString: CONNECTION_STRING,
	ssl: {
		rejectUnauthorized: false
	}
})
	.then(db => {
		app.set('db', db)
		console.log('DB connected')
	})
	.catch(err => console.log(err))

app.get('/api/inventory', ctrl.getInventory)
app.post('/api/product', ctrl.createProduct)
app.put('/api/product/:id', ctrl.updateProduct)
app.delete('/api/product/:id', ctrl.deleteProduct)

app.listen(SERVER_PORT, () =>
	console.log(`Server listening on port: ${SERVER_PORT}`)
)
