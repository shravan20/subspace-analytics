const apiCall = require("../../utils/api-call");
const { HASURA_URL } = require("../../constants/external-service.constant");
const _ = require('lodash');

const getBlogsStats = async () => {
    try {
        let blogs = await hasuraGetBlog({});
        blogs = blogs["blogs"];

        return {
            totalBlogs: blogs.length, // Total number of blogs fetched
            blogWithLongestTitle: _.maxBy(blogs, blog => blog.title.length), // The title of the longest blog
            uniqueBlogsWithPrivacyTitle: _.uniqBy(_.filter(blogs, blog => _.includes(_.toLower(blog.title), 'privacy')), blog => _.toLower(blog.title)).length, // Number of unique blogs with "privacy" in the title,
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


const getBlogSearch = async (query) => {

    try {
        let blogs = await hasuraGetBlog({});
        blogs = blogs["blogs"];

        console.log(" 🚀 Caching information for key:" + query);
        console.log(" 📊 Current Cache Size:" + getMemoizedBlogSearch.cache.size);

        if (!query) {
            console.log("Filter not provided")
            return blogs;
        }

        blogs = _.filter(blogs, blog => blog.title.toLowerCase().includes(query.toLowerCase()));
        return blogs;

    } catch (error) {
        throw error;
    }
}

// Memoize the blog search function with a cache duration of 500 seconds
const getMemoizedBlogSearch = _.memoize(getBlogSearch, (query) => `search-${query}`, 50000);

module.exports = {
    getBlogsStats,
    getBlogSearch,
    getMemoizedBlogSearch
}