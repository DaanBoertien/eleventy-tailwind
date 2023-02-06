const yaml = require("js-yaml");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    
}

