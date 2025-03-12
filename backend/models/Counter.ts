import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    index: {
        type: Number,
        default: 0
    }
})

const Counter = mongoose.model("Counter", CounterSchema);
export default Counter;