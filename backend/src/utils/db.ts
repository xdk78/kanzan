export const dbConfing = {
  // Buffering means mongoose will queue up operations if it gets
  // disconnected from MongoDB and send them when it reconnects.
  // With serverless, better to fail fast if not connected.
  bufferCommands: false,
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
}
