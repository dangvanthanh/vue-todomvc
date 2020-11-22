import { ref, reactive, computed } from 'vue'
import store from '../store'

export const useTodo = () => {
  const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  const filters = {
    all: (todos) => todos,
    active: (todos) => todos.filter((todo) => !todo.completed),
    completed: (todos) => todos.filter((todo) => todo.completed),
  }

  const filtersList = [
    { value: 'all', text: 'All' },
    { value: 'active', text: 'Active' },
    { value: 'completed', text: 'Completed' },
  ]

  let newTodo = ref('')
  let newEditTodo = ref(null)
  let todos = reactive(store.fetch())
  let visibility = ref('all')
  let filteredTodos = computed(() => filters[visibility.value](todos))
  let remaining = computed(() => filters['active'](todos).length)

  const addTodo = () => {
    if (!newTodo.value) return
    todos.push({
      id: uuid(),
      title: newTodo.value,
      completed: false,
      editing: false,
    })

    newTodo.value = ''
  }

  const editTodo = (todo) => {
    todo.editing = true
    newEditTodo.value.focus()
  }

  const removeTodo = (todoId) => {
    const todoIndex = todos.findIndex((t) => t.id === todoId)
    if (todoIndex < 0) return
    todos.splice(todoIndex, 1)
  }

  const doneEdit = (todo) => {
    todo.editing = false
    todo.title = todo.title.trim()

    if (!todo.title) {
      removeTodo(todo.id)
    }
  }

  const cancelEdit = (todo) => (todo.editing = false)

  const selectedFilter = (filter) => (visibility.value = filter)

  const clearCompleted = () => {
    todos = filters['active'](todos)
  }

  const toggleAll = () => {
    const isAll = todos.filter((todo) => todo.completed).length

    todos = todos.map((todo) => {
      todo.completed = !isAll
      return todo
    })
  }

  return {
    newTodo,
    newEditTodo,
    todos,
    visibility,
    filtersList,
    filteredTodos,
    remaining,
    addTodo,
    editTodo,
    removeTodo,
    doneEdit,
    cancelEdit,
    selectedFilter,
    clearCompleted,
    toggleAll,
  }
}
