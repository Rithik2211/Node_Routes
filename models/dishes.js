const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose); // will load new currency type to mongoose
const Currency = mongoose.Types.Currency;

const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

const dishSchema = new Schema({
    name :{
        type : String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        require: true,
        min: 0
    },
    featured: {
        type: Boolean,
        defaut: false,
    },
    comments: [commentSchema]
},{
    timestamps: true
});

var Dishes = mongoose.model('Dish',dishSchema);

module.exports = Dishes;