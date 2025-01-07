const userName=localStorage.getItem("data");

let updatedName=document.querySelector(".name p");
updatedName.innerText=`Hey, ${userName}`;

