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
          <label for="toggle-all" @click="toggleAll">Mark all as complete</label>
        </div>
        <ul class="todo-list">
          <li
            class="todo"
            v-for="todo in filteredTodos"
            :key="todo.id"
            :class="{
              completed: todo.completed,
              editing: todo.editing,
            }"
          >
            <div class="view">
              <input type="checkbox" class="toggle" v-model="todo.completed" />
              <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
              <button class="destroy" @click.prevent="removeTodo(todo.id)"></button>
            </div>
            <input
              type="text"
              class="edit"
              v-model="todo.title"
              v-focus
              @blur="doneEdit(todo)"
              @keyup.enter="doneEdit(todo)"
              @keyup.esc="cancelEdit(todo)"
            />
          </li>
        </ul>

        <footer class="footer">
          <span class="todo-count" v-if="todos.length">{{ remaining }} item left</span>
          <ul class="filters">
            <li v-for="filter in filtersList" :key="filter.value">
              <a
                :href="`#${filter.value}`"
                :class="{ selected: visibility === filter.value }"
                @click.prevent="selectedFilter(filter.value)"
                >{{ filter.text }}</a
              >
            </li>
          </ul>
          <button class="clear-completed" @click.prevent="clearCompleted" v-show="todos.length > remaining">
            Clear completed
          </button>
        </footer>
      </section>
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>Written by <a href="https://dangthanh.org">Dang Van Thanh</a></p>
      <p>Part of <a href="https://todomvc.com">TodoMVC</a></p>
    </footer>
  </div>
</template>

<script setup>
import { useTodo } from './composables/useTodo'

const {
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
} = useTodo()
</script>
