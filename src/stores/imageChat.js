import { defineStore } from 'pinia'
import { ref } from "vue";

export const useImageChatStore = defineStore('imageChat', () => {
  const imageURL= ref('')
  const miniGPTResponse = ref('')
  const prompt = ref([])
  const question = ref('')
  const questionAnswerList = ref([])

  function createPrompt() {
    fetch('http://localhost:3000/minigpt', {
      method: 'POST',
      body: JSON.stringify({
        image: imageURL.value,
        prompt: question.value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        miniGPTResponse.value = data.message
        questionAnswerList.value.push({
          question: question.value,
          answer: data.message
        })
        question.value = ''
      })
  }

  function clearChat() {
    imageURL.value = {}
    miniGPTResponse.value = ''
    prompt.value = []
    question.value = ''
    questionAnswerList.value = []
  }

  return {
    imageURL,
    miniGPTResponse,
    prompt,
    question,
    questionAnswerList,
    createPrompt,
    clearChat
  }
})