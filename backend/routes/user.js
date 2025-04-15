const express = require("express");
const bcrypt = require("bcrypt");
const { UserSchema } = require("../zod");
const jwt = require("jsonwebtoken");

const { SALT_ROUNDS, JWT_SECRET_CODE } = require("../config");
const { UserModel, AccountModel } = require("../db");
const { userMiddleware } = require("../middleware");

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const isValidBody = await UserSchema.safeParseAsync(req.body);
        if (!isValidBody.success) {
            return res.status(400).json({
                message: "Invalid input/s",
                Error: isValidBody.error,
            });
        }

        const { email, firstname, lastname, password } = req.body;
        const isUserExist = await UserModel.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({
                message: "Bad Request",
                Error: "User already exists! please check your email",
            });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const jwt_token = jwt.sign(
            {
                email,
            },
            JWT_SECRET_CODE,
            {
                expiresIn: "1h",
            }
        );

        const createdUser = await UserModel.create({
            email,
            firstname,
            lastname,
            password: hashedPassword,
        });

        const initialBalance=Math.floor(Math.random()*10000)+1;
        await AccountModel.create({
            userId:createdUser._id,
            balance:initialBalance
        })

        res.status(200).header("Authorization", `${jwt_token}`).send({
            message: "user registered",
            jwt_token,
        });
    } catch (error) {
        res.status(500).json({
            message: "server error while registering user",
            Error: error,
        });
    }
});

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400);
            return res.json({
                message: "input/s missing",
            });
        }

        const isUserExist = await UserModel.findOne({ email });
        if (!isUserExist) {
            res.status(400);
            return res.json({
                message: "User do not exist. sign up first",
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            isUserExist.password
        );
        if (!isPasswordCorrect) {
            res.status(400);
            return res.json({
                message: "password does not match",
            });
        }

        const jwt_token = jwt.sign(
            {
                email,
            },
            JWT_SECRET_CODE,
            {
                expiresIn: "1h",
            }
        );

        res.status(200).header("Authorization", `${jwt_token}`).json({
            message: "user signed in",
            jwt_token,
        });
    } catch (error) {
        res.status(500).json({
            message: "server error while signing in",
            Error: error,
        });
    }
});

router.put("/update-user", userMiddleware, async (req, res) => {
    try {
        const email = req.email;
        const detailToUpdate = req.body;

        if (Object.keys(detailToUpdate).length === 0) {
            return res.status(400).json({
                message: "Bad request",
                Error: "nothing to update",
            });
        }

        const updateFields = {};
        if (detailToUpdate.firstname)
            updateFields.firstname = detailToUpdate.firstname;
        if (detailToUpdate.lastname)
            updateFields.lastname = detailToUpdate.lastname;

        if (!detailToUpdate.password || detailToUpdate.password.length < 8) {
            return res.status(411).json({
                message: "password must contain atleast 8 characters",
            });
        }

        updateFields.password = await bcrypt.hash(
            detailToUpdate.password,
            SALT_ROUNDS
        );

        await UserModel.updateOne({ email }, updateFields);

        return res.status(200).json({
            message: "user updated successfully",
        });
    } catch (e) {
        return res.status(500).json({
            message: "server error while updating user",
        });
    }
});

router.get('/bulk',userMiddleware, async(req,res)=>{
    const {filter}=req.query || "";

    const users=await UserModel.find({
        $or:[
            {
                firstname:{"$regex":filter}
            },
            {
                lastname:{"$regex":filter}
            }
        ]
    })

    res.json({
        user:users.map(user=>({
            email:user.username,
            firstname:user.firstname,
            lastname:user.lastname,
            _id:user._id
        }))
    })
})

module.exports = {
    UserRouter: router,
};
