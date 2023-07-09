const form = document.getElementById('forgetForm');
const h4 = document.getElementById('forgetH3');
const a = document.getElementById('forgetP');
const p = document.getElementById('forgetA');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const result = await axios.post('http://localhost:3000/recover-account', {
            email: document.getElementById('forgetEmail').value,
            name: document.getElementById('forgetName').value
        });
        if (result.data.success) {
            h4.innerText = `password reacovery link has been sent to: ${document.getElementById('forgetEmail').value}`;
            h4.style.color = 'blue';
            a.removeAttribute('style');
            p.removeAttribute('style');
        } else {
            h4.innerText = 'user does not exist.';
            h4.style.color = 'red';
        }
    } catch (err) {
        console.log(err);
    }
});