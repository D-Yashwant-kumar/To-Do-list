const userName=localStorage.getItem("name");
const btn = document.querySelector("button");
const task= document.querySelector(".add");
const listicon= document.querySelector(".added-tasks ul");
const trashIcon= document.querySelector(".fa-solid fa-trash-can");

let updatedName=document.querySelector(".name p");
updatedName.innerText=`Hey, ${userName}`;

btn.addEventListener("click", ()=>{
    if(task.value===""){
        alert("Add Tasks");
    }else{
        addTask(task.value);
        savedata();
    }
})

addTask=(tastText)=>{
    const li =document.createElement("li");
    li.innerHTML=task.value;
    const iconDiv = document.createElement("div");
    iconDiv.className = "icons";
    const icons =[
        {className: "fa-solid fa-trash-can", color: "#d91212"},
        {className: "fa-solid fa-pen-to-square", color: "#ca791c"},
        {className: "fa-regular fa-circle-check", color: "#63E6BE"}
    ];
    
    icons.forEach((iconObj)=>{
        const icon= document.createElement("i");
        icon.className= iconObj.className;
        icon.style.color = iconObj.color;
        iconDiv.appendChild(icon);

        if(iconObj.className==="fa-solid fa-trash-can"){
            icon.addEventListener("click", ()=>{
                li.remove();
            savedata();
            })
            
        }
    })
    li.appendChild(iconDiv);
    listicon.appendChild(li);
}

savedata=()=>{
    localStorage.setItem("item", listicon.innerHTML); 
}

getdata=()=>{
   listicon.innerHTML= localStorage.getItem("item");

   const trashIcons = listicon.querySelectorAll(".fa-trash-can");
   trashIcons.forEach((icon) => {
       icon.addEventListener("click", (event) => {
           const li = event.target.closest("li");
           li.remove();
           savedata();
       })
});
}

getdata();

