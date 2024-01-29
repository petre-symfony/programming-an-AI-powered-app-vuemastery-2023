<script setup>
  import { useFileDialog } from "@vueuse/core"
  
  const { files, open, reset, onChange } = useFileDialog()

  function resetFile() {
    reset()
  }
</script>

<template>
  <div class="flex flex-col h-36">
    <div class="flex">
      <button
          type="button"
          :disabled="!files"
          @click="open()"
          class="button button-primary w-36 mr-2">
        Choose File
      </button>
      <button
          type="button"
          name="file"
          :disabled="!files"
          @click="resetFile()"
          class="button-secondary w-36"
      >
        Reset
      </button>
    </div>

    <div class="mt-6" v-if="files">
      <li
          class="list-none font-semibold my-2 text-purple-300"
          v-for="file of files"
          :key="file.name"
      >
        {{ file.name }}
      </li>
    </div>
  </div>
</template>