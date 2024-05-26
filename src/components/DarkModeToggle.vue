<!-- components/DarkModeToggle.vue -->
<template>
  <div class="flex items-center">
    <label for="darkModeToggle" class="flex items-center cursor-pointer">
      <div class="relative">
        <input
          type="checkbox"
          id="darkModeToggle"
          class="hidden"
          @change="toggleDarkMode"
        />
        <div
          class="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"
        ></div>
        <div
          class="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"
        ></div>
      </div>
      <!-- <div class="ml-3 text-gray-700 font-medium">Dark Mode</div> -->
    </label>
  </div>
</template>

<script>
import { useThemeStore } from "../stores/modules/theme";

export default {
  methods: {
    toggleDarkMode() {
      useThemeStore().toggleDarkMode();
    },
  },
};
</script>
<style>
.toggle__line {
  transition: background-color 0.3s;
}

input:checked + .toggle__line {
  background-color: #1a202c; /* Dark mode background color */
}

input:checked + .toggle__line + .toggle__dot {
  transform: translateX(100%);
}
</style>
