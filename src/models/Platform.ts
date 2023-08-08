import { Document, Schema, model, models } from "mongoose";

interface PlatformDocument extends Document {
    icon_name: string,
    name: string,
    regex: string,
    background_color: string
}

const PlatformSchema = new Schema<PlatformDocument>({
    icon_name: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    regex: {
        type: String,
        required: true
    },
    background_color: {
        type: String,
        required: true
    }
})




const Platform = models.Platform || model("Platform", PlatformSchema)

export default Platform