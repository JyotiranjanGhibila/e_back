const express = require('express');
const linkidinRouter = express.Router();
const { LinkedinModel } = require("../model/linkedin.model");


linkidinRouter.get("/", async (req, res) => {
    try {
        const linkedin = await LinkedinModel.find();
        res.send({ linkedin });

    } catch (error) {
        res.send({ "msg": "somthing went wrong"});
    }
});


linkidinRouter.post("/create", async (req, res) => {
    try {

        const payload = req.body;
        const newLinkedinPost = new LinkedinModel(payload);
        await newLinkedinPost.save();

        res.send("Linkedin created");

    } catch (error) {
        res.send({ "msg": "somthing went wrong"});
    }
});

linkidinRouter.patch("/update/:id", async (req, res) => {
    let id = req.params.id;
    let p = req.body;
    try {
        await LinkedinModel.findByIdAndUpdate({ "_id": id }, p);
        res.send(`Linkiedin with id ${id} has been update `);
    } catch (error) {
        res.send({ "msg": "somthing went wrong"});
    }
});


linkidinRouter.delete("/delete/:id", async (req, res) => {
    let id = req.params.id;
    try {
        await LinkedinModel.findByIdAndDelete({ "_id": id });
        res.send(`Linkiedin  with id ${id} has been deletd`);
    } catch (error) {
        res.send({ "msg": "somthing went wrong" });
    }
});

module.exports = { linkidinRouter };