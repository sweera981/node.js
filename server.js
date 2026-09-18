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


import express from "express"

const app = express();

app.use(express.json());


// POST Route for Form Submission
app.post('/api/user', (req, res) => {
    // data recieve from req.body 
    const { name, email, password } = req.body;

    console.log("Form Data Received:", req.body);

    res.json({
        message: "Data successfully received via body!",
        data: { name, email }
    });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
