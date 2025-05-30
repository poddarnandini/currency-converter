Base_Url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
for(let select of dropdown){
for(code in countryList){
    let newoption=document.createElement("option");
    newoption.innerText=code;
    newoption.value=code;
    if(select.name==="from" && code==="USD"){
        newoption.selected="selected";
    }
    else if(select.name==="to" && code==="INR"){
        newoption.selected="selected";
    }
    select.append(newoption);
}

select.addEventListener("change",(evt)=>{
    updateflag(evt.target);
})
}
const updateflag=(element)=>{
let currcode=element.value;
let countrycode=countryList[currcode];
let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
let img=element.parentElement.querySelector("img");
img.src=newsrc;
}
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateexchangerate();
});
const updateexchangerate=async()=>{
    let amount=document.querySelector(".amount input");
    let amtvalue=amount.value;
    if(amtvalue==="" || amtvalue<1){
        amtvalue =1;
        amount.value="1";
    }
    const fromCurr=document.querySelector(".from select");
    const toCurr=document.querySelector(".to select");
    const msg=document.querySelector(".msg");
    const url=`${Base_Url}/${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(url);
    let data=await response.json();
    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalamount=amtvalue*rate;
    msg.innerText=`${amtvalue}${fromCurr.value}=${finalamount}${toCurr.value}`;
}
window.addEventListener("load",()=>{
    updateexchangerate();
});