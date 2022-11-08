const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
var salt = bcrypt.genSaltSync(10);
var hashedPassword = bcrypt.hashSync(req.body.password, salt);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post('/login', async (req, res) => {
  const {username} = req.body.user
     console.log(req.body.user)

    try{
        let existingUser = await User.findOne({username: username});
        console.log(existingUser)
        !existingUser && res.status(401).json("Wrong User Name");


  const isPasswordCorrect = bcrypt.compareSync(req.body.user.password, existingUser.password);
  console.log(isPasswordCorrect)
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Inavlid Email / Password" });
  }

        const accessToken = jwt.sign(
        {
            id: existingUser._id,
            isAdmin: existingUser.isAdmin,
        },
        process.env.JWT_SEC,
            {expiresIn:"3d"}
        );
  
        const { password, ...others } = existingUser._doc;  
        res.status(200).json({...others, accessToken});

    }catch(err){
        res.status(500).json(err);
    }

});

module.exports = router;