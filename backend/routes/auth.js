
import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import nodemailer from 'nodemailer';


const router = express.Router();


// Register Route
router.post('/register', async (req, res) => {
  const { name, userId, email, password } = req.body;
  try {
    console.log("inside register")
    const user = new User({ name, email, password, userId});
    console.log(user)
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, 'your-jwt-secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

//Password Reset Request Route
router.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // Token valid for 1 hour
    await user.save();

    // Set up nodemailer transport
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "your-email@gmail.com",
        pass: "your-email-password"
      }
    });

    // Send email with reset link
    const resetLink = `http://localhost:5000/resetpassword/${resetToken}`;
    await transporter.sendMail({
      to: user.email,
      from: "your-email@gmail.com",
      subject: "Password Reset",
      html: `<p>You requested a password reset</p><p>Click this <a href="${resetLink}">link</a> to set a new password.</p>`
    });

    res.status(200).send("Password reset link sent to email");
  } catch (error) {
    console.error("Error during password reset request:", error);
    res.status(500).send("Internal Server Error");
  }
});

//Reset Password Route
router.post("/resetpassword/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).send("Invalid or expired token");
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.status(200).send("Password has been reset successfully");
  } catch (error) {
    console.error("Error during password reset:", error);
    res.status(500).send("Internal Server Error");
  }
});



export default router;
