// const jwt = require("jsonwebtoken")

// exports.userProtected = (req, res, next) => {
//     const { admin } = req.cookies
//     if (!admin) { return res.status(401).json({ message: "No Cookie Found" }) }
//     jwt.verify(admin, process.env.JWT_KEY, (err, decode) => {
//         if (err) {
//             console.log(err)
//             return res.status(401).json({ message: "JWT Error", error: err.message })
//         }
//         req.loggedInUser = decode.userID
//         next()
//     })

// }




const jwt = require("jsonwebtoken");

exports.userProtected = (req, res, next) => {
    console.log("Cookies: ", req.cookies); // Log cookies for debugging
    const { admin } = req.cookies;

    if (!admin) {
        return res.status(401).json({ message: "No Cookie Found" });
    }

    jwt.verify(admin, process.env.JWT_KEY, (err, decode) => {
        if (err) {
            console.error("JWT Verification Error: ", err); // Log the error for debugging
            return res.status(401).json({ message: "JWT Error", error: err.message });
        }

        req.loggedInUser = decode.userID;
        next();
    });
};
