import mongoose from "mongoose";

let articleSchema = mongoose.Schema({
    title: String,
    description: String,
    category: String,
    date: Date,
    comments: [
        {
            pseudo: String,
            comment: String, 
            date: Date
        }
    ],
    images: [
        {
            src: String,
            alt: String
        }
    ]
},
{
    timestamps: true
})



let Article = mongoose.model("Article", articleSchema)

export default Article