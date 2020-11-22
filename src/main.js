import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import 'todomvc-common/base.css'

const app = createApp(App)

app.directive('focus', {
  updated(el) {
    el.focus();
  }
})

app.mount('#app')
