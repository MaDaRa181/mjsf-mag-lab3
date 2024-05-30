<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  
  <div class="info">
    <h2>Інформація про мене</h2>
    <p>Спеціальність: Інженерія програмного забезпечення</p>
    <p>Курс: 3</p>
    <p>Група: 3ПР1</p>
    <p>ПІБ: Бондаренко Владислав Олегович</p>
  </div>

  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}

.info {
  margin-top: 20px;
  padding: 10px;
  border-top: 1px solid #ccc;
}

.info h2 {
  margin-bottom: 10px;
}

.info p {
  margin: 5px 0;
}
</style>
