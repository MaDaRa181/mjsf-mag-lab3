<template>
  <div>
    <AddTask @add-task="addTask" />
    <hr class="my-4">
    <div class="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
      <p class="small mb-0 me-2 text-muted">Filter</p>
      <select class="select" v-model="filter">
        <option value="1">All</option>
        <option value="2">Completed</option>
        <option value="3">Active</option>
        <option value="4">Has due date</option>
      </select>
      <p class="small mb-0 ms-4 me-2 text-muted">Sort</p>
      <select class="select" v-model="sort">
        <option value="1">Added date</option>
        <option value="2">Due date</option>
      </select>
      <a href="#!" style="color: #23af89;" @click="toggleSortDirection" data-mdb-toggle="tooltip" title="Ascending">
        <i :class="sortDirectionClass"></i>
      </a>
    </div>
    <div v-for="task in sortedTasks" :key="task.id">
      <TaskItem 
        :task="task" 
        @toggle-task="toggleTask"
        @delete-task="deleteTask"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import AddTask from './AddTask.vue';
import TaskItem from './TaskItem.vue';
import { Task } from '../models/taskTypes';
import { LocalStorageRepository } from '../repositories/localStorageRepository';
import { IRepository } from '../repositories/taskRepository';

export default defineComponent({
  components: {
    AddTask,
    TaskItem
  },
  setup() {
    const repository: IRepository<Task> = new LocalStorageRepository('tasks');
    const tasks = ref<Task[]>([]);
    const filter = ref(localStorage.getItem('taskFilter') || '1');
    const sort = ref(localStorage.getItem('taskSort') || '1');
    const sortDirection = ref(localStorage.getItem('taskSortDirection') || 'desc');

    onMounted(async () => {
      tasks.value = await repository.getAll();
    });

    watch(filter, (newValue) => {
      localStorage.setItem('taskFilter', newValue);
    });

    watch(sort, (newValue) => {
      localStorage.setItem('taskSort', newValue);
    });

    watch(sortDirection, (newValue) => {
      localStorage.setItem('taskSortDirection', newValue);
    });

    const sortedTasks = computed(() => {
      let sortedTasks = [...tasks.value];
      if (sort.value === '1') {
        sortedTasks.sort((a, b) => {
          if (sortDirection.value === 'asc') {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          } else {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          }
        });
      } else if (sort.value === '2') {
        sortedTasks.sort((a, b) => {
          if (sortDirection.value === 'asc') {
            return new Date(a.dueDate || '9999-12-31').getTime() - new Date(b.dueDate || '9999-12-31').getTime();
          } else {
            return new Date(b.dueDate || '9999-12-31').getTime() - new Date(a.dueDate || '9999-12-31').getTime();
          }
        });
      }
      if (filter.value === '2') {
        sortedTasks = sortedTasks.filter(task => task.completed);
      } else if (filter.value === '3') {
        sortedTasks = sortedTasks.filter(task => !task.completed);
      } else if (filter.value === '4') {
        sortedTasks = sortedTasks.filter(task => task.dueDate);
      }
      return sortedTasks;
    });

    const sortDirectionClass = computed(() => {
      return sortDirection.value === 'asc' ? 'fas fa-sort-amount-down-alt ms-2' : 'fas fa-sort-amount-up-alt ms-2';
    });

    const addTask = async (newTask: Task) => {
      newTask.id = tasks.value.length ? Math.max(...tasks.value.map(t => t.id)) + 1 : 1;
      await repository.create(newTask);
      tasks.value = await repository.getAll();
    };

    const toggleTask = async (id: number) => {
      const task = tasks.value.find(task => task.id === id);
      if (task) {
        task.completed = !task.completed;
        await repository.update(task);
        tasks.value = await repository.getAll();
      }
    };

    const deleteTask = async (id: number) => {
      await repository.delete(id);
      tasks.value = await repository.getAll();
    };

    const toggleSortDirection = () => {
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    };

    return {
      tasks,
      filter,
      sort,
      sortDirection,
      sortedTasks,
      sortDirectionClass,
      addTask,
      toggleTask,
      deleteTask,
      toggleSortDirection
    };
  }
});
</script>
