const z = require("zod");

const UserSchema = z.object({
    email: z
        .string()
        .email({ message: "Enter a valid email" })
        .trim()
        .max(50, { message: "Email must not exceed 50 characters" }),
    firstname: z
        .string()
        .max(50, { message: "First name must not exceed 50 characters" }),
    lastname: z
        .string()
        .max(50, { message: "Last name must not exceed 50 characters" })
        .nullable(),
    password: z
        .string()
        .min(8, { message: "Password must contain at least 8 characters" }),
});

module.exports = {
    UserSchema,
};
