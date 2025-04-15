const mongoose = require("mongoose");
const { DATABASE_URL, DATABASE_NAME } = require("./config");

async function connectDB() {
    try {
        const response = await mongoose.connect(
            `${DATABASE_URL}/${DATABASE_NAME}`
        );
        console.log("connected to database");
    } catch (e) {
        console.log(`Error connecting to database: [${e}]`);
    }
}

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    lastname: {
        type: String,
        trim: true,
        maxLength: 50,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        maxLength:50
    },
    password: {
        type: String,
        required: true
    }
});
const accountSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    balance:{
        type:Number,
        required: true
    }
})

const UserModel = mongoose.model("User", userSchema);
const AccountModel= mongoose.model("Account", accountSchema);

module.exports = {
    connectDB,
    UserModel,
    AccountModel,
};
