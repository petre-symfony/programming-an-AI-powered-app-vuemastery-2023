<script setup>
  import { useAudioChatStore } from "@/stores/audioChat.js"

  const audioChatStore = useAudioChatStore()
</script>

<template>
  <div>
    <div class="flex rounded-md mt-4">
      <div class="relative flex flex-col flex-grow items-strech">
        <div>
          <div class="flex shadow-sm mb-4"></div>
          <!-- input and submit button -->
          <input
              v-model="audioChatStore.question"
              class="question-input"
              placeholder="Send a message"
          />
          <button
              type="button"
              @click="audioChatStore.createPrompt()"
              class="chat-button group relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 text-sm font-semibold bg-[#1a1a21] text-green-500 ring-1 ring-inset ring-gray-300"
          >
            <span class="text-green-100 group-hover:bg-[#42b983]">submit</span>
          </button>
        </div>
        <!-- Chat UI -->
      </div>
    </div>
  </div>
</template>