import express, { Application, Request, Response } from 'express'
import {replaceDogWithCat} from './libs/helperFunctions.js'


const app: Application = express()
const PORT: number = 3000
const MAX_REPLACEMENTS: number = 5

app.use(express.json())


app.post('/replaceDogWithCat', async (req: Request, res: Response) => {
	const files = req.body.files
	if (!files || !Array.isArray(files) || files.length < 1) {
		console.log('No files to process!')
		return res.status(400).send('No files to process!')
	}

	try {
		await Promise.all(files.map((inputFile: string) => {
			const outputFile: string = inputFile.replace('.json', '').concat('-output.json')
			return replaceDogWithCat(inputFile, outputFile, MAX_REPLACEMENTS)
		}))
		return res.status(200).send('Output file(s) successfully created!')
	} catch (error) {
		console.log(error)
		return res.status(500).send(error)
	}
})


app.listen(PORT, () => {
	console.log(`Server listening at http://localhost:${PORT}`)
})

export default app