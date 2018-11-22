const express = require("express"),
        app=express();
app.listen(8080);   
app.use(express.static(__dirname + '/View'));
app.use("/src",express.static(__dirname + '/src'));
app.get("/",(req, res)=>{
    res.sendFile("index.html");
});