const logger = require('../middleware/logger');
const User = require('../model/modelUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fP = require('../model/modelForgetPass');
exports.newPassGet = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await fP.findAll({
            where: {
                id: id
            }
        });
        const active = result[0].dataValues.active;
        if (active) {
            res.status(200).send(`
        <form id="resetFrom" action="/new-password" method="post">
            <label for="newPass1">Enter new password: </label>
            <input type="password" name="newPassName1" id="newPass1" placeholder="Enter password..." required>
            </br>
            <label for="newPass2">Re-enter password: </label>
            <input type="password" name="newPassName2" id="newPass2" placeholder="Re-Enter password..." required>
            <input type="text" name="uuidName" id="uuid" value="${id}" style="display: none">
            </br>
            <button type="submit" id="recoverBtn">submit</button>
        </form>
        `);
            await fP.update({
                active: false,
                expiredBy: new Date()
            }, {
                where: {
                    id: id
                }
            });
        } else {
            res.status(200).send(`<h4 style="color: red">sorry link has been expired.</h4>`);
        }
    } catch (err) {
        logger.error(err);
        return res.status(500).send(`<h4 style="color: red">Incorrect Link.</h4>`);
    }
};

exports.newPassPost = async (req, res) => {
    const { newPassName1, newPassName2, uuidName } = req.body;
    try {
        if (newPassName1 == newPassName2) {
            const result = await fP.findAll({
                where: {
                    id: uuidName
                }
            });
            const userId = result[0].dataValues.userId;
            const hash = await bcrypt.hash(newPassName1, 10);
            await User.update({
                password: hash
            },
                {
                    where: {
                        id: userId
                    }
                });
            res.status(200).send(`<h4 style="color: green">Congratulations your password has been changed successfully.</h4>
            <h5>you can close this tab and go back to the previous tab.</h5>
            `);
        } else {
            res.status(200).send(`<h4 style="color: red">You Entered password does not matched. click Back and try again.</h4>`);
        }
    } catch (err) {
        logger.error(err);
        return res.status(500).json({ success: false, error: err });
    }
};