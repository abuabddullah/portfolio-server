"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Blog title is required"],
        trim: true,
    },
    content: {
        type: String,
        required: [true, "Blog content is required"],
    },
    summary: {
        type: String,
        required: [true, "Blog summary is required"],
    },
    image: {
        type: String,
    },
    tags: {
        type: [String],
        default: [],
    },
    published: {
        type: Boolean,
        default: true,
    },
    publishedAt: {
        type: Date,
    },
}, {
    timestamps: true,
});
// Create indexes for better search performance
blogSchema.index({ title: "text", content: "text", summary: "text" });
// Pre-save middleware to set publishedAt date when blog is published
blogSchema.pre("save", function (next) {
    if (this.published && !this.publishedAt) {
        this.publishedAt = new Date();
    }
    next();
});
exports.Blog = mongoose_1.default.model("Blog", blogSchema);
