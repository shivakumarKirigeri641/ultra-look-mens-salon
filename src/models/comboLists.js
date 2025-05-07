const mongoose = require('mongoose');
const comboListSchema = mongoose.Schema({
    comboName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:30,
        unique:true,
    },
    combos:[
        {
            serviceID:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:'ServicesList'
            }
        }
    ],
    prices:[
        {
            fromDate:{
                type:Date,
                required:true
            },
            toDate:{
                type:Date,
                required:true
            },
            price:{
                type:Number,
                required:true,
                min:50,
                max:5000
            }
        }
    ],
    discount:{
        type:Number,
        required:true,
        min:0,
        max:100,
        default:0        
    }
});
const ComboLists = mongoose.model('ComboLists', comboListSchema);
module.exports= ComboLists;