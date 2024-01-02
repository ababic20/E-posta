const Database = require("../db/database.js");

class UserDAO {

	constructor() {
		this.database = new Database();
	}

    getUserByCredentials = async function (email, password) {
		this.database.connectToDb();
		let sql = "SELECT * FROM user WHERE email =? AND password =?;"
		var data = await this.database.executeQuery(sql, [email,password]);
		this.database.closeConectionToDb();
		return data;
	}

	getUserById = async function (id) {
		this.database.connectToDb();
		let sql = "SELECT * FROM user WHERE id =?;"
		var data = await this.database.executeQuery(sql, [id]);
		this.database.closeConectionToDb();
		return data;
	}

	getEmailById = async function (id) {
		this.database.connectToDb();
		let sql = "SELECT email FROM user WHERE id =?;"
		var data = await this.database.executeQuery(sql, [id]);
		this.database.closeConectionToDb();
		return data;
	}
	
	getUserByEmail = async function (email) {
		this.database.connectToDb();
		let sql = "SELECT * FROM user WHERE email =?;"
		var data = await this.database.executeQuery(sql, [email]);
		this.database.closeConectionToDb();
		return data;
	}


	insert = async function (user) {
		this.database.connectToDb();
		const sql = "INSERT INTO `user` (`name`, `last_name`, `email`, `password`, `private_dh_key`, `public_dh_key`) VALUES (?, ?, ?, ?, ?, ?)";
		var data = await this.database.executeQuery(sql, [user.name, user.last_name,user.email,user.password,user.private_dh_key, user.public_dh_key]);
		this.database.closeConectionToDb();
		return data;
	}

}

module.exports = UserDAO;