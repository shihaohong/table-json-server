import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import { writeFile } from 'fs';

function generateModelName() {
    return uniqueNamesGenerator({
        dictionaries: [adjectives, animals],
        length: 2,
    });
}

// From https://stackoverflow.com/questions/31378526/generate-random-date-between-two-dates-and-times-in-javascript
function randomDate(start, end, startHour, endHour) {
    var date = new Date(+start + Math.random() * (end - start));
    var hour = startHour + Math.random() * (endHour - startHour) | 0;
    date.setHours(hour);
    return date;
  }

function generateRandomPercentage() {
    return generateRandomInt(100) + '%';
}

function generateRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const statuses = [
    'Live',
    'Shadow',
    'In Review',
];

function generateRandomStatus() {
    return statuses[generateRandomInt(3)];
}

function generateTableData(numberOfEntries) {
    const result = [];

    for (let i = 0; i < numberOfEntries; i += 1) {
        result.push(
            {
                "Active Model": generateModelName(),
                "Created At": randomDate(new Date(2020, 1, 1), Date.now()),
                "Parent Model": generateModelName(),
                "Accuracy (sliding)": generateRandomPercentage(),
                "(cumu.)": generateRandomPercentage(),
                "Latency (p50, ms)": generateRandomInt(500), // assume 500ms highest latency
                "Status": generateRandomStatus(),
            },
        );
    }

    return JSON.stringify({
        data: result,
    }, null, 2);
}

const fileName = './server/table-data.json';

writeFile(fileName, generateTableData(100), function(err, result) {
    if (err) {
        console.log('error: ' + err);
        return;
    }

    console.log('successfully wrote file: ' + fileName);
});
