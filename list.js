const userName=localStorage.getItem("name");
const btn = document.querySelector("button");
const task= document.querySelector(".add");
const listicon= document.querySelector(".added-tasks ul");
const progressCount = document.querySelector("#progress");
const doneCount= document.querySelector("#done");


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
                updateProgress();
   
            })
        }else if(icon.className=== "fa-solid fa-pen-to-square"){
            icon.addEventListener("click",()=>{
                const currentText = taskSpan.textContent;
                const input = document.createElement("input");
                input.className = "newEdit"
                input.type = "text";
                input.value = currentText;
                taskSpan.replaceWith(input);

                input.addEventListener("blur", ()=>{
                    saveEditedText(input, taskSpan);
                });

                input.addEventListener("keydown", (event)=>{
                    if(event.key==="Enter"){
                        saveEditedText(input, taskSpan)
                    }
                })
                savedata();
                }
            )
        } else if(icon.className==="fa-regular fa-circle-check"){
            icon.addEventListener("click",()=>{
                taskSpan.classList.toggle("completed");
                updateProgress();
            })
        }
})
    
            
    li.appendChild(iconDiv);
    listicon.appendChild(li);
    updateProgress();
   
        }

        const saveEditedText = (input, taskSpan)=>{
            const newText = input.value.trim();
            if(newText){
                taskSpan.textContent = newText;
            }
            input.replaceWith(taskSpan);
            savedata();
        }


    let updateProgress =()=>{
        const totalTask= listicon.querySelectorAll("li").length;
        const completedTask=listicon.querySelectorAll("li span.completed").length;
        const remainingTask= totalTask - completedTask;

        progressCount.innerHTML= `To do on progress ${remainingTask}`;
        doneCount.innerHTML= `To do done ${completedTask}`;
    }

    updateProgress();


       const savedata = () => {
        const tasks = [];
        const listItems = listicon.querySelectorAll("li");
        listItems.forEach((li) => {
            tasks.push({
                text: li.querySelector("span").textContent,
                completed: li.querySelector("span").classList.contains("completed")
            });
        });
    
        localStorage.setItem("tasks", JSON.stringify(tasks));  
    };
    
    const getdata = () => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (savedTasks) {
            savedTasks.forEach((task) => {
                addTask(task.text); 
                const lastAddedTask = listicon.lastChild;
                if(task.completed){
                    lastAddedTask.querySelector("span").classList.add("completed");
                }
            });
        }
        updateProgress();
    };

    
    getdata()

