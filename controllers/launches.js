const axios = require('axios');

module.exports.index = (req, res) => {
    res.send("Made it to the Index")
};

module.exports.upcomingLaunch = async (req, res) => {
    try {
        const respData = await axios.get('https://api.spacexdata.com/v4/launches/upcoming')
        const launchData = respData.data
        res.render('launches/upcoming', { launchData })
    } catch (error) {
        console.log(error);
        res.send("We Have a Problem")
    };
};
module.exports.previousLaunch = async (req, res) => {
    try {
        const respData = await axios.get('https://api.spacexdata.com/v4/launches/past')
        const launchData = respData.data
        res.render('launches/previous', { launchData })
    } catch (error) {
        console.log(error);
        res.send("We Have a Problem")
    }
};