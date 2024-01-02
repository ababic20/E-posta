const MessageDAO = require("./messageDAO.js");

class RestUser {



    getSentMessages= function (req, res) {
        res.type("application/json");
        let uDao = new MessageDAO();
        var userID = req.query.id
        console.log(userID)
        uDao.getSentByUser(userID).then((messages) => {
                res.status(200).json(messages)
        });
    }

    getReceivedMessages= function (req, res) {
        res.type("application/json");
        let uDao = new MessageDAO();
        var userID = req.query.id
        console.log(userID)
        uDao.getReceivedByUser(userID).then((messages) => {
                res.status(200).json(messages)
        });
    }

    setMessageStatus= function (req, res) {
        res.type("application/json");
        let uDao = new MessageDAO();
        var messageID = req.query.id
        console.log(messageID)
        uDao.changeMessageStatus(messageID).then((data) => {
                res.status(200).json("Message status updated")
        });
    }

    sendMessage= function (req, res) {
        res.type("application/json");
        let uDao = new MessageDAO();

        uDao.sentMessage(req.body).then((data) => {
                res.status(200).json("Message sent")
        });
    }
      

}

module.exports = RestUser;