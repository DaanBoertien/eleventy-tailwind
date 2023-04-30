const yaml = require("js-yaml");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addDataExtension("yml", contents => yaml.load(contents));
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addFilter("concertDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).setLocale('de').toLocaleString(DateTime.DATE_FULL);
    });
    eleventyConfig.addFilter("concertTime", (dateObj) => {
        return DateTime.fromJSDate(dateObj).setLocale('de').toLocaleString(DateTime.TIME_24_SIMPLE);
    });
    const now = new Date();
    eleventyConfig.addGlobalData("currentYear", now.getFullYear());

    
    eleventyConfig.addFilter("futureConcerts", (concerts) => {
        const now = DateTime.local();
        return concerts.filter(concert => {
            const concertDateTime = DateTime.fromJSDate(concert.date);
            return concertDateTime >= now;
        });
    });
    eleventyConfig.addFilter("pastConcerts", (concerts) => {
        const now = DateTime.local();
        return concerts
          .filter(concert => {
            const concertDateTime = DateTime.fromJSDate(concert.date);
            return concertDateTime < now;
          })
          .sort((a, b) => {
            const aDate = DateTime.fromJSDate(a.date);
            const bDate = DateTime.fromJSDate(b.date);
            return bDate - aDate;
          });
      });
}

