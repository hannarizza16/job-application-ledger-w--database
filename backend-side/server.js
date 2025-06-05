    import dotenv from 'dotenv'
    dotenv.config();  

    import express from 'express'
    import cors from 'cors'
    import connectionDB from './db/connectionDb.js';
    import userRouter from './routes/userRouter.js';
    import formRouter from './routes/formRouter.js';


    const app = express();
    const PORT = process.env.PORT

    //connection to database
    connectionDB();

    app.use(express.json()) // converts to json
    app.use(cors())
    //  app.use(cors({
    //     origin: 'http://localhost:5173',
    //     credentials: true
    // }))  

    app.get('/', (req, res) => {
        res.send('beginning my job application ledger')
    })

    app.use('/users', userRouter)
    app.use('/input', formRouter)

    app.listen(PORT, () => {
        console.log(`server is running on http://localhost:${PORT}`)
    })

