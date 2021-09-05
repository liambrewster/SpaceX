const axios = require('axios');

module.exports.index = (req, res) => {
    res.send("Made it to the Index")
};

module.exports.upcomingLaunch = async (req, res) => {
    try {
        const [response1, response2] = await axios.all([
            axios.get('https://api.spacexdata.com/v3/launches/67'),
            axios.get('https://api.spacexdata.com/v3/launches/next')
        ]);
        console.log(response1.data.mission_name);
        console.log(response1.data.launch_year);

        console.log(response2.data.mission_name);
        console.log(response2.data.launch_year);
        res.send("Chicken Dinner")
    } catch (error) {
        console.log(error.response.body);
        res.send("We Have a Problem")
    };
};

module.exports.previousLaunch = async (req, res) => {
    try {
        const respData = await axios.get('https://api.spacexdata.com/v3/launches')
        const launchData = respData.data
        res.render('launches/previous', { launchData })
    } catch (error) {
        console.log(error);
        res.send("We Have a Problem")
    }
};