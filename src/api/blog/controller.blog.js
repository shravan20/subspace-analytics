const service = require("./service.blog");

const getBlogsStats = async (request, response, next) => {
    try {
        response.success(await service.getBlogsStats());
    } catch (error) {
        response.error(error);
    }
}


const getBlogSearch = async (request, response, next) => {
    try {
        response.success(await service.getBlogSearch(request.query));
    } catch (error) {
        response.error(error);
    }
}

module.exports = {
    getBlogsStats,
    getBlogSearch
}