const mongoose = require('mongoose');
const Launch = require('../models/launches');

mongoose.connect('mongodb://localhost:27017/spacex', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("√√√ Database connected");
});
// this is the calculation to pick a random entry from an array of information

const seedDB = async () => {
    await Launch.deleteMany({});
    const liftoff = new Launch({
        "fairings": null,
        "links": {
            "patch": {
                "small": "https://i.imgur.com/ZBUSrcD.png",
                "large": "https://i.imgur.com/yPv13SR.png"
            },
            "reddit": {
                "campaign": "https://www.reddit.com/r/spacex/comments/p67i27/crs23_launch_campaign_thread/",
                "launch": "https://www.reddit.com/r/spacex/comments/pcj0ao/rspacex_crs23_launch_docking_discussion_updates/",
                "media": null,
                "recovery": null
            },
            "flickr": {
                "small": [],
                "original": [
                    "https://live.staticflickr.com/65535/51411435986_82d7088b61_o.jpg",
                    "https://live.staticflickr.com/65535/51411702583_fe67991413_o.jpg",
                    "https://live.staticflickr.com/65535/51411702573_de10cdbc06_o.jpg",
                    "https://live.staticflickr.com/65535/51411435116_ac7b3cc3d1_o.jpg"
                ]
            },
            "presskit": null,
            "webcast": "https://youtu.be/x-KiDqxAMU0",
            "youtube_id": "x-KiDqxAMU0",
            "article": null,
            "wikipedia": "https://en.wikipedia.org/wiki/SpaceX_CRS-23"
        },
        "static_fire_date_utc": "2021-08-26T02:49:00.000Z",
        "static_fire_date_unix": 1629946140,
        "net": false,
        "window": 0,
        "rocket": "5e9d0d95eda69973a809d1ec",
        "success": true,
        "failures": [],
        "details": "SpaceX's 23rd ISS resupply mission on behalf of NASA, this mission brings essential supplies to the International Space Station using the cargo variant of SpaceX's Dragon 2 spacecraft. Cargo includes several science experiments. The booster for this mission is expected to land on an ASDS. The mission will be complete with return and recovery of the Dragon capsule and down cargo.",
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
seedDB().then(() => {
    mongoose.connection.close();
    console.log("Database has been updated √")
})