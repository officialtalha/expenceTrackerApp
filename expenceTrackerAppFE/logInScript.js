const form = document.getElementById('logInForm');

form.addEventListener('submit', async (e) => {

    e.preventDefault();
    try {
        const result = await axios.post('http://localhost:3000/login', {
            email: e.target.email.value,
            password: e.target.password.value
        });
        localStorage.removeItem("userId");
        localStorage.setItem("userId", result.data.id);
        document.getElementById('logInheading').innerText = '';
        document.getElementById('logInheading').appendChild(document.createTextNode(`${result.data.message}`));
        setTimeout(() => {
            if (result.data.flag) {
                window.location.href = "./addExpense.html";
            }
        }, 1000);

    } catch (err) {
        console.log(err);
    }
});