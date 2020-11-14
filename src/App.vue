<template>
  <div class="container">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
      </header>
      <input
        type="text"
        class="new-todo"
        autofocus
        autocomplete="off"
        placeholder="What needs to be done?"
        v-model="newTodo"
        @keydown.enter="addTodo"
      />
      <section class="main">
        <div>
          <input type="checkbox" class="toggle-all" id="toggle-all" />
          <label for="toggle-all">Mark all as complete</label>
        </div>
        <TodoList :todos="filteredTodos" />
        <footer class="footer">
          <span class="todo-count">item left</span>
          <ul class="filters">
            <li v-for="filter in filtersList" :key="filter.value">
              <a
                href="#"
                :class="{ selected: visibility === filter.value }"
                @click.prevent="selectedFilter(filter.value)"
                >{{ filter.text }}</a
              >
            </li>
          </ul>
          <button class="clear-completed">Clear completed</button>
        </footer>
      </section>
    </section>
    <TodoFooter />
  </div>
</template>

<script>
import { useTodo } from './composables/useTodo'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'

export default {
  name: 'App',
  components: {
    TodoList,
    TodoFooter,
  },
  setup() {
    const {
      newTodo,
      editedTodo,
      visibility,
      filtersList,
      filteredTodos,
      addTodo,
      editTodo,
      removeTodo,
      selectedFilter,
    } = useTodo()

    return {
      newTodo,
      editedTodo,
      visibility,
      filtersList,
      filteredTodos,
      addTodo,
      editTodo,
      removeTodo,
      selectedFilter,
    }
  },
}
</script>
