const form = document.getElementById('addExpForm');
const lists = document.getElementById('addExpLists');
const leaderboard = document.getElementById('leader-board');
const downloadLink = document.getElementById('download-link');
const premiumBtn = document.getElementById('premiumBtn');
const info = JSON.parse(localStorage.getItem("info"));
const token = info.token;
// let isPremium = false;
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const result = await axios.post('http://localhost:3000/add-expense', {
            amount: e.target.amount.value,
            description: e.target.description.value,
            catogary: document.querySelector('#addExpCatogary').value,
            token
        });
        // console.log(result);

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
            await axios.delete(`http://localhost:3000/add-expense/${result.data.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            });
            lists.removeChild(li1);
            lists.removeChild(li2);
            lists.removeChild(li3);
            lists.removeChild(deleteBtn);
            location.reload();
        }
        location.reload();
    } catch (err) {
        console.log(err);
    }
});

//when page refresh
(async () => {
    try {
        const h2 = document.getElementById('h2');
        h2.className = 'neon-text';
        h2.appendChild(document.createTextNode(`Welcome ${info.name}`));

        const premiumCheck = await axios.get(`http://localhost:3000/check-premium`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        });
        // console.log(premiumCheck.data);
        if (premiumCheck.data[0].isPremium == true) {
            premiumBtn.remove();
            const h3 = document.createElement('h3');
            h3.className = 'premium-user';
            h3.innerText = 'You are a Premium user.'
            document.getElementsByTagName('body')[0].insertBefore(h3, document.getElementById('dltAcntBtn'));
            //leader board button 
            const leaderBtn = document.createElement('button');
            leaderBtn.id = 'leaderBtn';
            leaderBtn.innerText = 'show leaderboard';
            document.getElementsByTagName('body')[0].insertBefore(leaderBtn, document.getElementById('dltAcntBtn'));
            //download button
            const downloadBtn = document.createElement('button');
            downloadBtn.id = 'dwBtn';
            downloadBtn.innerText = 'download expenses';
            document.getElementsByTagName('body')[0].insertBefore(downloadBtn, lists);
            //download button operations 
            downloadBtn.onclick = async () => {
                try {
                    const result = await axios.get(`http://localhost:3000/download`,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': token,
                            }
                        });
                    if (result.data.success == true) {
                        const linkDownload1 = result.data.link;
                        const a1 = document.createElement('a');
                        a1.href = linkDownload1;
                        a1.download = 'file.txt';
                        a1.click();
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            document.getElementById('rcntdwnld').removeAttribute('style');
            //leader board operations 
            leaderboard.innerHTML = '';
            leaderBtn.onclick = async () => {
                try {
                    if (leaderboard.hasChildNodes()) {
                        leaderboard.innerHTML = '';
                        leaderBtn.innerText = 'show leaderboard';
                    } else {
                        const userSum = await axios.get(`http://localhost:3000/leaderboard`, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': token,
                            }
                        });
                        const allUser = userSum.data.allUsers;
                        // arr.sort((a, b) => a.totalExpenses - b.totalExpenses).reverse();

                        for (let x in allUser) {
                            const leaderLi1 = document.createElement('li');
                            leaderLi1.id = 'leaderLi1';
                            leaderLi1.appendChild(document.createTextNode(`Name: ${allUser[x].name} - Amount: ${allUser[x].totalExpenses}`));
                            leaderboard.appendChild(leaderLi1);
                        }
                        leaderBtn.innerText = 'close leader board';
                    }

                } catch (err) {
                    console.log(err);
                }
            }

            const leaderH3 = document.createElement('h3');
            leaderH3.innerText = 'Leader Board';
            document.getElementsByTagName('body')[0].insertBefore(leaderH3, leaderboard);
        }
        //fetching all the expenses
        const result = await axios.get(`http://localhost:3000/add-expense`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        });

        let sum = 0;

        for (let i in result.data) {

            sum += Number(result.data[i].amount);

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
                await axios.delete(`http://localhost:3000/add-expense/${result.data[i].id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    }
                });
                lists.removeChild(li1);
                lists.removeChild(li2);
                lists.removeChild(li3);
                lists.removeChild(deleteBtn);
                location.reload();
            }
        }
        document.getElementById('totalExpense').innerText = `Total Expense Amount: ${sum}`;
        if (premiumCheck.data[0].isPremium == true) {
            const links = await axios.get(`http://localhost:3000/downloadLink`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            });
            // console.log(links.data.result);
            if (links.data.success) {
                let counter = 1;
                for (let l in links.data.result) {
                    const downloadLi = document.createElement('li');
                    const a2 = document.createElement('a');
                    a2.href = links.data.result[l].link;
                    a2.innerText = `${links.data.result[l].createdAt}file${counter}.txt`;
                    a2.download = `file.txt`;
                    downloadLi.appendChild(a2);
                    downloadLink.appendChild(downloadLi);
                    counter++;
                }
            }
        }
    } catch (err) {
        console.log(err);
    }
})();

//delete account
document.getElementById('dltAcntBtn').addEventListener('click', async (e) => {
    const flag = confirm(`This account will be deleted permanently, This account's user will not able access it anymore. would you like to delete it?`);

    try {
        if (flag) {
            await axios.delete(`http://localhost:3000/dltAc`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            });
            const h3 = document.createElement('h3');
            h3.appendChild(document.createTextNode('This account has been deleted successfully! automatically redirecting to login page...'));
            h3.style.color = 'orange';
            const bodyPage = document.getElementsByTagName('body');
            bodyPage[0].innerHTML = '';
            bodyPage[0].appendChild(h3);
            setTimeout(() => {
                window.location.href = './login.html';
            }, 2000);
        }
    } catch (err) {
        console.log(err);
    }
});

//premium code
premiumBtn.addEventListener('click', async (e) => {
    try {
        const result = await axios.get('http://localhost:3000/premium', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        });

        var options = {
            "key": result.data.key_id,
            "order_id": result.data.order,
            "handler": async function (result) {
                await axios.post('http://localhost:3000/premium', {
                    order_id: options.order_id,
                    payment_id: result.razorpay_payment_id,
                },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token,
                        }
                    });
                alert('you are a premium user now.');
                location.reload();
            }
        };

        var rzp = new Razorpay(options);
        rzp.open();
        e.preventDefault();
        rzp.on('payment.faild', function (result) {
            console.log(result);
            alert('something went wrong.');
        });
    } catch (err) {
        console.log(err);
    }
});


