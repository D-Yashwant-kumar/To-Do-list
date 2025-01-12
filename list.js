const userName=localStorage.getItem("name");
const btn = document.querySelector("button");
const task= document.querySelector(".add");
const listicon= document.querySelector(".added-tasks ul");


let updatedName=document.querySelector(".name p");
updatedName.innerText=`Hey, ${userName}`;

btn.addEventListener("click", ()=>{
    if(task.value.trim() !== ""){
        addTask(task.value);
        task.value= "";
        savedata();
    }
})

addTask=(taskText)=>{
    const li =document.createElement("li");
    const taskSpan = document.createElement("span");
    taskSpan.textContent= taskText;
    li.appendChild(taskSpan);

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

        if(icon.className=== "fa-solid fa-trash-can"){
            icon.addEventListener("click",()=>{
                li.remove();
                savedata();
            })
        }else if(icon.className=== "fa-solid fa-pen-to-square"){
            icon.addEventListener("click",()=>{
                const newText= prompt("edit the text:", taskSpan.textContent);
                if(newText !== null && newText.trim() !== ""){
                    taskSpan.textContent = newText.trim();
                    savedata();
                }
            })
        }
})
    
            
    li.appendChild(iconDiv);
    listicon.appendChild(li);
   
        }


       const savedata = () => {
        const tasks = [];
        const listItems = listicon.querySelectorAll("li");
        listItems.forEach((li) => {
            tasks.push({
                text: li.querySelector("span").textContent,
            });
        });
    
        localStorage.setItem("tasks", JSON.stringify(tasks));  
    };
    
    const getdata = () => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (savedTasks) {
            savedTasks.forEach((task) => {
                addTask(task.text); 
            });
        }
    };

    
    getdata()

