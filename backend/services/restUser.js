const UserDAO = require("./userDAO.js");
const crypto = require('crypto');

class RestUser {



    getUser= function (req, res) {
        res.type("application/json");
        let uDao = new UserDAO();
        var email = req.body.email
        var password = req.body.password
        uDao.getUserByCredentials(email,password).then((user) => {
            if(user.length == 0)
                res.status(401).json("Cant find user")
            else
                res.status(200).json(user)
        });
    }

    insertUser= function (req, res) {
        res.type("application/json");
        let uDao = new UserDAO();
        var keys = this.generateDiffieHellmanKeyPair()
        var user = req.body
        user.private_dh_key = keys.private
        user.public_dh_key = keys.public

        uDao.insert(user).then((data) => {
            res.status(200).json("Succesfull registration!!!")
        });
    }

    generateDiffieHellmanKeyPair= function() {
        const dh = crypto.createDiffieHellman(1024);
        dh.generateKeys()
        const privateKey = dh.getPrivateKey('hex');
        const publicKey = dh.getPublicKey('hex');
        return { "private" :  privateKey, "public" :publicKey };
    }
      


}

module.exports = RestUser;