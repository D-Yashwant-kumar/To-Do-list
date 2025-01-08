const userName=localStorage.getItem("data");
const btn = document.querySelector("button");
const input= document.querySelector(".add");
const listicon= document.querySelector(".added-tasks ul");

let updatedName=document.querySelector(".name p");
updatedName.innerText=`Hey, ${userName}`;

btn.addEventListener("click", ()=>{
    if(input.value===""){
        alert("Add Tasks");
    }else{
        const icons =["fa-solid fa-trash-can", "fa-solid fa-pen-to-square", "fa-regular fa-circle-check"];
        
        icons.forEach((iconClass)=>{
            const icon= document.createElement("i");
            icon.className= iconClass;
            const li =document.createElement("li");
            li.innerHTML= input.value;
            listicon.appendChild(li);
            listicon.appendChild(icon);

        })
       
    }
})

