import { defineStore } from 'pinia'
import { ref } from "vue";

export const useTextChatStore = defineStore('textChat', () => {
  const text = ref('');
  const question = ref('');
  const prompt = ref([])
  const gptResponse = ref('')

  function createPrompt() {

  }

  function sendPrompt() {

  }

  function clearChat() {

  }

  return {
    text,
    question,
    prompt,
    gptResponse,
    createPrompt,
    sendPrompt,
    clearChat
  }
})