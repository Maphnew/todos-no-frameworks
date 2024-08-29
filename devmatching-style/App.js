import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'

export default function App({ $target }) {
    this.state = {
        todolist: []
    }

    this.setState = (nextState) => {
        this.state = nextState
        footer.setState(nextState)
    }

    const header = new Header({
        $target
    })

    const main = new Main({
        $target, initialState: this.state,
        onAdd: (todo) => {
            const todolist = [...this.state.todolist, todo]
            this.setState({
                ...this.state,
                todolist
            })
        }
    })

    const footer = new Footer({
        $target,
        initialState: this.state
    })
}