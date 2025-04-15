const express = require("express");
const { userMiddleware } = require("../middleware");
const { AccountModel, UserModel } = require("../db");
const { default: mongoose } = require("mongoose");

const router = express.Router();
router.use(userMiddleware);

router.get("/balance", async (req, res) => {
    try {
        const userEmail = req.email;
        const userId = req.userId;

        const userAccount = await AccountModel.findOne({ userId });
        // if account doesn't exist, return from here.
        // but we have assigned one account to each use who has ever signed in.

        return res.status(200).json({
            balance: userAccount.balance,
        });
    } catch (error) {
        res.status(500).json({
            message: "server error while fetching account balance",
            Error: error,
        });
    }
});

router.post("/transfer", async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const userId = req.userId;
        const { userEmail, transferAmount } = req.body;
        if (!userEmail?.trim() || transferAmount === 0 || transferAmount < 0) {
            await session.abortTransaction()
            return res.status(400).json({
                message: "Bad request",
            });
        }

        const senderAccount = await AccountModel.findOne({ userId }).session(
            session
        );
        if (senderAccount.balance < transferAmount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient Balance",
            });
        }

        const reciever = await UserModel.findOne({ email: userEmail }).session(
            session
        );
        if (!reciever) {
            session.abortTransaction();
            return res.status(400).json({
                message: "Bad request",
                Error: "receiver is not registered",
            });
        }

        await AccountModel.updateOne(
            { userId },
            {
                $inc: { balance: -transferAmount },
            }
        ).session(session);
        await AccountModel.updateOne(
            { userId: reciever._id },
            {
                $inc: { balance: transferAmount },
            }
        ).session(session);
        await session.commitTransaction();

        return res.status(200).json({
            message: "transfer successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: "server error while transferring amount",
            Error: error,
        });
    }
    session.endSession();
});

module.exports = {
    AccountRouter: router,
};
