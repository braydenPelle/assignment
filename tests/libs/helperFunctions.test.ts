import fs from 'fs'
import {it, expect, describe} from 'vitest'
import {replaceDogWithCat} from '../../src/libs/helperFunctions.js'


describe('replaceDogWithCat()', () => {
  it('Replace all occurrences of dog with cat when occurrences are less than limit', async () => {
    const inputFile = 'files/test.json'
    const outputFile = 'files/test-output.json'

    await replaceDogWithCat(inputFile, outputFile, 5)

    // Check that output file was created
    const exists = fs.existsSync(outputFile)
    expect(exists).toBe(true)

    // Check that data in output file is correct
    const fileData = fs.readFileSync(outputFile, 'utf8')
    expect(fileData).toStrictEqual('{"dog":"1","two":"cat","three":"3"}')
  })

  it('Replace only first 5 occurrences of dog with cat when occurrences are greater than limit', async () => {
    const inputFile = 'files/test2.json'
    const outputFile = 'files/test2-output.json'

    await replaceDogWithCat(inputFile, outputFile, 5)

    // Check that output file exists
    const exists = fs.existsSync(outputFile)
    expect(exists).toBe(true)

    // Check that data in output file is correct
    const fileData = fs.readFileSync(outputFile, 'utf8')
    expect(fileData).toStrictEqual('{"one":"1","two":"cat","three":"3","four":"","five":"cat","six":"cat","seven":"cat","eight":"cat","nine":"dog","ten":"dog"}')
  })
})