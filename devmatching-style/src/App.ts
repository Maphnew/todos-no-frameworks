import Header from "./Header.js";
import { State, Todo } from "./types.js";

export default class App {
    private state: State
    constructor($target: HTMLElement) {
        this.state = {
            todoList: [],
            toggleAll: false,
            filter: 'All'
        }

        new Header({
            $target,
            onAdd: (todo: Todo) => {
                if(this.state.todoList.map(todo => todo.text).includes(todo.text)) return
                this.setState({
                    ...this.state,
                    todoList: [...this.state.todoList, todo]
                })
            }
        })
    }
    setState(nextState: State) {
        this.state = nextState
        
    }
}