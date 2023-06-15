const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./util/database');
const signUpRoute = require('./routes/signUp');
const logInRoute = require('./routes/login');
const addExpenseRoute = require('./routes/addExpense');

const PORT = 3000;

app.use(cors());
app.use('/signup', signUpRoute);
app.use('/login', logInRoute);
app.use('/add-expense', addExpenseRoute);

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
