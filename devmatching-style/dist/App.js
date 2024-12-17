import Footer from "./Footer.js";
import Header from "./Header.js";
import Main from "./Main.js";
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
        this.main = new Main({
            $target, initialState: this.state,
            onDelete: (text) => {
                this.setState({
                    ...this.state,
                    todoList: this.state.todoList.filter((todo) => todo.text !== text)
                });
            },
            onCheck: (text) => {
                this.setState({
                    ...this.state,
                    todoList: this.state.todoList.map((todo) => {
                        if (todo.text === text) {
                            todo.completed = !todo.completed;
                        }
                        return todo;
                    })
                });
            },
            onToggleAll: () => {
                this.setState({
                    ...this.state,
                    toggleAll: !this.state.toggleAll,
                    todoList: this.state.todoList.map((todo) => {
                        todo.completed = !this.state.toggleAll === true ? true : false;
                        return todo;
                    })
                });
            },
            onEdit: (prevText, nextText) => {
                this.setState({
                    ...this.state,
                    todoList: this.state.todoList.map((todo) => {
                        if (todo.text === prevText) {
                            todo.text = nextText;
                        }
                        return todo;
                    })
                });
            }
        });
        this.footer = new Footer({
            $target,
            initialState: this.state.todoList,
            onClear: () => {
                this.setState({
                    ...this.state,
                    todoList: this.state.todoList.filter((todo) => todo.completed === false)
                });
            },
            onFilter: (filter) => {
                this.setState({
                    ...this.state,
                    filter: filter
                });
            }
        });
    }
    setState(nextState) {
        this.state = nextState;
        this.main.setState(nextState);
        this.footer.setState(nextState.todoList);
    }
}
