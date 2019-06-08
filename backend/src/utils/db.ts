import mongoose from 'mongoose'

async function db(): Promise<mongoose.Connection> {
  return mongoose.createConnection(process.env.MONGODB_URI, {
    /*
    Buffering allows Mongoose to queue up operations if MongoDB
    gets disconnected, and to send them upon reconnection.
    With serverless, it is better to fail fast when not connected.
    */
    bufferCommands: false,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
}

export default db
