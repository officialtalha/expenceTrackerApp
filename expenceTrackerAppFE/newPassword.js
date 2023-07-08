const info = JSON.parse(localStorage.getItem("info"));
const token = info.token;
const form = document.getElementById('newPassForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const result = await axios.post('http://localhost:3000/new-password', {
            p1: document.getElementById('newPass1').value,
            p2: document.getElementById('newPass2').value,
            token
        });

        if (result.data.success) {
            const h3 = document.getElementById('newPassH3');
            h3.innerText = 'password changed successfully.'
            h3.style.color = 'green';
            setTimeout(() => {
                window.location.href = './logIn.html';
            }, 1000);

        } else {
            const h3 = document.getElementById('newPassH3');
            h3.innerText = 'password does not matched.'
            h3.style.color = 'red';
        }
        console.log(result);
    } catch (err) {
        console.log(err);
    }
});