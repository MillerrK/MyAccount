export default class Action {
    constructor(type, description, comments, amount, date) {
        this.id = Math.floor(Math.random() * 1001);
        this.type = type;
        this.description = description;
        this.comments = comments;
        let dateParts = date.split("-");
        this.date = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
        this.amount = type == "expense" ? -amount : amount;
    }

    get(propName) {
        return this[propName];
    }

    set(propName, value) {
        this[propName] = value;
    }

}