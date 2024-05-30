<template>
  <ul class="list-group list-group-horizontal rounded-0 bg-transparent">
    <li class="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
      <div class="form-check">
        <input 
          class="form-check-input me-0" 
          type="checkbox" 
          :checked="task.completed" 
          @change="$emit('toggle-task', task.id)"
          aria-label="..."
        />
      </div>
    </li>
    <li class="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
      <p class="lead fw-normal mb-0">{{ task.text }}</p>
    </li>
    <li class="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
      <div v-if="task.dueDate" class="py-2 px-3 me-2 border border-warning rounded-3 d-flex align-items-center bg-light">
        <p class="small mb-0">
          <a href="#!" data-mdb-toggle="tooltip" title="Due on date">
          </a>
          {{ formatDate(task.dueDate) }}
        </p>
      </div>
    </li>
    <li class="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
      <div class="text-end text-muted">
        <p class="small mb-0">{{ formatDate(task.createdAt) }}</p>
      </div>
    </li>
    <li class="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
      <div class="d-flex flex-row justify-content-end mb-1">
        <a href="#!" class="text-danger" @click.prevent="$emit('delete-task', task.id)" data-mdb-toggle="tooltip" title="Delete todo">
          <i class="fas fa-trash-alt"></i>
        </a>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Task } from '../models/tasktTypes';

export default defineComponent({
  props: {
    task: {
      type: Object as () => Task,
      required: true
    }
  },
  methods: {
    formatDate(dateString: string | undefined) {
      if (!dateString) return '';
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', options);
    }
  }
});
</script>
