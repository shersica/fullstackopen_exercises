const _ = require('lodash')

const dummy = (blog) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0 ) {
        return null
    }

    const reducer = (mostLiked, currentBlog) => {
        return currentBlog.likes > mostLiked.likes ? currentBlog : mostLiked
    }

    const fav = blogs.reduce(reducer)

    return {
        title: fav.title,
        author: fav.author,
        likes: fav.likes
    }
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0 ) {
        return null
    }

    const authorsBlogsCount = _.countBy(blogs, 'author')
    const topAuthor = _.maxBy(Object.keys(authorsBlogsCount), (author) => authorsBlogsCount[author])

    return {
        author: topAuthor,
        blogs: authorsBlogsCount[topAuthor]
    }
}

const mostLikes = (blogs) => {
    if(blogs.length === 0 ) {
        return null
    }

    const authorLikes = _.groupBy(blogs, 'author')
    const likesCount = _.mapValues(authorLikes, (blogs) =>
    _.sumBy(blogs, 'likes')
    )

    const topAuthor = _.maxBy(Object.keys(likesCount), (author) => likesCount[author])

    return {
        author: topAuthor,
        likes: likesCount[topAuthor]
    }
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}