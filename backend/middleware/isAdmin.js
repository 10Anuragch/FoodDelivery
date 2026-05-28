import jwt from "jsonwebtoken";

const jwtSecret = "HaHa";

const isAdmin = async (req, res, next) => {

    try {

        // GET TOKEN
        const token = req.header("auth-token");

        // CHECK TOKEN
        if (!token) {

            return res.status(401).json({
                success: false,
                message: "No token provided"
            });

        }

        // VERIFY TOKEN
        const data = jwt.verify(token, jwtSecret);

        // CHECK ROLE
        if (data.user.role !== "admin") {

            return res.status(403).json({
                success: false,
                message: "Access Denied. Admin Only"
            });

        }

        // SAVE USER DATA
        req.user = data.user;

        next();

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

}

export default isAdmin;