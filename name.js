const input= document.querySelector("input");
const btn= document.querySelector("button");


btn.addEventListener("click", ()=>{
    if(input.value=== ""){
        alert ("Enter Your Name");
    }else{
        window.location.href = "list.html";
        
    
    }
})
