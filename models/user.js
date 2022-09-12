const {Schema, model} = require("mongoose");
const Joi = require("joi");

const {handleSchemaValidationError} = require("../helpers");

const emailRegexp = /^[\w.]+@[\w]+.[\w]+$/;


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        match: emailRegexp,
        unique: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
      },
    token: {
        type: String,
        default: ""
    }
}, {versionKey: false, timestamps: true});

userSchema.post("save", handleSchemaValidationError);

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    repeat_password: Joi.ref("password"),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const schemas = {
    registerSchema,
    loginSchema,
}

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
}