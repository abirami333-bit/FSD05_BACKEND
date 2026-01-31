import mongoose from 'mongoose';

const accessRequestSchema = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    requesterName: {
        type: String,
        required: true
    },
    resourceName: {
        type: String,
        required: true,
        trim: true
    },
    accessType: {
        type: String,
        enum: ['READ', 'WRITE', 'ADMIN', 'FULL'],
        required: true
    },
    reason: {
        type: String,
        required: true,
        minlength: 10
    },
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'REJECTED'],
        default: 'PENDING'
    },
    approver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    approverName: {
        type: String,
        default: null
    },
    approvalDate: {
        type: Date,
        default: null
    },
    comments: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field on save
accessRequestSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const AccessRequest = mongoose.model('AccessRequest', accessRequestSchema);

export default AccessRequest;
