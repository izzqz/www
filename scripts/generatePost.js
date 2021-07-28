const fs = require('fs');
const prompts = require('prompts');
const dashify = require('dashify');

const postTemplate = fs.readFileSync('scripts/templates/new-post.md', 'utf-8');

(async function main() {
    const { title } = await prompts({
        type: 'text',
        name: 'title',
        message: 'Post title:',
    });

    if (!title) {
        console.error('ERR: Name should be specified\n');
        process.exit(1);
    }

    if (!fs.existsSync('drafts')) {
        fs.mkdirSync('drafts');
    }

    const fileName = `draft-${dashify(title)}.md`;

    fs.writeFileSync(`drafts/${fileName}`, postTemplate.replace('#TITLE#', title));

    console.log('\n File created');
})();
