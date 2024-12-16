import Header from "./Header.js";
export default class App {
    constructor($target) {
        this.state = {
            todoList: [],
            toggleAll: false,
            filter: 'All'
        };
        new Header({
            $target,
            onAdd: (todo) => {
                if (this.state.todoList.map(todo => todo.text).includes(todo.text))
                    return;
                this.setState({
                    ...this.state,
                    todoList: [...this.state.todoList, todo]
                });
            }
        });
    }
    setState(nextState) {
        this.state = nextState;
    }
}
