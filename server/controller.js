module.exports = {
	async getInventory(req, res) {
		const db = req.app.get('db'),
			data = await db.get_inventory().catch(err => res.status(500).send(err))
		res.status(200).send(data)
	},
	async createProduct(req, res) {
		const db = req.app.get('db'),
			{ name, price, img } = req.body,
			data = await db
				.create_product(name, price, img)
				.catch(err => res.status(500).send(err))
		res.status(200).send(data)
	},
	async deleteProduct(req, res) {
		const db = req.app.get('db'),
			{ id } = req.params,
			data = await db.delete_product(id).catch(err => res.status(500).send(err))
		res.status(200).send(data)
	},
	async updateProduct(req, res) {
		const db = req.app.get('db'),
			{ id } = req.params,
			{ name, price, img } = req.body,
			data = await db
				.update_product(id, name, price, img)
				.catch(err => res.status(500).send(err))
		res.status(200).send(data)
	}
}
