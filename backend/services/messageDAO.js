const Database = require("../db/database.js");

class MessageDAO {

	constructor() {
		this.database = new Database();
	}

    getSentByUser = async function (userID) {
		this.database.connectToDb();
		let sql = "SELECT * FROM message WHERE sender =? ;"
		var data = await this.database.executeQuery(sql, [userID]);
		this.database.closeConectionToDb();
		return data;
	}
    getReceivedByUser = async function (userID) {
		this.database.connectToDb();
		let sql = "SELECT * FROM message WHERE  recipient =?;"
		var data = await this.database.executeQuery(sql, [userID]);
		this.database.closeConectionToDb();
		return data;
	}

	changeMessageStatus = async function (messageID) {
		this.database.connectToDb();
		let sql = "UPDATE `message` SET `read` = 1 WHERE `id` = ?;"
		var data = await this.database.executeQuery(sql, [messageID]);
		this.database.closeConectionToDb();
		return data;
	}

	sentMessage = async function (message,senderID, recipeintID) {
		this.database.connectToDb();
		
		let sql = "INSERT INTO `message` (`title`, `content`, `sender`, `recipient`, `read`) VALUES (?, ?, ?, ?, ?);"
		var data = await this.database.executeQuery(sql, [message.title,message.content,senderID,recipeintID,0]);
		this.database.closeConectionToDb();
		return data;
	}



}

module.exports = MessageDAO;