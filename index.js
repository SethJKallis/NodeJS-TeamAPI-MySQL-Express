const express = require('express'); //for setting up server
const cors = require('cors'); //error prevention when working locally

const app = express();
const userRouter = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoriesRoute");
app.set("port", process.env.PORT || 6969); // initialize express as an app variable
app.use(express.json()); // enable the server to handle JSON requests
app.use(cors()); // don't let local development give errors

app.get('/', (req,res) =>{
    res.json({
        message: "Welcome to the Application"
    });
});

//user routes
app.use('/users', userRouter);
app.use('/user/:id', userRouter)

//product routes
app.use('/products', productRoute);
app.use('/products/:id', productRoute);

//category routes
app.use('/category', categoryRoute);
app.use('/category/:id', categoryRoute);

// require("./routes/userRoute")(app)

app.listen(app.get("port"), ()=>{
    console.log(`Listen for calls on port ${app.get("port")}`);
    console.log("Press Ctrl+C to Exit Server");
});