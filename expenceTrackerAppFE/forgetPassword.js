const form = document.getElementById('forgetForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const result = await axios.post('http://localhost:3000/recover-account', {
            email: document.getElementById('forgetEmail').value,
            name: document.getElementById('forgetName').value
        });
        window.location.href = './otp.html';
    } catch (err) {
        console.log(err);
    }
});