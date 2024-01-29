const envConfig = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const multer = require('multer')

const upload = multer()
const port = 3000
const app = express()
app.use(cors())
app.use(bodyParser.json())

const { Configuration, OpenAIApi } = require('openai')
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

app.post('/chat', async (req, res) => {
  const messages = req.body.messages

  try {
    if (messages == null) {
      throw new Error('We have a ptoblem - no prompt was provided')
    }

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages
    })

    const completion = response.data.choices[0].message

    return res.status(200).json({
      success: true,
      message: completion
    })
  } catch (error) {
    console.log(error.message)
  }
})

const { encode } = require('gpt-3-encoder')

app.post('/tokenize', async (req, res) => {
  const str = req.body.stringToTokenize

  try{
    if (str == null) {
      throw new Error('No string was provided');
    }
    const encoded = encode(str)
    const length = encoded.length

    return res.status(200).json({
      success: true,
      tokens: length
    })
  } catch(error) {
    console.log(error.message)
  }
})

const { Deepgram } = require('@deepgram/sdk')
const deepgram = new Deepgram(process.env.DG_API)

app.post('/dg-transcription', upload.single('file'), async (req, res) => {
  try {
    const dgResponse = await deepgram.transcription.preRecorded(
      {
        buffer: req.file.buffer,
        mimetype: req.file.mimetype
      },
      {
        punctuate: true,
        model: 'nova'
      }
    )
    res.send({transcript: dgResponse})
  } catch (e) {
    console.log('error', e)
  }
})

const { OpenAI } = require('langchain/llms/openai')
const { BufferMemory } = require('langchain/memory')
const { ConversationChain } = require('langchain/chains')

const model = new OpenAI({})
const memory = new BufferMemory()
const chain = new ConversationChain({ llm: model, memory: memory })
let chainNum = 0

app.post('/chain', async (req, res) => {
  chainNum++
  const messages = req.body.messages

  if (chainNum === 1) {
    const firstResponse = await chain.call({ input: messages[0].content })
    console.log(firstResponse)
    const secondResponse = await chain.call({ input: messages[1].content })
    console.log(secondResponse)
    const thirdResponse = await chain.call({ input: messages[2].content })

    return res.status(200).json({
      success: true,
      message: thirdResponse.response
    })
  } else {
    const nextResponse = await chain.call({ input: messages[2].content })
    console.log(nextResponse)
    return res.status(200).json({
      success: true,
      message: nextResponse.response
    })
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))