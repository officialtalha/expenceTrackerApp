const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'config', '.env') });
const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./util/database');
//routes
const signUpRoute = require('./routes/signUp');
const logInRoute = require('./routes/login');
const addExpenseRoute = require('./routes/addExpense');
const premiumRoutes = require('./routes/premium');
const deleteAccountRoutes = require('./routes/deleteAccount');
const checkPremiumRoutes = require('./routes/checkPremium');
const leaderboardRoutes = require('./routes/leaderboard');
//models
const Expense = require('./model/modelExpense');
const User = require('./model/modelUser');
const Order = require('./model/modelOrder');

const PORT = 3000;

app.use(cors());
app.use('/signup', signUpRoute);
app.use('/login', logInRoute);
app.use('/add-expense', addExpenseRoute);
app.use('/premium', premiumRoutes);
app.use('/dltAc', deleteAccountRoutes);
app.use('/check-premium', checkPremiumRoutes);
app.use('/leaderboard', leaderboardRoutes);

User.hasMany(Expense);//important to understand one to many relation 
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

(async () => {
    const result = await sequelize.sync();
    app.listen(PORT, (err) => {
        if (!err) {
            console.log(`server running on port http://localhost:${PORT}`);
        } else {
            console.log(err);
        }
    });
})();
