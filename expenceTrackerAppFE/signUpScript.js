const form = document.getElementById('form1');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const result = await axios.post('http://localhost:3000/signup', {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value
    });
    const headingSignup = document.getElementById('heading2');
    headingSignup.innerText = '';
    headingSignup.appendChild(document.createTextNode(`${result.data.message}`));
    // if (result.data.message == 'Sign Up Successful!') {
    //     headingSignup.style.color = 'green';
    // } else {
    //     headingSignup.style.color = 'red';
    // }
    if (result.data.flag) {
        headingSignup.style.color = 'green';
    } else {
        headingSignup.style.color = 'red';
    }
    setTimeout(() => {
        if (result.data.flag) {
            window.location.href = "/login.html"
        }
    }, 1000);

});