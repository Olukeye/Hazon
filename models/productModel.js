const mongoose   = require('mongoose')
const {ObjectId} = mongoose.Schema

const productSchema = new mongoose.Schema(
    {
        name:{
            type:'String',
            required:true,
            trim:true,
            maxlength:40
        },
        description:{
            type:'String',
            required:true,
            trim:true,
            maxlength:400 
        },
        price:{
            type:'Number',
            required:true,
            trim:true,
            maxlength:30
        },
        quantity:{
            type:'Number',
            required:true,
        },
        photo:{
            data:'Buffer',
            contentType:'String'
        },
        shipping:{
            required:false,
            type:'Boolean'
        }
    },
    {
      timestamps:true
    }
)

module.exports = mongoose.model('Product', productSchema)

