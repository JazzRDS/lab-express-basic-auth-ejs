const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.post('/signup', async (req, res, next) => {
  console.log(req.body)
  const payload = { ...req.body }


delete payload.password

const salt = bcrypt.genSaltSync()

payload.passwordHash = bcrypt.hashSync(req.body.password, salt)

try {
  const newUser = await UserActivation.create(payload)
  res.send(newUser)
} catch (error) {
  console.log(error)
}
})

router.get('login' (req, res, next) => {
  res.render('auth/login')
})

router.post('login', async(req, res, next) => {
  console.log(req.body)
  try {
      const currentUser = req.body
      const checkedUser = await User.findOne({ email: currentUser.email.toLowerCase()})
      if (checkedUser) {

          if (bcrypt.compareSync(cuttentUser.password, checkedUser.passwordHash)) {

              const loggedUser = { ...checkedUser._doc }
              delete loggedUser.passwordHash
              console.log(loggedUser)
          } else {
              console.log('Password is incorrect')
              res.render('auth/login', {
                  errorMessage: 'Password is incorrect',
                  payload: { email: currentUser.email },
              })
          }
      } else {
          console.log('No user with this email')
          res.rendr('auth/login', {
              errorMessage: 'No user with this email',
              payload: { email: currentUser.email },
          })
      }
  } catch (error) {
      console.log('error occured: ', error)
  }
})

module.exports = router


