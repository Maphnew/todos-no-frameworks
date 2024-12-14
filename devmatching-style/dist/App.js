export default class App {
    constructor($target) {
        this.state = {
            todoList: [],
            toggleAll: false,
            filter: 'All'
        };
    }
    setState(nextState) {
        this.state = nextState;
    }
}
