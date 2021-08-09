const htmlmin = require('html-minifier');
const dateFns = require('date-fns');
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(syntaxHighlight);

    eleventyConfig.addPlugin(lazyImagesPlugin, {
        transformImgPath: (imgPath) => {
            if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
                // Handle remote file
                return imgPath;
            } else {
                return `./src/${imgPath}`;
            }
        },
    });
   
    eleventyConfig.addDataExtension("yml", contents => yaml.load(contents));

    eleventyConfig.setEjsOptions({
        rmWhitespace: true,
        context: {
            dateFns,
        },
    });

    eleventyConfig.setBrowserSyncConfig({
        files: './_site/assets/styles/main.css',
    });

    eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
        if (outputPath.endsWith('.html')) {
            const minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
                minifyJS: true,
                minifyCSS: true,
            });
            return minified;
        }

        return content;
    });

    return {
        dir: { input: 'src', output: '_site', data: '_data' },
    };
};
