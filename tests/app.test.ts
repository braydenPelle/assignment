import fs from 'fs'
import {describe, it, expect} from 'vitest'
import request from 'supertest'
import app from '../src/app'

describe('/replaceDogWithCat', () => {
  describe('POST', () => {
    it('should return status 200', async () => {
      const inputFile = 'files/test3.json'
      const outputFile = 'files/test3-output.json'

      const response = await request(app)
        .post('/replaceDogWithCat')
        .send({files: [inputFile]})
        .set('Accept', 'application/json')
        .expect(200)

      // Check that output file exists
      const exists = fs.existsSync(outputFile)
      expect(exists).toBe(true)
    
      // Check that data in output file is correct
      const fileData = fs.readFileSync(outputFile, 'utf8')
      expect(fileData).toStrictEqual('{"dog":"1","two":"cat","three":"3","four":"cat","five":"cat","six":"cat","seven":"cat"}')
    })
  })
})