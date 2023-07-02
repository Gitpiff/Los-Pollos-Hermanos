// const { urlencoded } = require("express")
const mongoose = require("mongoose")
const Schema = mongoose.Schema


//Menu Blueprint
const menuSchema = new Schema({
    image: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    summary: {
        type: String
    },
    ingredients: {
        type: Array
    },
    steps: {
        type: Array
    }
})

module.exports = mongoose.model("Menu", menuSchema)