<template>
  <div id="app">
    <section class="vh-100">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col">
            <div class="card" id="list1" style="border-radius: .75rem; background-color: #eff1f2;">
              <div class="card-body py-4 px-4 px-md-5">
                <p class="h1 text-center mt-3 mb-4 pb-3 text-primary">
                  <u>My Todo-s</u>
                </p>
                <TaskList />
                <hr class="my-4">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import TaskList from './components/TaskList.vue';

export default {
  components: {
    TaskList
  }
};
</script>
