let  Base_url= 'https://v6.exchangerate-api.com/v6/47970c41a517e84ee7f1c08c/latest/USD'
const apiKey ='47970c41a517e84ee7f1c08c';
const dropdowns = document.querySelectorAll('.dropdown select');

const btn = document.querySelector('form button');

const formCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');

const msg = document.querySelector('.msg')
let i=0;
for(let select of dropdowns){   
    for(let currCode in countryList){
        // console.log(code ,countryList[code]);
        let newOpation = document.createElement('option');
        newOpation.innerText =currCode;
        newOpation.value = currCode;

        // Select USD -- To -- INR.
        if(select.name ==='from' && currCode=='USD'){
            newOpation.selected = 'selected'
        }else if(select.name ==='to' && currCode=='INR'){
            newOpation.selected = 'selected'
        }

        select.append(newOpation);
        select.addEventListener('change',(e)=>{
            updateFlag(e.target);
        })
    }
}

const updateFlag = (element)=>{
    let currCode = element.value;
    let currencyCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${currencyCode}/flat/64.png`;
    // element.parentElent
    let img  = element.parentElement.querySelector('img');
    img.src = newSrc;
}

btn.addEventListener('click', async  (e)=>{
    e.preventDefault();
    let amount = document.querySelector('.amount #inp-1');
    let amtVal = amount.value;
    if(amtVal==='' || amtVal<1){
        amtVal=1;
        amtVal.value='1'
    }
    
    // console.log(formCurr.value, " --- " ,toCurr.value)
    // let src =formCurr.value;
    // let des = toCurr.value;
    // const URL =  `${Base_url}/${countryList[src].toLowerCase()}/${countryList[des].toLowerCase()}.json`;
    // console.log(URL);
    // let response = await fetch(URL);
    // let data = await response.json();
    // console.log(data)
    // let rate = data[toCurr.value];

    // console.log(rate)
    // let finalAmount = amtVal*rate;
    // msg.innerHTML = `${amtVal}${formCurr.value} = ${finalAmount}${toCurr}`
    // Tech Data 



    const URL =  `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${formCurr.value}`;


    //------- .then Fetch way-------------------------------

    // fetch(URL).then((response)=>{
    //     response.json().then((result)=>{
    //         var exChangeRate =  result.conversion_rates[toCurr.value];
    //         let finalAmount = (amtVal*exChangeRate).toFixed(2);
    //         console.log(finalAmount)
    //         msg.innerHTML = `${amtVal}${formCurr.value} = ${finalAmount}${toCurr.value}`;
    //         // console.log(exChangeRate);
    //     })
    // })

    const response  = await fetch(URL);
    const data =await response.json();
    let rate = data.conversion_rates[toCurr.value];
    let finalAmount = (amtVal*rate).toFixed(2);
    msg.innerHTML = `${amtVal}${formCurr.value} = ${finalAmount}${toCurr.value}`;

})