import Action from "./classes/Action.js";
import ActionManager from "./classes/ActionsManager.js";

let manager = new ActionManager();

if (localStorage.getItem("myActions") != null) {
    manager.actions = JSON.parse(localStorage.getItem("myActions"))
    manager.calcBalance();
    showActionsInTable();
}

window.addNewAction = () => {
    let type = document.getElementById("type").value;
    let description;
    if (type == "income") description = document.getElementById("incomeSelect").value;
    else if (type == "expense") description = document.getElementById("expenseSelect").value;
    let comments = document.getElementById("comments").value;
    let amount = +document.getElementById("amount").value;
    let date = document.getElementById("date").value;
    let action = new Action(type, description, comments, amount, date);

    if (type == "" || description == "" || amount == "" || date == "") {
        alert("All the filds should be filled!")
    } else {
        manager.addAction(action);
        localStorage.setItem("myActions", JSON.stringify(manager.actions))
        document.getElementById("incomeSelect").style.display = "none";
        document.getElementById("expenseSelect").style.display = "none"
        document.getElementById("type").value = "";
        document.getElementById("comments").value = "";
        document.getElementById("amount").value = "";
        document.getElementById("date").value = "";
        showActionsInTable();
    }
};

function showActionsInTable() {
    document.getElementById("actions").innerHTML = "";
    for (let action of manager.actions) {
        document.getElementById("actions").innerHTML += `       
        <tr class=${action.type == "income" ? "text-success" : "text-danger"}>
            <td>${action.date}</td>
            <td>${action.description}</td>
            <td>${action.amount}</td>
            <td>${action.comments}</td> 
            <td><i class="fa-regular fa-pen-to-square" onClick="updateAction(${action.id})"></i></td>
            <td><i class="fa-regular fa-trash-can" onClick="deleteAction(${action.id})"></i></td>
        </tr>`;
    }
}

showActionsInTable();

window.updateAction = (id) => {
    let newAmount = prompt("Enter new amount:");
    if (newAmount == null || newAmount == "" || newAmount != +newAmount)
        alert("Changes were not saved! Try again!");
    else {
        manager.updateAction(id, +newAmount);
        localStorage.setItem("myActions", JSON.stringify(manager.actions));
        showActionsInTable();
    }
};

window.deleteAction = (id) => {
    if (confirm("Are you sure?")) {
        manager.deleteAction(id);
        localStorage.setItem("myActions", JSON.stringify(manager.actions));
        showActionsInTable();
    }
};

window.optionCheck = () => {
    if (document.getElementById("type").value == "income") {
        document.getElementById("expenseSelect").style.display = "none";
        document.getElementById("incomeSelect").style.display = "block";
    } else if (document.getElementById("type").value == "expense") {
        document.getElementById("expenseSelect").style.display = "block";
        document.getElementById("incomeSelect").style.display = "none";
    } else {
        document.getElementById("expenseSelect").style.display = "none";
        document.getElementById("incomeSelect").style.display = "none";
    }
};