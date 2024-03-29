import { ref, watch, computed } from 'vue'
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
    all: (todos) => todos.value,
    active: (todos) => todos.value.filter((todo) => !todo.completed),
    completed: (todos) => todos.value.filter((todo) => todo.completed),
  }

  const filtersList = [
    { value: 'all', text: 'All' },
    { value: 'active', text: 'Active' },
    { value: 'completed', text: 'Completed' },
  ]

  const newTodo = ref('')
  const todos = ref(store.fetch())
  const visibility = ref('all')
  const filteredTodos = computed(() => filters[visibility.value](todos))
  const remaining = computed(() => filters['active'](todos).length)

  watch(
    () => [...todos.value],
    (newTodos) => {
      store.save(newTodos)
    },
  )

  const addTodo = () => {
    if (!newTodo.value) {
      return
    }
    todos.value.push({
      id: uuid(),
      title: newTodo.value,
      completed: false,
      editing: false,
    })

    newTodo.value = ''
  }

  const editTodo = (todo) => {
    todo.editing = true
  }

  const removeTodo = (todoId) => {
    const todoIndex = todos.value.findIndex((t) => t.id === todoId)
    if (todoIndex < 0) return
    todos.value.splice(todoIndex, 1)
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
    todos.value = filters['active'](todos)
  }

  const toggleAll = () => {
    const isAll = todos.value.filter((todo) => todo.completed).length
    todos.value = todos.value.map((todo) => {
      todo.completed = !isAll
      return todo
    })
  }

  const toggleTodo = (todo) => {
    todos.value = todos.value.map((t) => {
      if (t.id === todo.id) {
        t.completed = !todo.completed
      }

      return t
    })
  }

  return {
    newTodo,
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
    toggleTodo,
  }
}
