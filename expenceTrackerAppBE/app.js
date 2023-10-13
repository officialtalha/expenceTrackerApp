//configuring environment variable
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'config', '.env') });
//import modules/packages
const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./util/database');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middleware/logger');
//setup port number 
const PORT = process.env.PORT || 3000;
//import routes
const signUpRoute = require('./routes/signUp');
const logInRoute = require('./routes/login');
const addExpenseRoute = require('./routes/addExpense');
const premiumRoutes = require('./routes/premium');
const deleteAccountRoutes = require('./routes/deleteAccount');
const checkPremiumRoutes = require('./routes/checkPremium');
const leaderboardRoutes = require('./routes/leaderboard');
const recoverAccount = require('./routes/recoverAccount');
const newPasswordRoutes = require('./routes/newPassword');
const downloadRoutes = require('./routes/download');
const downloadLinkRoutes = require('./routes/downloadLink');
//import models
const Expense = require('./model/modelExpense');
const User = require('./model/modelUser');
const Order = require('./model/modelOrder');
const fP = require('./model/modelForgetPass');
const DL = require('./model/modelDownloadLink');
//routes
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use('/signup', signUpRoute);
app.use('/login', logInRoute);
app.use('/add-expense', addExpenseRoute);
app.use('/premium', premiumRoutes);
app.use('/dltAc', deleteAccountRoutes);
app.use('/check-premium', checkPremiumRoutes);
app.use('/leaderboard', leaderboardRoutes);
app.use('/recover-account', recoverAccount);
app.use('/new-password', newPasswordRoutes);
app.use('/download', downloadRoutes);
app.use('/downloadLink', downloadLinkRoutes);

//foreign key relationship
User.hasMany(Expense);//important to understand one to many relation 
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(fP);
fP.belongsTo(User);

User.hasMany(DL);
DL.belongsTo(User);
//running the server
(async () => {
    try {
        await sequelize.sync();
        app.listen(PORT, (err) => {
            if (!err) {
                logger.info(`server running on port http://localhost:${PORT}`);
            } else {
                logger.error(err);
            }
        });
    } catch (err) {
        logger.error(err);
    }
})();
