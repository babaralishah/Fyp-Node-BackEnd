const passwordhash = require("password-hash");
const httpstatus = require("http-status-codes");

//
const User = require("../user-models/user.model");
const func = require("../functions/sendemail");
const auth = require("../../../../config/auth");

exports.createFile = async(req, res) => {
    try {
        console.log("User is login");
        if (!req.body.fileName || !req.body.fileUrl) {
            console.log("Object are missing");
            return res.status(httpstatus.NOT_ACCEPTABLE).json({
                success: false,
                status: `Your request body is empty ${req.body}`,
            });
        } else {
            console.log("Hello");
            const fileName = req.body.fileName;
            const fileUrl = req.body.fileUrl;
            const userId = req.params.id;
            console.log(fileName, fileUrl, userId);

            const user = await User.findOne({ _id: req.params.id });
            console.log(user);
            if (user) {
                const fileObj = {
                    name: fileName,
                    url: fileUrl,
                };
                user.files.push(fileObj);
                user.save();

                return res.status(201).json({
                    success: true,
                    status: `File Created Successfully`,
                });
            }
        }
    } catch (error) {
        return res.status(httpstatus.INTERNAL_SERVER_ERROR).json(error);
    }
};

exports.getFiles = async(req, res) => {
    try {
        console.log("User is login");
        const userId = req.params.id;
        console.log(userId);

        const user = await User.findOne({ _id: req.params.id });
        return res.status(201).json({
            success: true,
            status: `File Created Successfully`,
            data: {
                files: user.files,
            },
        });
    } catch (error) {
        return res.status(httpstatus.INTERNAL_SERVER_ERROR).json(error);
    }
};

exports.deleteFile = async(req, res) => {};