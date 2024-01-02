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

}

module.exports = UserDAO;