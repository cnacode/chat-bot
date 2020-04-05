import { json, urlencoded } from 'body-parser'
import { config } from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'

export default function (app: Application) {
    // Create and set up the express application instance
    app.use(json()) // json bodyparser
    app.use(urlencoded({ extended: true })) // json bodyparser
    app.use(cors()) // cors package for cors policies
    app.use(fileUpload())
}
