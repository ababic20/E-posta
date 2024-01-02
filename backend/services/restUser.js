const UserDAO = require("./userDAO.js");

class RestUser {



    getUser= function (req, res) {
        res.type("application/json");
        let uDao = new UserDAO();
        var email = req.body.email
        var password = req.body.password
        uDao.getUserByCredentials(email,password).then((user) => {
            console.log(user)
            if(user.length == 0)
                res.status(401).json("Cant find user")
            else
                res.status(200).json(user)
        });
    }


}

module.exports = RestUser;