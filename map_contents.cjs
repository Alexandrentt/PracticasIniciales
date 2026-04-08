const fs = require('fs');
const content = fs.readFileSync('constants.ts', 'utf8');
const lines = content.split('\n');
lines.forEach((line, index) => {
    if (line.includes('const content') && line.includes(': TopicContent')) {
        console.log(`${line.trim()} - Line ${index + 1}`);
    }
});
