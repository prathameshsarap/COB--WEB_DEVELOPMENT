const Boxinput = document.getElementById("input-box");
const listHolder = document.getElementById("list-containers");

function taskAdd() {
    if (Boxinput.value === '') {
        alert("You need to write something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = Boxinput.value;

        let cross = document.createElement("span");
        cross.innerHTML = "&times;";
        li.appendChild(cross);

        listHolder.appendChild(li);
        Boxinput.value = "";
        captureData();
    }
}

listHolder.addEventListener('click', function (event) {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("completed");
    } else if (event.target.tagName === "SPAN") {
        event.target.parentElement.remove();
        captureData();
    }
}, false);

function captureData() {
    localStorage.setItem("entereddata", listHolder.innerHTML);
}

function showMyTask() {
    listHolder.innerHTML = localStorage.getItem("entereddata");
}

showMyTask();
