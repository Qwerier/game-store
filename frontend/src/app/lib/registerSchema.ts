import {z, email } from "zod";

// guarantee of printable ASCII characters only
const passwordRegex = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])[\x21-\x7E]{6,18}$/
)
export const registerSchema = z.object({
    email: z.email(),
    username: z.string().min(3, 
        {message: "Username must be at leas 3 characters long"}
    ),
    password: z.string().regex(passwordRegex, {
        message: 'Password must contain 1 number, 1 uppercase, 1 lowercase and 1 special character and be between 6 to 18 characters'
    })
})

export type RegisterSchema = z.infer<typeof registerSchema>