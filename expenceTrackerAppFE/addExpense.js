const form = document.getElementById('addExpForm');
const lists = document.getElementById('addExpLists');
const leaderboard = document.getElementById('leader-board');
const downloadLink = document.getElementById('download-link');
const prevBtn2 = document.getElementById('prevBtn2');
const curBtn2 = document.getElementById('curBtn2');
const nextBtn2 = document.getElementById('nextBtn2');
const premiumBtn = document.getElementById('premiumBtn');
const info = JSON.parse(localStorage.getItem("info"));
const token = info.token;

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        //creating POST request to adding new expenses
        const result = await axios.post('http://localhost:3000/add-expense', {
            amount: e.target.amount.value,
            description: e.target.description.value,
            catogary: document.querySelector('#addExpCatogary').value,
            token
        });

        // const li1 = document.createElement('li');
        // li1.appendChild(document.createTextNode(`Amount: ${result.data.amount}`));

        // const li2 = document.createElement('li');
        // li2.appendChild(document.createTextNode(`Description: ${result.data.description}`));

        // const li3 = document.createElement('li');
        // li3.appendChild(document.createTextNode(`Catogary: ${result.data.catogary}`));

        // const deleteBtn = document.createElement('button');
        // deleteBtn.type = 'submit';
        // deleteBtn.appendChild(document.createTextNode(`Delete Expense`));

        // lists.appendChild(li1);
        // lists.appendChild(li2);
        // lists.appendChild(li3);
        // lists.appendChild(deleteBtn);

        // deleteBtn.onclick = async () => {
        //     await axios.delete(`http://localhost:3000/add-expense/${result.data.id}`, {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': token,
        //         }
        //     });
        //     lists.removeChild(li1);
        //     lists.removeChild(li2);
        //     lists.removeChild(li3);
        //     lists.removeChild(deleteBtn);
        //     location.reload();
        // }
        location.reload();
    } catch (err) {
        console.log(err);
    }
});

//when page refresh
(async () => {
    try {
        //showing user name at the top
        const h2 = document.getElementById('h2');
        h2.className = 'neon-text';
        h2.appendChild(document.createTextNode(`Welcome ${info.name}`));
        //sum of total expenses
        const sum = await axios.get(`http://localhost:3000/add-expense/sum-expenses`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        });
        document.getElementById('totalExpense').innerText = `Total Expense Amount: ${sum.data.result[0].totalExpenses}`;
        //fetching all the expenses
        const getItemPerPage = localStorage.getItem('itemPerPage');
        const result = await axios.get(`http://localhost:3000/add-expense/local/${getItemPerPage}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        });

        for (let i in result.data.result) {

            const li1 = document.createElement('li');
            li1.appendChild(document.createTextNode(`Amount: ${result.data.result[i].amount}`));

            const li2 = document.createElement('li');
            li2.appendChild(document.createTextNode(`Description: ${result.data.result[i].description}`));

            const li3 = document.createElement('li');
            li3.appendChild(document.createTextNode(`Catogary: ${result.data.result[i].catogary}`));

            const deleteBtn = document.createElement('button');
            deleteBtn.type = 'submit';
            deleteBtn.appendChild(document.createTextNode(`Delete Expense`));

            lists.appendChild(li1);
            lists.appendChild(li2);
            lists.appendChild(li3);
            lists.appendChild(deleteBtn);

            deleteBtn.onclick = async () => {
                await axios.delete(`http://localhost:3000/add-expense/${result.data.result[i].id}`, {
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
        //expense pagination code 
        //prev button operation 
        prevBtn2.onclick = async () => {
            const curPage = Number(curBtn2.innerText) - 1;
            const itemPerPage = localStorage.getItem('itemPerPage');
            const result = await axios.get(`http://localhost:3000/add-expense/${curPage}/${itemPerPage}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            });
            lists.innerHTML = '';
            for (let i in result.data.result) {

                const li1 = document.createElement('li');
                li1.appendChild(document.createTextNode(`Amount: ${result.data.result[i].amount}`));

                const li2 = document.createElement('li');
                li2.appendChild(document.createTextNode(`Description: ${result.data.result[i].description}`));

                const li3 = document.createElement('li');
                li3.appendChild(document.createTextNode(`Catogary: ${result.data.result[i].catogary}`));

                const deleteBtn = document.createElement('button');
                deleteBtn.type = 'submit';
                deleteBtn.appendChild(document.createTextNode(`Delete Expense`));

                lists.appendChild(li1);
                lists.appendChild(li2);
                lists.appendChild(li3);
                lists.appendChild(deleteBtn);

                deleteBtn.onclick = async () => {
                    await axios.delete(`http://localhost:3000/add-expense/${result.data.result[i].id}`, {
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
            nextBtn2.disabled = false;
            if (curBtn2.innerText == '2') {
                curBtn2.innerText = '1';
                prevBtn2.disabled = true;
            } else {
                curBtn2.innerText = Number(curBtn2.innerText) - 1;
            }
        }
        //next button operation 
        nextBtn2.onclick = async () => {
            const curPage = Number(curBtn2.innerText) + 1;
            const itemPerPage = Number(localStorage.getItem('itemPerPage'));
            const result = await axios.get(`http://localhost:3000/add-expense/${curPage}/${itemPerPage}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            });

            if (result.data.result.length == 0 || result.data.result.length < itemPerPage) {
                nextBtn2.disabled = true;
            }
            if (result.data.success && result.data.result.length != 0) {
                lists.innerHTML = '';
                for (let i in result.data.result) {
                    const li1 = document.createElement('li');
                    li1.appendChild(document.createTextNode(`Amount: ${result.data.result[i].amount}`));

                    const li2 = document.createElement('li');
                    li2.appendChild(document.createTextNode(`Description: ${result.data.result[i].description}`));

                    const li3 = document.createElement('li');
                    li3.appendChild(document.createTextNode(`Catogary: ${result.data.result[i].catogary}`));

                    const deleteBtn = document.createElement('button');
                    deleteBtn.type = 'submit';
                    deleteBtn.appendChild(document.createTextNode(`Delete Expense`));

                    lists.appendChild(li1);
                    lists.appendChild(li2);
                    lists.appendChild(li3);
                    lists.appendChild(deleteBtn);

                    deleteBtn.onclick = async () => {
                        await axios.delete(`http://localhost:3000/add-expense/${result.data.result[i].id}`, {
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
            }
            if (curBtn2.innerText == '1') {
                prevBtn2.disabled = false;
                curBtn2.innerText = '2';
            } else {
                if (result.data.result.length != 0) {
                    curBtn2.innerText = Number(curBtn2.innerText) + 1;
                }

            }
        }

        //premium code 
        const premiumCheck = await axios.get(`http://localhost:3000/check-premium`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        });
        if (premiumCheck.data.result[0].isPremium == true) {
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
                        const a1 = document.createElement('a');
                        a1.href = result.data.link;
                        a1.download = 'file.txt';
                        a1.click();
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            document.getElementById('rcntdwnld').removeAttribute('style');
            //download links code
            const links = await axios.get(`http://localhost:3000/downloadLink`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            });
            if (links.data.success) {
                for (let l in links.data.result) {
                    const downloadLi = document.createElement('li');
                    const a2 = document.createElement('a');
                    a2.href = links.data.result[l].link;
                    let arr = links.data.result[l].createdAt.split('T');
                    a2.innerText = `${links.data.result[l].id}-${arr[0]}.txt`;
                    a2.download = `${arr[0]}.txt`;
                    downloadLi.appendChild(a2);
                    downloadLink.appendChild(downloadLi);
                }
            }
            //download link pagination buttons
            const prevBtn = document.createElement('button');
            prevBtn.id = 'prevBtn';
            prevBtn.innerText = '<<';
            prevBtn.disabled = true;
            document.getElementsByTagName('body')[0].insertBefore(prevBtn, leaderboard);

            const curBtn = document.createElement('button');
            curBtn.id = 'curBtn';
            curBtn.innerText = 1;
            document.getElementsByTagName('body')[0].insertBefore(curBtn, leaderboard);

            const nextBtn = document.createElement('button');
            nextBtn.id = 'nextBtn';
            nextBtn.innerText = '>>';
            document.getElementsByTagName('body')[0].insertBefore(nextBtn, leaderboard);
            //download link pagination buttons operations 
            //next button operation
            nextBtn.onclick = async () => {
                const curPage = Number(curBtn.innerText) + 1;
                const links = await axios.get(`http://localhost:3000/downloadLink/${curPage}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    }
                });
                if (links.data.result.length < 3 || links.data.result.length == 0) {
                    nextBtn.disabled = true;
                }
                if (links.data.success && links.data.result.length != 0) {
                    downloadLink.innerHTML = '';
                    for (let l in links.data.result) {
                        const downloadLi = document.createElement('li');
                        const a2 = document.createElement('a');
                        a2.href = links.data.result[l].link;
                        let arr = links.data.result[l].createdAt.split('T');
                        // let arr = str.split('T');
                        a2.innerText = `${links.data.result[l].id}-${arr[0]}.txt`;
                        a2.download = `${arr[0]}.txt`;
                        downloadLi.appendChild(a2);
                        downloadLink.appendChild(downloadLi);
                    }
                }
                if (prevBtn.disabled) {
                    curBtn.innerText = 2;
                    prevBtn.disabled = false;
                } else {
                    if (links.data.result.length != 0) {
                        curBtn.innerText = Number(curBtn.innerText) + 1;
                    }
                }
            }
            //prev button operation
            prevBtn.onclick = async () => {
                const curPage = Number(curBtn.innerText) - 1;
                const links = await axios.get(`http://localhost:3000/downloadLink/${curPage}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    }
                });
                downloadLink.innerHTML = '';
                if (links.data.success) {
                    for (let l in links.data.result) {
                        const downloadLi = document.createElement('li');
                        const a2 = document.createElement('a');
                        a2.href = links.data.result[l].link;
                        let arr = links.data.result[l].createdAt.split('T');
                        // let arr = str.split('T');
                        a2.innerText = `${links.data.result[l].id}-${arr[0]}.txt`;
                        a2.download = `${arr[0]}.txt`;
                        downloadLi.appendChild(a2);
                        downloadLink.appendChild(downloadLi);
                    }
                }
                nextBtn.disabled = false;
                if (curBtn.innerText == 2) {
                    curBtn.innerText = 1;
                    prevBtn.disabled = true;
                } else {
                    curBtn.innerText = Number(curBtn.innerText) - 1;
                }

            }
            //leader-board heading
            const leaderH3 = document.createElement('h3');
            leaderH3.innerText = 'Leader Board';
            document.getElementsByTagName('body')[0].insertBefore(leaderH3, leaderboard);
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
        }
        //items per page option tag and button code
        const itemsPerPage = document.createElement('div');
        const itemsPerPageInnerHtml = `<lable for="item-per-page">Item Per Page: <lable>
        <select id="item-per-page">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3" selected>3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        </select>
        <button id="itemsPerPageBtn">OK</button>`;
        itemsPerPage.innerHTML = itemsPerPageInnerHtml;
        document.getElementsByTagName('body')[0].insertBefore(itemsPerPage, lists);
        document.getElementById('itemsPerPageBtn').onclick = () => {
            const itemPerPageValue = document.getElementById('item-per-page').value;
            localStorage.setItem('itemPerPage', itemPerPageValue);
            location.reload();
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

//razor-pay code
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
