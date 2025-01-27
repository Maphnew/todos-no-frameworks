import todosView from './todos.js'
import countView from './count.js'
import filtersView from './filters.js'

export default (targetElement, state) => {
    const element = targetElement.cloneNode(true)
    // Node: cloneNode(deep)
    // cloneNode: 노드 복제, 인라인 이벤트 복제, addEventListener 또는 onclick으로 추가된 이벤트 핸들러는 복제 안됨
    // depp: true일 경우 subtree 모두 복제, false는 해당 노드만 복제
    const list = element.querySelector('.todo-list')
    const count = element.querySelector('.todo-count')
    const filters = element.querySelector('.filters')

    list.replaceWith(todosView(list, state))
    count.replaceWith(countView(count, state))
    filters.replaceWith(filtersView(filters, state))

    return element
}