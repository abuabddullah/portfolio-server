"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    res.json({
        success: data.success,
        message: data.message || null,
        data: data.data || null,
    });
};
exports.default = sendResponse;
