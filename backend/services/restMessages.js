const MessageDAO = require("./messageDAO.js");
const Encryption = require("./encryption.js");
const encryption = new Encryption();
const UserDAO = require("./userDAO.js");


class RestUser {

    getSentMessages= function (req, res) {
        res.type("application/json");
        var userID = req.query.id
        console.log(userID)
        var mDao = new MessageDAO();
        mDao.getSentByUser(userID).then( async (messages) => {
            for(let message of messages)
            {   
                var aesKey = await encryption.generateAesKey(message.sender, message.recipient) // flipped on purpose
                var decryptedTitle= encryption.decryptData(message.title,aesKey)
                var decryptedData = encryption.decryptData(message.content,aesKey)
                message.content = decryptedData
                message.title = decryptedTitle
                var uDao = new UserDAO();
                message.sender = (await uDao.getEmailById(message.sender))[0].email
                message.recipient = (await uDao.getEmailById(message.recipient))[0].email
            }    
            res.status(200).json(messages)
        });
    }

    getReceivedMessages= function (req, res) {
        res.type("application/json");
        var userID = req.query.id
        console.log(userID)
        var mDao = new MessageDAO();

        mDao.getReceivedByUser(userID).then( async (messages) => {
            for(let message of messages)
            {   
                var aesKey = await encryption.generateAesKey(message.sender, message.recipient) // flipped on purpose
                var decryptedTitle= encryption.decryptData(message.title,aesKey)
                var decryptedData = encryption.decryptData(message.content,aesKey)
                message.content = decryptedData
                message.title = decryptedTitle
                var uDao = new UserDAO();
                message.sender = (await uDao.getEmailById(message.sender))[0].email
                message.recipient = (await uDao.getEmailById(message.recipient))[0].email
            }    
            res.status(200).json(messages)
        });
    }

    setMessageStatus= function (req, res) {
        console.log("Backend MSG ID: " + req.query.id);
        res.type("application/json");
        var messageID = req.query.id
        var mDao = new MessageDAO();

        mDao.changeMessageStatus(messageID).then((data) => {
                res.status(200).json("Message status updated")
        });
    }


    sendMessage= async function (req, res) {
        res.type("application/json");
        var message = req.body
        var uDao = new UserDAO();
        var sender = await uDao.getUserByEmail(req.body.sender)
        uDao = new UserDAO();
        var recepient =  await uDao.getUserByEmail(req.body.recipient)

        var aes = encryption.generateAesKey(sender[0].id,recepient[0].id)
        var encryptedContent = await encryption.encryptData(message.content, aes)
        var encryptedTitle = await encryption.encryptData(message.title, aes)
        message.content = encryptedContent
        message.title = encryptedTitle
        var mDao = new MessageDAO();

        mDao.sentMessage(message,sender[0].id,recepient[0].id).then((data) => {
                res.status(200).json("Message sent")
        });
    }
      
}

module.exports = RestUser;