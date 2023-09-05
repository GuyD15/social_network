const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String, 
            required: true,
            minlength: 1, 
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function(timestamp) {
                return new Date(timestamp).toISOString();
            }
        },
        username: {
            type: String,
            required: true,
        },
        reactions: {
            // [] Haven't updated reactionSchema yet
        },
        {
            toJSON: { getters: true },
        },
    };
);

