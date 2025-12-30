import fs from 'fs'
import {Transform} from 'stream'
import {pipeline} from 'stream/promises'
import streamJson from 'stream-json'
import stringerPkg from 'stream-json/Stringer.js'

const {parser} = streamJson
const {stringer} = stringerPkg

const replaceDogWithCat = async (inputFile: string, outputFile: string, limit: number) => {
  let totalReplacements = 0
  let isValue = false

  const valueTransformer = new Transform({
    objectMode: true,
    transform(token, encoding, callback) {
      // Track state, since stringChunk can be a key or value and we only want to replace values
      switch(token.name) {
        case 'startKey':
          isValue = false
          break
        case 'endKey':
          isValue = true
          break
        case 'startObject':
        case 'startArray':
        case 'endObject':
        case 'endArray':
          isValue = false
      }

      // Only transform if we are working with a value, totalReplacements is less than the limit,
      // we are working with the stringChunk of the value and the value is equal to dog
      if (
        isValue &&
        totalReplacements < limit &&
        token.name === 'stringChunk' &&
        token.value === 'dog'
      ) {
        token.value = 'cat'
        totalReplacements++
      }

      callback(null, token)
    }
  })

  try {
    await pipeline(
      fs.createReadStream(inputFile),
      parser(),
      valueTransformer,
      stringer(),
      fs.createWriteStream(outputFile)
    )
    console.log('Pipeline finished Successfully!')
    return Promise.resolve()
  } catch (error) {
    console.error(`Pipeline failed: ${error}`)
    return Promise.reject(error)
  }
}

export {
    replaceDogWithCat
}