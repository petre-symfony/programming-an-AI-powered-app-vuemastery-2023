import { defineStore } from 'pinia'
import { ref } from "vue"
import {response} from "express"

export const useTextChatStore = defineStore('textChat', () => {
  const text = ref('');
  const question = ref('');
  const prompt = ref([])
  const gptResponse = ref('')

  function createPrompt() {
    const instructions = {
      role: 'system',
      content: 'You will answer a question about the following text'
    }

    const textToAnalyze = { role: 'user', content: text.value }
    const chatQuestion = { role: 'user', content: question.value }

    prompt.value.push(instructions)
    prompt.value.push(textToAnalyze)
    prompt.value.push(chatQuestion)
  }

  function sendPrompt() {
    if (text.value.length === 0) {
      alert('You have not added any text to analyze')
    } else {
      fetch('http://localhost:3000/chat', {
        method: 'POST',
        body: JSON.stringify({
          messages: prompt.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((data) => {
          gptResponse.value = data.message.content
        })
    }
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