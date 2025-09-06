let addBtn = document.querySelector("#add");
let inputBtn = document.querySelector("input");
let container = document.querySelector(".container");

inputBtn.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addBtn.click();
});

addBtn.addEventListener("click", () => {
  clearBtn.style.display = "inline";
  let val = inputBtn.value;

  if (!val.trim()) {
    return;
  }
  let newDiv = document.createElement("div");
  container.appendChild(newDiv);

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("done-checkbox");

  let task = document.createElement("span");
  task.innerText = val;

  newDiv.append(checkbox);
  newDiv.append(task);

  let editBtn = document.createElement("button");
  editBtn.innerHTML = '<span class="material-symbols-outlined">edit</span>';
  newDiv.append(editBtn);
  editBtn.classList.add("edit");

  let delBtn = document.createElement("button");
  delBtn.innerHTML = '<span class="material-symbols-outlined">delete</span>';
  newDiv.append(delBtn);
  delBtn.classList.add("del");
  console.log(delBtn);

  inputBtn.value = "";
  clearButtonVisibility();
});

container.addEventListener("click", (event) => {
  if (event.target.classList.contains("done-checkbox")) {
    let taskStatus = event.target.parentElement.querySelector("span");
    if (event.target.checked) {
      taskStatus.style.textDecoration = "line-through";
      taskStatus.style.color = "gray";
    } else {
      taskStatus.style.textDecoration = "none";
      taskStatus.style.color = "black";
    }
  }

  let btn = event.target.closest("button");
  // console.log(event.target.classList.contains("del"));
  if (btn.classList.contains("del")) {
    btn.parentElement.remove();
    clearButtonVisibility();
  } else if (btn.classList.contains("edit")) {
    let editBox = btn.parentElement.querySelector("span");

    let currentText = editBox.innerText;

    let newVal = document.createElement("input");
    newVal.classList.add("edit-input");
    newVal.value = currentText;
    newVal.style.background = "inherit";
    newVal.style.border = "none";

    btn.innerHTML = '<span class="material-symbols-outlined">save</span>';
    btn.classList.remove("edit");
    btn.classList.add("save");

    editBox.replaceWith(newVal);
  } else if (btn.classList.contains("save")) {
    let input = btn.parentElement.querySelector(".edit-input");
    let newSpan = document.createElement("span");
    newSpan.textContent = input.value.trim();

    btn.innerHTML = '<span class="material-symbols-outlined">edit</span>';
    btn.classList.remove("save");
    btn.classList.add("edit");
    input.replaceWith(newSpan);

    if (newSpan.innerText.trim() === "") {
      btn.parentElement.remove();
      clearButtonVisibility();
    }
  }
});

let clearBtn = document.querySelector("#clearAll");

function clearButtonVisibility() {
  if (container.innerHTML.trim() === "") {
    clearBtn.style.display = "none";
  } else {
    clearBtn.style.display = "inline";
  }
}

clearButtonVisibility();

clearBtn.addEventListener("click", () => {
  container.innerHTML = "";
  clearButtonVisibility();
});
