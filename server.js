// console.log("Hello world");
// import express from "express";


// const app = express();

// app.listen(5000, () => {
//     console.log("Server is running on port 5000");
// });

// app.get("/", (req, res) => {
//     res.json({ message: "Hello world!" });
// });

// import express from "express";
// const app = express();

// Route: /register/:department
// Example URL: http://localhost:5000/register/software-engineering?name=sweera&email=sweera@gmail.com&age=20&city=Bhakkar&subject=OOP
// app.get("/register/:department", (req, res) => {
//     const dept = req.params.department;
//     const { name, email, age, city, subject } = req.query;

//     res.json({
//         message: "Form successfully submitted!",
//         department: dept,        // Params
//         studentData: {
//             fullName: name,        // Query
//             emailAddress: email,   // Query
//             studentAge: age,       // Query
//             city: city,            // Query
//             subject: subject,      // Query

//         }
//     });
// });

// app.listen(5000, () => {
//     console.log("Server is running on http://localhost:5000");
// });


// import express from "express"

// const app = express();

// app.use(express.json());


// // POST Route for Form Submission
// app.post('/api/user', (req, res) => {
//     // data recieve from req.body
//     const { name, email, password } = req.body;
//     if (!name || !email || !password) {
//         return res.status(400).json({
//             message: "Please provide all the required fields",
//         });
//     }
//     console.log("Form Data Received:", req.body);

//     res.json({
//         message: "Data successfully received via body!",
//         data: { name, email }
//     });
// });

// app.listen(5000, () => {
//     console.log('Server is running on port 5000');
// });


// import express from "express";
// import multer from "multer";
// const app = express();
// app.use(express.json());
// console.log()
// // POST Route for Form Submission
// app.post('/login', (req, res) => {
//     const name = req.headers;

//     if (name === "" || name === null || name === undefined) {
//         return res.status(400).json({
//             message: "Please provide name",
//         });
//     }
//     else {
//         return res.status(200).json({
//             message: "Data successfully received via headers!",
//             user: { name },
//         });
//     }
// });

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/");
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]);
//     },
// });
// const upload = multer({ storage: storage });
// app.post("/upload", upload.array("image", 5), (req, res) => {
//     console.log(req.files);
//     if (!req.files || req.files.length === 0) {
//         return res.status(400).json({
//             message: "Please provide file",
//         });
//     }
//     return res.status(200).json({
//         message: "File uploaded successfully",
//         data: req.files.map(file => file.filename)
//     });
// })


// app.listen(5000, () => {
//     console.log("Server is running on port 5000");
// });



// import express from "express";
// import mongoose from 'mongoose'
// import 'dotenv/config';
// const app = express();
// app.use(express.json());

// app.get("/", (req, res) => {
//     res.send("server is running smoothly!");
// });


// async function main() {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI);
//         console.log("Database connected mongodb");
//     } catch (err) {
//         console.log(err);
//     }
// }
// main()

// app.listen(5000, () => {
//     console.log("Server is running on port 5000");
// });


import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import "dotenv/config";

const app = express();
app.use(express.json());

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]);
    },
});
const upload = multer({ storage: storage });

// MongoDB connection
async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected mongodb");
    } catch (err) {
        console.log("Database connection error:", err);
    }
}
main();

const userSchema = new mongoose.Schema({
    userName: {
        type: String, minLength: 3, maxLength: 20, required: true
    },
    email: {
        type: String, required: true, unique: true, lowercase: true
    },
    phone: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, minLength: 5, maxLength: 20, required: true, select: false
    },
}, { timestamps: true })


const userModel = new mongoose.model("User", userSchema)

app.post("/users", async (req, res) => {
    const { userName, email, password, phone } = req.body;

    if (!userName || !email || !password || !phone) {
        return res.status(400).json({
            success: false,
            message: "please enter all fields"
        });
    }

    const user = await userModel.create({
        userName,
        email,
        password,
        phone
    });

    return res.status(200).json({
        success: true,
        message: "user created successfully",
        user
    });
});
// get all users
app.get("/users", async (req, res) => {
    const users = await userModel.find();
    res.status(200).json({ success: true, users });
});

// get user through id
app.get("/user/:id", async (req, res) => {
    const { id } = req.params;

    const user = await userModel.findById(id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    res.status(200).json({
        success: true,
        user
    });
});
app.put("/user/:id", upload.single("picture"), async (req, res) => {
    const { id } = req.params;
    let updateData = req.body;

    if (req.file) {
        updateData.picture = `${process.env.APP_URL}/uploads/${req.file.filename}`;
    }

    const updatedUser = await userModel.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true
    });

    if (!updatedUser) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User updated", user: updatedUser });
});



app.delete("/user/:id", async (req, res) => {
    const { id } = req.params;

    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User deleted successfully" });
});
app.listen(5000, () => {
    console.log("Server started on port 5000")
})
