const express = require('express');
const app = express();
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
//session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const customware = require('./config/middleware');
const path = require('path');
// app.use(express.static());
//backend setup
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('public'));
// Authentication

app.use(session({
    name: 'quizzer',
    secret: 'None',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (60 * 1000 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function (err) {
            console.log(err || "connect-db ok");
        }
    )
}));
// AiApi
require("dotenv").config();
const Configuration = require('openai');
const OpenAIApi = require('openai');
app.use(express.json());

// const configuration = () => {
//     return Configuration(
//         {
//             organization: "",
//             apikey: process.env.OPEN_AI_API_KEY,

//         }

//     )
// }
// const openai = () => { return OpenAIApi(configuration); };

const OpenAi=require("openai");
const openai=new OpenAi({
    apikey: process.env.OPENAI_API_KEY,
})
app.post("/testphase", async (req, res) => {
    try {
        console.log("here");
        const completion = await openai.completions.create({
            model: "text-davinci-003",
            prompt: "This story begins",
            max_tokens: 30,
        });
        console.log(completion.choices[0].text);
        // console.log(Compltion.choices[0].text);
        return res.status(200).json({
            success: true,
            data: response.data.choices[0].text
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,

        });
    }

})

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customware.setFlash);

app.use('/', require('./routes'));

app.listen("3000", () => {
    console.log(`server is running on port 3000`);
});