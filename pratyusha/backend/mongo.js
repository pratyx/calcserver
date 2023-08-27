import mongoose from 'mongoose';
const connectDB=(url)=>{
    mongoose.set('strictQuery',true)
    mongoose.set('bufferTimeoutMS', 30000)

    mongoose.connect(url).then(()=>{
        console.log('MongoDB!')
    }).catch((err)=>{
        console.log(err)
    })
}

export default connectDB