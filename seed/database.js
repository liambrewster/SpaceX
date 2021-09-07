const mongoose = require('mongoose');
const Launch = require('../models/launches');
const axios = require('axios');
const { fileLoader } = require('ejs');

mongoose.connect('mongodb://localhost:27017/spacex', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("√√√ Database connected");
});

const seedLaunchDB = async () => {
    const respData = await axios.get('https://api.spacexdata.com/v4/launches/latest')
    const lD = respData.data
    await Launch.deleteMany({});
    const liftoff = new Launch({
        "fairings": lD.fairings,
        "links": {
            "patch": {
                "small": lD.links.patch.small,
                "large": lD.links.patch.large
            },
            "reddit": {
                "campaign": lD.links.reddit.campaign,
                "launch": lD.links.reddit.launch,
                "media": lD.links.reddit.media,
                "recovery": lD.links.reddit.recovery
            },
            "flickr": {
                "small": [],
                "original": []
            },
            "presskit": lD.links.presskit,
            "webcast": lD.links.webcast,
            "youtube_id": lD.links.youtube_id,
            "article": lD.links.article,
            "wikipedia": lD.links.wikipedia
        },
        "static_fire_date_utc": lD.static_fire_date_utc,
        "static_fire_date_unix": lD.static_fire_date_unix,
        "net": lD.net,
        "window": lD.window,
        "rocket": "5e9d0d95eda69973a809d1ec",
        "success": true,
        "failures": [],
        "details": lD.details,
        "crew": [],
        "ships": [
            "5ea6ed2d080df4000697c904"
        ],
        "capsules": [],
        "payloads": [
            "5fe3c4f2b3467846b3242193"
        ],
        "launchpad": "5e9e4502f509094188566f88",
        "flight_number": 133,
        "name": "CRS-23",
        "date_utc": "2021-08-29T07:14:00.000Z",
        "date_unix": 1630221240,
        "date_local": "2021-08-29T03:14:00-04:00",
        "date_precision": "hour",
        "upcoming": false,
        "cores": [
            {
                "core": "5f57c53d0622a6330279009f",
                "flight": 4,
                "gridfins": true,
                "legs": true,
                "reused": true,
                "landing_attempt": true,
                "landing_success": true,
                "landing_type": "ASDS",
                "landpad": "5e9e3033383ecb075134e7cd"
            }
        ],
        "auto_update": true,
        "tbd": false,
        "launch_library_id": "13386512-85bb-4c93-a9b0-f5eac05fbe4f",
        "id": "5fe3b11eb3467846b324216c"
    })
    await liftoff.save();

};
seedLaunchDB().then(() => {
    mongoose.connection.close();
    console.log("Launch Database has been updated √")
})