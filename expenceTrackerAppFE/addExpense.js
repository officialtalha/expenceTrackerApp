const form = document.getElementById('addExpForm');
const lists = document.getElementById('addExpLists');
const info = JSON.parse(localStorage.getItem("info"));
const token = info.token;
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const result = await axios.post('http://localhost:3000/add-expense', {
            amount: e.target.amount.value,
            description: e.target.description.value,
            catogary: document.querySelector('#addExpCatogary').value,
            token
        });
        const h2 = document.getElementById('h2');
        h2.appendChild(document.createTextNode(`Welcome ${info.name}`));

        const li1 = document.createElement('li');
        li1.appendChild(document.createTextNode(`Amount: ${result.data.amount}`));

        const li2 = document.createElement('li');
        li2.appendChild(document.createTextNode(`Description: ${result.data.description}`));

        const li3 = document.createElement('li');
        li3.appendChild(document.createTextNode(`Catogary: ${result.data.catogary}`));

        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'submit';
        deleteBtn.appendChild(document.createTextNode(`Delete Expense`));

        lists.appendChild(li1);
        lists.appendChild(li2);
        lists.appendChild(li3);
        lists.appendChild(deleteBtn);

        deleteBtn.onclick = async () => {
            await axios.delete(`http://localhost:3000/add-expense/${result.data.id}`);
            lists.removeChild(li1);
            lists.removeChild(li2);
            lists.removeChild(li3);
            lists.removeChild(deleteBtn);
        }
    } catch (err) {
        console.log(err);
    }
});
//wheb page refresh
(async () => {
    try {
        // console.log(typeof (token));
        const result = await axios.get(`http://localhost:3000/add-expense`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        });

        const h2 = document.getElementById('h2');
        h2.appendChild(document.createTextNode(`Welcome ${info.name}`));
        for (let i in result.data) {

            const li1 = document.createElement('li');
            li1.appendChild(document.createTextNode(`Amount: ${result.data[i].amount}`));

            const li2 = document.createElement('li');
            li2.appendChild(document.createTextNode(`Description: ${result.data[i].description}`));

            const li3 = document.createElement('li');
            li3.appendChild(document.createTextNode(`Catogary: ${result.data[i].catogary}`));

            const deleteBtn = document.createElement('button');
            deleteBtn.type = 'submit';
            deleteBtn.appendChild(document.createTextNode(`Delete Expense`));

            lists.appendChild(li1);
            lists.appendChild(li2);
            lists.appendChild(li3);
            lists.appendChild(deleteBtn);

            deleteBtn.onclick = async () => {
                await axios.delete(`http://localhost:3000/add-expense/${result.data[i].id}`);
                lists.removeChild(li1);
                lists.removeChild(li2);
                lists.removeChild(li3);
                lists.removeChild(deleteBtn);
            }
        }
    } catch (err) {
        console.log(err);
    }
})();