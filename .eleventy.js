const yaml = require("js-yaml");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { DateTime } = require("luxon");
const { format } = require('date-fns');
const { de } = require('date-fns/locale');
const { en } = require('date-fns/locale');
const markdownIt = require("markdown-it");



module.exports = function(eleventyConfig) {
    
    eleventyConfig.addCollection("renderedPages", function (collectionApi) {
        return collectionApi.getAll().filter((item) => item.data.render !== false);
      });
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("admin");
    eleventyConfig.addDataExtension("yml", contents => yaml.load(contents));
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
  
    const md = markdownIt({
        html: true,
        breaks: true,
        linkify: true,
      });
      eleventyConfig.addFilter("md", (content) => {
        return md.render(content);
      });
    
      eleventyConfig.setLibrary("md", md);

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
      

    
    // Custom date filter
    eleventyConfig.addFilter('date', (date, dateFormat, localeString = 'en') => {
        const locale = localeString === 'de' ? de : en;
        return format(new Date(date), dateFormat, { locale });
      });

     
}

