const form = document.getElementById('logInForm');

form.addEventListener('submit', async (e) => {

    e.preventDefault();
    try {
        const result = await axios.post('http://localhost:3000/login', {
            email: e.target.email.value,
            password: e.target.password.value
        });
        console.log(result);
        const info = {
            'token': result.data.token,
            'name': result.data.name
        };
        localStorage.setItem("info", JSON.stringify(info));
        localStorage.setItem('itemPerPage', '3');
        const headingLogin = document.getElementById('logInheading');
        headingLogin.innerText = '';
        headingLogin.appendChild(document.createTextNode(`${result.data.message}`));
        if (result.data.message == 'Login Successful') {
            headingLogin.style.color = 'green';
        } else {
            headingLogin.style.color = 'red';
        }
        if (result.data.flag) {
            setTimeout(() => {
                window.location.href = "./addExpense.html";
            }, 1000);
        }

    } catch (err) {
        console.log(err);
    }
});

document.getElementById('forgetBtn').addEventListener('click', (e) => {
    e.preventDefault();

    window.location.href = './forgetPassword.html';
});