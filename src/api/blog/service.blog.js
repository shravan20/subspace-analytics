const apiCall = require("../../utils/api-call");
const { HASURA_URL } = require("../../constants/external-service.constant");
const _ = require('lodash');

const getBlogsStats = async () => {
    try {
        let blogs = await hasuraGetBlog({});
        blogs = blogs["blogs"]

        // Calculate the total number of blogs fetched
        const totalBlogs = blogs.length;
        console.log('Total number of blogs fetched:', totalBlogs);

        // Find the blog with the longest title
        const blogWithLongestTitle = _.maxBy(blogs, blog => blog.title.length);
        console.log('Blog with the longest title:', blogWithLongestTitle);

        // Determine the number of blogs with titles containing the word "privacy"
        const blogsWithPrivacyTitle = _.filter(blogs, blog => _.includes(_.toLower(blog.title), 'privacy')).length;
        console.log('Number of blogs with titles containing the word "privacy":', blogsWithPrivacyTitle);

        // Create an array of unique blog titles (no duplicates)
        const uniqueBlogTitles = _.uniq(_.map(blogs, 'title'));
        console.log('Unique blog titles:', uniqueBlogTitles);

        // return blogs

        return {
            totalBlogs: blogs.length, // Total number of blogs fetched
            blogWithLongestTitle: _.maxBy(blogs, blog => blog.title.length), // The title of the longest blog
            uniqueBlogsWithPrivacyTitle: _.uniq(_.filter(blogs, blog => _.includes(_.toLower(blog.title), 'privacy'))).length, // Number of unique blogs with "privacy" in the title,
            blogsWithPrivacyTitle: _.filter(blogs, blog => _.includes(_.toLower(blog.title), 'privacy')).length, // Number of blogs with "privacy" in the title
            uniqueBlogTitles: _.uniq(_.map(blogs, 'title')) // An array of unique blog titles
        };

    } catch (error) {
        throw error;
    }
}


const hasuraGetBlog = async (filter = {}) => {
    return await apiCall.get(HASURA_URL, {
        "x-hasura-admin-secret": process.env.BLOG_HASURA_KEY
    });
}


const getBlogSearch = (query) => {
    return {}
}

module.exports = {
    getBlogsStats,
    getBlogSearch
}