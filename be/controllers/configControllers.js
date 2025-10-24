import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
    quantityRange : [Number],
    qualityRange : [Number],
    priceStops: [Number],
    updatedAt: {type: Date, default: Date.now},
})

const Settings = mongoose.model("Settings", settingsSchema);

export const getConfig = async (req,res) =>{
    try {

        const config = await Settings.findOne();
        res.json(config);

        
    } catch (error) {
       res.status(500).json({message:"Error fetching config", error: error.message}); 
    }
}