import { defineStore } from 'pinia'
import {ref} from "vue";

export const useAudioChatStore = defineStore('audioChat', () => {
  const file = ref({})
  const transcript = ref('')

  function transcribeFile() {
    const formData = new FormData()
    formData.append('file', file.value.value)

    fetch('http://localhost:3080/dg-transcription', {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
        transcript.value = data.transcript.results.channels[0].alternatives[0].transcript
      })
  }

  return {
    file,
    transcript,
    transcribeFile
  }
})