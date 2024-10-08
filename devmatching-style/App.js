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
        footer.setState(nextState.todolist)
        main.setState(nextState)
    }

    const header = new Header({
        $target,
        onAdd: (todo) => {
            if(this.state.todolist.map(todo => todo.text).includes(todo.text)) return
            this.setState({
                ...this.state,
                todolist: [...this.state.todolist, todo]
            })
        }
    })

    const main = new Main({
        $target, initialState: this.state,
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
        },
        onEdit: (prev, next) => {
            this.setState({
                ...this.state,
                todolist: this.state.todolist.map(todo => {
                    if(todo.text === prev) {
                        todo.text = next
                    }
                    return todo
                })
            })
        }
    })

    const footer = new Footer({
        $target,
        initialState: this.state.todolist,
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