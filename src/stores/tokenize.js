import { defineStore } from 'pinia'
import {ref} from "vue";

export const useTokenizeStore = defineStore('tokenize', () => {
  const tokenLength = ref(0)

  function checkToken(val) {
    fetch('http://localhost:3000/tokenize', {
      method: 'POST',
      body: JSON.stringify({
        stringToTokenize: val
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        tokenLength.value = data.tokens
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return {
    checkToken,
    tokenLength
  }
})