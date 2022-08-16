const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const mainRouter = require('../routers/mainRouter');
const config = require('../config/config');
const PORT = config.PORT || 8080;
const server = require("http").Server(app);
const MongoStore = require("connect-mongo")
const passport = require('passport');
const flash = require('connect-flash');
const {
    fork
} = require("child_process");
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("./public"));
app.use(cookieParser());
app.use(flash());

if (config.MODE == 'CLUSTER') {
    if (cluster.isMaster) {
        console.log('CPUs: ', numCPUs);
        console.log(`Master PID: ${process.pid} is running`);
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
        cluster.on('exit', (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} died`)
            cluster.fork();
        });
    } else {
        server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
        server.on("error", (error) => console.log("Server Error\n\t", error));
        console.log(`Worker ${process.pid} started`)
    }
} else {
    server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
    server.on("error", (error) => console.log("Server Error\n\t", error));
    console.log(`Worker ${process.pid} started`)
}

// --- Session ---
const sessionOptions = {
    store: MongoStore.create({
        mongoUrl: config.MONGO_ATLAS_URL,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }),
    secret: 's3cr3t0',
    resave: true,
    saveUninitialized: true,
    cookie: {
        expires: config.EXPIRATION
    }
}

app.use(session(sessionOptions));

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());
app.use(function (err, req, res, next) {
    console.log(err);
});

// Router
app.use("/api", mainRouter);