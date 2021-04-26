const mongoose=require('mongoose')
const eventSchema = new mongoose.Schema({
    event_name:String,
    event_organizer:String,
    event_type:String,
    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true     
      }
    }
  });

const Events=mongoose.model('Events',eventSchema)

module.exports=Events