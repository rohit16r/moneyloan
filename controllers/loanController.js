const SignupUser = require('../models/signupModel.js');

const userLogincontroller = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await SignupUser.findOne({ email });
    if (!user) {
      return res.send(`
        <script>
          alert("❌ User not found");
          window.location.href = "/home";
        </script>
      `);
    }

    // Compare plain passwords
    if (user.password !== password) {
      return res.send(`
        <script>
          alert("❌ Incorrect password");
          window.location.href = "/login";
        </script>
      `);
    }

    // Save session data
    req.session.user = {
      id: user._id,
      firstName: user.firstName,
      email: user.email
    };

    // Redirect on success
    res.send(`
      <script>
        alert("✅ Login successful!");
        window.location.href = "/home";
      </script>
    `);

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = userLogincontroller;