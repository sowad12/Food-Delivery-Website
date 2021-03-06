const router = require("express").Router();
const verify = require("../middlewares/verfitytoken");

const adminCheck = require("../middlewares/admincheck");
const foodsCtrl = require("../controllers/foodControl");
const userCtrl = require("../controllers/userControl");
const authCtrl = require("../controllers/authControl");
const restaurantCtrl = require("../controllers/restaurantControl");
const cartCtrl=require("../controllers/cartControl");

//foods crud routes

router.post("/postFood", foodsCtrl.postFood);

router.get("/getSingleFood/:id", foodsCtrl.getSingleFood); 

router.get("/getAllFoods", foodsCtrl.getAllFoods); 

router.get("/getSearchFood", foodsCtrl.getSearchFood); 

router.get("/getSortFoods", foodsCtrl.getSortFoods); 

router.get("/getRatingFood", foodsCtrl.getRatingFood); 

// router.post("/postFood", verify, adminCheck, foodsCtrl.postFood);


// router.route('/postFood').post(verify,adminCheck,foodsCtrl.postFood)

router.patch("/updateFood/:id", foodsCtrl.updateFood);

router.delete("/deleteFood/:id", foodsCtrl.deleteFood);

//authentication
router.post("/register", authCtrl.register);

router.post("/activeEmail", authCtrl.activateEmail);

router.post("/login", authCtrl.login);
// router.get('/user/activate')
router.post("/forgotpassword", authCtrl.forgotPassword);

router.post("/resetpassword", verify, authCtrl.resetPassword);

router.get("/logout", authCtrl.logout);

router.post("/refreshToken", authCtrl.getAccessToken);

//Admin and user Details routes
router.get("/singleuser", verify, userCtrl.getSingleUser);

router.get("/allusers", verify, adminCheck, userCtrl.getAllUsers);

router.patch("/updateuser", verify, userCtrl.updateUser);

router.patch("/updaterole/:id", verify, adminCheck, userCtrl.updateUsersRole);

router.delete("/deleteuser/:id", verify, adminCheck, userCtrl.deleteUser);

//Restaurant

router.post("/postRest",restaurantCtrl.postRest);

router.get("/getAllRest",restaurantCtrl.getAllRest);

//Cart

 router.post("/postCart", verify,cartCtrl.postCart);

 router.put("/updateCart/:id", verify,cartCtrl.updateCart);

 router.delete("/deleteCart/:id", verify,cartCtrl.deleteCart);

 router.get("/getCart", verify,cartCtrl.getCart);


module.exports = router;
