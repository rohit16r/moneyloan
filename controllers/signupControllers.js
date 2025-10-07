


// const SignupUser = require('../models/signupModel.js');

// const signing = async (req, res) => {
//     try {
//         const { firstName, lastName, email, phone, password, confirmPassword } = req.body;

//         // Password match check
//         if (password !== confirmPassword) {
//             // return res.status(400).send("Passwords do not match");
            
//             return res.send(`
//                 <script>
//                   alert("❌ password not match ");
//                   window.location.href = "/signup";
//                 </script>
//               `);
//             }
     

//         // Check if email already exists
//         const existingUser = await SignupUser.findOne({ email });
//         if (existingUser) {
//             // return res.status(400).send("Email already exists");
//             return res.send(`
//                 <script>
//                   alert("❌ email exits");
//                   window.location.href = "/signup";
//                 </script>
//               `);
//             }
        

//         // Create new user
//         const newUser = new SignupUser({
//             firstName: firstName,
//             lastName: lastName,
//             email: email,
//             phone:phone,
//             password:password,
//             confirmPassword:confirmPassword
//         });

//         await newUser.save();
//         res.render("login.ejs"); // no need for .ejs

//     } catch (error) {
//         console.error("Error found:", error);
//         res.status(500).send("Internal server error");
//     }
// };

// module.exports = signing;



const SignupUser = require('../models/signupModel.js');

const signing = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password, confirmPassword } = req.body;

        // Password match check
        if (password !== confirmPassword) {
            return res.send(`
                <script>
                  alert("❌ Passwords do not match");
                  window.location.href = "/signup";
                </script>
            `);
        }

        // Check if email already exists
        const existingUser = await SignupUser.findOne({ email });
        if (existingUser) {
            return res.send(`
                <script>
                  alert("❌ Email already exists");
                  window.location.href = "/signup";
                </script>
            `);
        }

        // Create new user
        const newUser = new SignupUser({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone:phone,
            password:password, 
            confirmPassword:confirmPassword
        });

        await newUser.save();

        // After successful signup, redirect to login page
        res.send(`
            <script>
              alert("✅ Signup successful! Please login.");
              window.location.href = "/home";
            </script>
        `);

    } catch (error) {
        console.error("Error found:", error);
        res.status(500).send(`
            <script>
              alert("❌ Internal server error");
              window.location.href = "/signup";
            </script>
        `);
    }
};

module.exports = signing;
