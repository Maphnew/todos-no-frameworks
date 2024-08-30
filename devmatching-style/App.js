import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'

export default function App({ $target }) {
    this.state = {
        todolist: [],
        toggleAll: false,
        filter: 'All' // 'All', 'Active', 'Completed'
    }

    this.setState = (nextState) => {
        this.state = nextState
        footer.setState(nextState)
        main.setState(nextState)
    }

    const header = new Header({
        $target
    })

    const main = new Main({
        $target, initialState: this.state,
        onAdd: (todo) => {
            this.setState({
                ...this.state,
                todolist: [...this.state.todolist, todo]
            })
        },
        onDelete: (text) => {
            this.setState({
                ...this.state,
                todolist: this.state.todolist.filter(todo => todo.text !== text)
            })
        },
        onCheck: (text) => {
            this.setState({
                ...this.state,
                todolist: this.state.todolist.map(todo => {
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
                todolist: this.state.todolist.map(todo => {
                    todo.completed = !this.state.toggleAll === true ? true : false
                    return todo
                })
            })
        }
    })

    const footer = new Footer({
        $target,
        initialState: this.state,
        onClear: () => {
            this.setState({
                ...this.state,
                todolist: this.state.todolist.filter(todo => todo.completed === false)
            })
        },
        onFilter: (filter) => {
            this.setState({
                ...this.state,
                filter: filter
            })
        }
    })
}