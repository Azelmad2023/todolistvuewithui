<script setup>
const props = defineProps({
  type: {
    type: String,
    validator: (value) => {
      return ["primary", "ghost", "dashed", "link", "text", "default"].includes(value);
    },
    default: "default",
  },
});

const [model, modifiers] = defineModel({
  set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
  },
});
</script>

<template>
  <input
    type="text"
    :class="['input-text', props.type]"
    v-model="model"
    class="flex-grow p-2 border rounded"
  />
</template>

<style scoped>
.input-text.primary {
  background-color: #007bff;
  color: white;
}
.input-text.ghost {
  border: 1px solid #ddd;
  background: none;
}
.input-text.dashed {
  border: 1px dashed #007bff;
}
.input-text.link {
  color: #007bff;
  text-decoration: underline;
}
.input-text.text {
  color: black;
}
.input-text.default {
  background-color: red;
  color: black;
}
</style>


<!-- <script setup>
const [model, modifiers] = defineModel({
  set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})
</script>
<template>
     <input
        type="text"
        class="flex-grow p-2 border rounded"
        v-model="model"
      />
</template> -->