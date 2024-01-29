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
        <div v-for="(chat, i) in audioChatStore.questionAnswerList" :key="chat.question">
          <p class="font-bold">Question {{ i + 1 }}: {{ chat.question }}</p>
          <p class="block w-full rounded-md border-0 bg-green-900 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:p-4 sm:text-sm sm:leading-6 text-sm my-4">{{ chat.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>