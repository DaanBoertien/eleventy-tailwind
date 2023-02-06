const yaml = require("js-yaml");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addFilter("concertDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).setLocale('de').toLocaleString(DateTime.DATE_FULL);
    });
    eleventyConfig.addFilter("concertTime", (dateObj) => {
        return DateTime.fromJSDate(dateObj).setLocale('de').toLocaleString(DateTime.TIME_24_SIMPLE);
    });
}

