const express = require('express');
const moment = require('moment');
const app = express();
const data = require('./Data.json')



// Enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(express.json());

app.listen(8080, () => {
    console.log('server running on port 8080');
})

const filterByDate = (startDate, endDate) => {
    let resData = data.filter(({timestamp}) => {
        let formattedTime = timestamp.split('T')[0];
        if (moment.utc(formattedTime).isSameOrAfter(moment.utc(startDate)) && moment.utc(formattedTime).isSameOrBefore(moment.utc(endDate))) {
            return true;
        }
        return false;
    })

    return resData
}

app.post('/getInfo', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const { page = 1, count = 5, startDate = "2021-07-24", endDate="2021-08-26", filterBySeverity='' } = req.body;
    let filteredByDateData = filterByDate(startDate, endDate)
    if(filterBySeverity === 'low' || filterBySeverity === 'medium' || filterBySeverity === 'high') {
        filteredByDateData = filteredByDateData.filter((elem) => {
            return elem.severity === filterBySeverity
        })
    }
    let pageSize = count;
    let minIndex = (page - 1) * pageSize;
    let maxIndex = page * pageSize;

    res.json({
        currentPage: page,
        data: filteredByDateData.slice(minIndex, maxIndex),
        total: filteredByDateData.length
    });
})

app.post('/getCountBydate', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const { startDate = "2021-07-24", endDate="2021-08-26" } = req.body;
    let resObj = {};
    let resData = data.filter(({timestamp}) => {
        let formattedTime = timestamp.split('T')[0];
        if (moment.utc(formattedTime).isSameOrAfter(moment.utc(startDate)) && moment.utc(formattedTime).isSameOrBefore(moment.utc(endDate))) {
            if(resObj.hasOwnProperty(formattedTime)) {
                resObj[formattedTime] +=1
            } else {
                resObj[formattedTime] = 1;
            }
            return true;
        }
        return false;
    })
    res.json({
        dateCount: resObj
    });
})