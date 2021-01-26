const weatherForm = document.querySelector("form");
const search= document.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value;
    const url = `http://localhost:3000/weather?address=${location}`;
    messageOne.textContent = 'loading...';
    messageTwo.textContent = '';
    fetch(url).then(res => {
        res.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }

        })
    })

})