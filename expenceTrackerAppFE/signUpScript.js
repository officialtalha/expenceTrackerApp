const form = document.getElementById('form1');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const result = await axios.post('http://localhost:3000/signup', {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value
    });
    document.getElementById('heading2').innerText = '';
    document.getElementById('heading2').appendChild(document.createTextNode(`${result.data.message}`));
    if (result.data.flag) {
        window.location.href = "/logIn.html"
    }
});