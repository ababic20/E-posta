const { count } = require('console');
const crypto = require('crypto');
const UserDAO = require("./userDAO.js");

class Encryption {

    getSenderPrivateKey = async function (senderID) {
        let uDao = new UserDAO();
        var user = await uDao.getUserById(senderID)
        return user[0].private_dh_key
    }

    getRecipeintPublicKey = async function (recipeintID) {
        let uDao = new UserDAO();
        var user = await uDao.getUserById(recipeintID)
        return user[0].public_dh_key;
    }


    encryptData = async function (data, aesKey) {
        const keyBuffer = Buffer.from(await aesKey, 'hex');
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', keyBuffer, iv);
        const encryptedData = Buffer.concat([cipher.update(data, 'utf-8'), cipher.final()]);
        const result = Buffer.concat([iv, encryptedData]);
        return result.toString('base64');
    }

    generateAesKey = async function (senderId, recipientId) {
        var privateKey = await this.getSenderPrivateKey(senderId)
        var publicKey = await this.getRecipeintPublicKey(recipientId)
        const sharedSecret = this.computeDiffieHellmanSecret(privateKey, publicKey);
        const aesKey = this.deriveAesKeyFromSecret(sharedSecret);
        console.log(aesKey)
        return aesKey
    }

    computeDiffieHellmanSecret(privateKey, publicKey) {
        const hash1 = crypto.createHash('sha256');
        const hash2 = crypto.createHash('sha256');

        // Update hashes with input strings
        hash1.update(privateKey);
        hash2.update(publicKey);

        // Generate hexadecimal representations of the hashes
        const hex1 = hash1.digest('hex');
        const hex2 = hash2.digest('hex');

        // Combine and hash the two hexadecimal representations to create a shared secret
        const combinedHash = crypto.createHash('sha256');
        combinedHash.update(hex1 + hex2);

        // Return the final shared secret
        var secret = combinedHash.digest('hex');
        console.log(secret)
        return secret
    }

    deriveAesKeyFromSecret(sharedSecret) {
        const hash = crypto.createHash('sha256');
        hash.update(sharedSecret, 'hex');
        return hash.digest('hex');
    }

    decryptData = function (encryptedBase64, aesKey) {
        const keyBuffer = Buffer.from(aesKey, 'hex');
        const encryptedBuffer = Buffer.from(encryptedBase64, 'base64');

        // Extract IV from the encrypted buffer
        const iv = encryptedBuffer.slice(0, 16);

        // Extract encrypted content from the encrypted buffer
        const encryptedContent = encryptedBuffer.slice(16);

        const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, iv);
        const decryptedContent = Buffer.concat([decipher.update(encryptedContent), decipher.final()]);
        return decryptedContent.toString('utf-8');
    }
}
module.exports = Encryption;