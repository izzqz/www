import fs from 'node:fs/promises';
import Handlebars from 'handlebars';

const OPTIONS = {
     CX_VERSION: '20220509_500' 
}

await fs.mkdir('build');
await fs.mkdir('build/lib');

fs.cp('lib', 'build/lib', { recursive: true });
fs.cp('images', 'build/images', { recursive: true });

fs.copyFile('node_modules/xterm/lib/xterm.js', 'build/lib/xterm.js');
fs.copyFile('node_modules/xterm/css/xterm.css', 'build/lib/xterm.css');
fs.copyFile('node_modules/xterm-addon-fit/lib/xterm-addon-fit.js', 'build/lib/xterm-addon-fit.js');

fs.copyFile('src/index.js', 'build/index.js');
fs.copyFile('src/worker.js', 'build/worker.js');

const indexPage = Handlebars.compile(await fs.readFile('src/index.hbs', 'utf-8'))(OPTIONS);

fs.writeFile('build/index.html', indexPage)

