const router = require("express").Router();
const controller = require("./controller.blog");

/**
 * @swagger
 * /blog-stats:
 *   get:
 *     summary: Get blog statistics.
 *     description: Retrieve statistics related to the blogs.
 *     tags: [blogs]
 *     responses:
 *       200:
 *         description: Successful operation. Returns the blog statistics.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: boolean value for success/failure response
 *                 content:
 *                   type: object
 *                   properties:
 *                     totalBlogs:
 *                       type: integer
 *                       description: Total no of blogs
 *                     blogWithLongestTitle:
 *                       type: object
 *                       properties: 
 *                         id:
 *                           type: string
 *                           description: Unique identifier for the blog.
 *                         image_url:
 *                           type: string
 *                           format: url
 *                           description: URL of the blog's image.
 *                         title:
 *                            type: string
 *                            description: The title of the blog, which is the longest title.
 *                     uniqueBlogsWithPrivacyTitle:
 *                        type: integer
 *                        description: No of unique blogs with title containing 'PRIVACY' case insensitive
 *                     blogsWithPrivacyTitle:
 *                        type: integer
 *                        description: No of blogs with title containing 'PRIVACY' case insensitive
 *                     uniqueBlogTitles:
 *                        type: array
 *                        items:
 *                          type: string
 *       400:
 *         description: Bad Request. Invalid request data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message for bad request.
 *       404:
 *         description: Not Found. Resource not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message for resource not found.
 *       500:
 *         description: Internal Server Error. Something went wrong on the server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message for internal server error.
 */
router.get("/blog-stats", controller.getBlogsStats);

/**
 * @swagger
 * /blog-search:
 *   get:
 *     summary: Search blogs by title.
 *     description: Search for blogs based on a substring in the titles.
 *     tags: [blogs]
 *     parameters:
 *       - in: query
 *         name: query
 *         default: "privac" 
 *         schema:
 *           type: string
 *         description: The substring to search for in blog titles.
 *     responses:
 *       200:
 *         description: Successful operation. Returns the blogs matching the search substring.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Unique identifier for the blog.
 *                   image_url:
 *                     type: string
 *                     format: url
 *                     description: URL of the blog's image.
 *                   title:
 *                     type: string
 *                     description: Title of the blog.
 *       400:
 *         description: Bad Request. Invalid request data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message for bad request.
 */
router.get("/blog-search", controller.getBlogSearch);

module.exports = router;