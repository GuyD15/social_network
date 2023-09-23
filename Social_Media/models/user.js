const { Schema, model } = require('mongoose');\

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            // Required and Trimmed?
        },
        email: {
            type: String,
            required: true,
            // Unique and mongoose matching validation
        },
        thoughts: {
            id: []
        },
        friends: {
            id: []
        },
    };
);