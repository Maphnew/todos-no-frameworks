import Footer from "./Footer.js";
import Header from "./Header.js";
import Main from "./Main.js";
import { State, Todo } from "./types.js";

export default class App {
    private state: State
    private main: Main
    private footer: Footer
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

        this.main = new Main({
            $target, initialState: this.state,
            onDelete: (text: string) => {
                this.setState({
                    ...this.state,
                    todoList: this.state.todoList.filter((todo: Todo) => todo.text !== text)
                })
            },
            onCheck: (text) => {
                this.setState({
                    ...this.state,
                    todoList: this.state.todoList.map((todo: Todo) => {
                        if(todo.text === text) {
                            todo.completed = !todo.completed
                        }
                        return todo
                    })
                })
            },
            onToggleAll: () => {
                this.setState({
                    ...this.state,
                    toggleAll: !this.state.toggleAll,
                    todoList: this.state.todoList.map((todo: Todo) => {
                        todo.completed = !this.state.toggleAll === true ? true : false
                        return todo
                    })
                })
            },
            onEdit: (prevText: string, nextText: string) => {
                this.setState({
                    ...this.state,
                    todoList: this.state.todoList.map((todo: Todo) => {
                        if(todo.text === prevText) {
                            todo.text = nextText
                        }
                        return todo
                    })
                })
            }
        })
        this.footer = new Footer({
            $target,
            initialState: this.state.todoList,
            onClear: () => {
                this.setState({
                    ...this.state,
                    todoList: this.state.todoList.filter((todo: Todo) => todo.completed === false)
                })
            },
            onFilter: (filter: State['filter']) => {
                this.setState({
                    ...this.state,
                    filter: filter
                })
            }
        })
    }
    setState(nextState: State) {
        this.state = nextState
        this.main.setState(nextState)
        this.footer.setState(nextState.todoList)
    }
}