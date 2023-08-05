import mongoose from "mongoose"

/**
 * Establishes a connection to the MongoDB database using the provided URI.
 * @returns {Promise<void>} A promise that resolves once the connection is successful, or rejects on error.
 */
const connectMongoDB = async () => {
  
  try {
    await mongoose.connect(process.env.DATABASE_URL as string)
    console.log("Connected to MongoDB.")
  } 
  
  catch (error) {
    console.error("Error connecting to MongoDB:", error)
  }
  
}

export default connectMongoDB
