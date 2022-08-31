import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const connection_string = process.env.CONNECTION_STRING

const connectToMongoDB = () => {
    mongoose.connect(connection_string)
    .then(()=> {
        console.log('connected to mongoDB')
    })
    .catch((err)=> {
        console.log(err)
    })
}

export default connectToMongoDB