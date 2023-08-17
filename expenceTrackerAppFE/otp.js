const form = document.getElementById('otpForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const result = await axios.post('http://localhost:3000/otp', {
            otp: document.getElementById('otpField').value
        });
        console.log(result);
        if (result.data.success) {
            window.location.href = './newPassword.html';
        } else {
            const h3 = document.getElementById('otpH3');
            h3.innerText = 'Enter correct OTP'
            h3.style.color = 'red';
        }
    } catch (err) {
        console.log(err);
    }
});