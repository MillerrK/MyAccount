export default class ActionManager {
    constructor() {
        this.actions = []
    }

    get(propName) {
        return this[propName];
    }

    set(propName, value) {
        this[propName] = value;
    }

    addAction(action) {
        this.actions.push(action);
        this.calcBalance();
    }

    deleteAction(id) {
        for (let i in this.actions) {
            if (id == this.actions[i].id) this.actions.splice(i, 1);
        }
        this.calcBalance();
    }

    updateAction(id, newAmount) {
        let indexToUpdate = this.actions.findIndex((action) => action.id == id);
        this.actions[indexToUpdate].amount = this.actions[indexToUpdate].type == "expense" ? -newAmount : newAmount;

        this.calcBalance();
    }

    calcBalance() {
        let sum = 0;
        for (let action of this.actions) {
            sum += action.amount;
        }
        document.getElementById("balanceAlert").innerText = `Balance: ${sum}`;
    }
}