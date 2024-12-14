import type {Todo} from './types'

type HeaderContext = {
    $target: HTMLElement
    onAdd: (todo: Todo) => any
}

export default class Header {
    private $element: HTMLHeadElement
    constructor({ $target, onAdd }: HeaderContext) {
        this.$element = document.createElement('header')
        this.$element.className = 'header'

        $target.appendChild(this.$element)

        this.render()

        window.addEventListener('keyup', (e) => {
            if(e.key === 'Enter') {
                if(document.activeElement?.classList.contains('new-todo')) {
                    if((document.querySelector('.new-todo')! as HTMLInputElement).value === '') {
                        return
                    }
                    onAdd({
                        text: (document.querySelector('.new-todo')! as HTMLInputElement).value,
                        completed: false
                    })
                    (document.querySelector('.new-todo')! as HTMLInputElement).value = ''
                }
            }
        })
    }

    render() {
        this.$element.innerHTML = `
            <h1>todos</h1>
            <input class="new-todo" placeholder="What needs to be done?" autofocus>
        `
    }
}