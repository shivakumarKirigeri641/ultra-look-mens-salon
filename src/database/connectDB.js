const mongoose = require('mongoose');
const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://shivakumarkirigeri:lyJyAOygaKbhDvAq@servesolutionsdb.inztnfg.mongodb.net/ultralookmenssalon');
};
module.exports=connectDB;