const fs = require('fs');
const prompts = require('prompts');

const drafts = fs.readdirSync('drafts');

const question = {
    type: 'select',
    name: 'filename',
    message: 'Select post',
    choices: drafts.map((filename) => {
        return {
            title: extractTitle(filename),
            value: filename,
        };
    }),
};

function extractTitle(filename) {
    const content = fs.readFileSync(`drafts/${filename}`);

    // regex positive lookbehind
    return /(?<=title: ).*/.exec(content)[0];
}

function getDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`.padStart(2, '0');
    const day = `${today.getDate()}`.padStart(2, '0');

    return [day, month, year].reverse().join('-');
}

(async function main() {
    const { filename } = await prompts(question);

    const newFileName = filename.replace('draft', getDateString());
    const newContent = fs
        .readFileSync(`drafts/${filename}`, 'utf-8')
        .replace('#DRAFT#', `date: ${new Date().toISOString()}`);

    fs.writeFile(`src/posts/${newFileName}`, newContent, (err) => {
        if (err) throw err;
        fs.rmSync(`drafts/${filename}`);
    });
})();
