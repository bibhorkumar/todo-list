var task = document.getElementById("item-input");
var list = document.getElementById("task-list");
var i = 0;
let dragSrcEl;
//creates and returns list items for to-do list
const createListItems = function (items) {
  i++;
  const liTag = document.createElement("li");
  liTag.innerHTML = items;
  liTag.setAttribute("class", "list-items");
  liTag.setAttribute("id", `list-items-${i}`);
  liTag.setAttribute("draggable", "true");

  const clearButton= document.createElement("button");
  clearButton.innerHTML="X";
  clearButton.setAttribute("class","clear-button");
  clearButton.addEventListener("click",(e)=>{
    e.currentTarget.parentNode.style.textDecoration="line-through";
  })
  liTag.appendChild(clearButton);
  
  const delButton = document.createElement("button"); //delete button creation on every list item creation
  delButton.innerHTML = "delete";
  delButton.setAttribute("id", `item-delete-${i}`);
  delButton.setAttribute("class", "delete-button");

  delButton.addEventListener("click", (e) => {
    // for deleting items in list
    e.currentTarget.parentNode.remove();
  });
  liTag.appendChild(delButton);
  return liTag;
};

//add list items to to-do list on clicking submit button
document.getElementById("submit").addEventListener("click", function () {
  if (task.value !== "") {
    
    let li = createListItems(task.value);
    list.appendChild(li);
    // deleteButtonFunction();
    dragDrop();
  } else {
    alert("Add item");
  }
});

//clears the entire to-do list
document.getElementById("clear-button").addEventListener("click", () => {
  list.innerHTML = "";
});

// function deleteButtonFunction(){
//     let deleteButton=document.getElementsByClassName("delete-button");
//     Array.prototype.slice.call(deleteButton).forEach(function(item){
//         item.addEventListener("click",function(e){
//             e.currentTarget.parentNode.remove();
//         });
//     });

// }

function dragStartHandler(e) {
  e.currentTarget.style.color = "red";

  dragSrcEl=this;
  console.log(dragSrcEl.innerHTML);
  e.dataTransfer.effectAllowed='move';
  e.dataTransfer.setData('text/html',this.innerHTML);

}

function dragEndHandler(e){
 e.currentTarget.style.color="blue";
}

function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    return false;
  }


function dropHandler(e){
    e.stopPropagation();

    if(dragSrcEl!==this){
        dragSrcEl.innerHTML=this.innerHTML;
        this.innerHTML=e.dataTransfer.getData('text/html');
    }
    return false;
}

function dragDrop(){
    let listItems = document.querySelectorAll(".list-items");
    listItems.forEach(function (ele) {
    console.log("dragstart");
    ele.addEventListener("dragstart", dragStartHandler, false);
    ele.addEventListener("dragend", dragEndHandler, false);
    ele.addEventListener('drop',dropHandler,false);
    ele.addEventListener('dropover',handleDragOver,false);
   });
}
