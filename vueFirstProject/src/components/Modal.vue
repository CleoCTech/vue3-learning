<script setup>
 defineProps({
    show: Boolean,
 });
</script>

<template>
    <div v-if="show" class="modal-mask">
    <div class="modal-container">
      <div>
        <slot>default body</slot>
      </div>

      <footer class="modal-footer">
        <slot name="footer">
          <button @click="$emit('close')">Close</button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<style>
.modal-mask{
    position: fixed;
    background: rgba(0,0,0,.6);
    inset: 0;
    display: grid;
    place-items: center;
}
.modal-container{
    background: white;
    padding: 1rem;
    color: black;
    width: 800px;
    max-width: 500px;
    border-radius: 7px;
}

.modal-footer {
  border-top: 1px solid #ddd;
  margin-top: 1rem;
  padding-top: 0.5rem;
  font-size: .8rem;
}
.modal-footer button {
  background: #ddd;
  padding: .25rem .75rem;
  border-radius: 20px;
}
.modal-footer button:hover {
  background: #c8c8c8;
}

</style>