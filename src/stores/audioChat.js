import { defineStore } from 'pinia'
import {ref} from "vue";

export const useAudioChatStore = defineStore('audioChat', () => {
  const file = ref({})
  const transcript = ref('')

  function transcribeFile() {
    
  }

  return {
    file,
    transcript
  }
})