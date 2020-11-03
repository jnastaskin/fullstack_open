const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likesArray = blogs.map( blog => blog.likes)
    const sum = likesArray.reduce((a,b)=> a+b,0)
    
    return sum
}

const favoriteBlog = (blogs) => {
    const likesArray =blogs.map( blog => blog.likes)
    const mostLikedIdx  = likesArray.indexOf(Math.max(...likesArray));
    const mostLikedFull = blogs[mostLikedIdx]
    const mostLiked = (({title,author,likes})=>({title,author,likes}))(mostLikedFull)

    return mostLiked
}

const mostBlogs = (blogs) => {
    const authorArray = blogs.map( blog => blog.author)
    //const authorBlogNum = lodash.countBy(authorArray)

    const authorBlogNum = lodash.countBy(authorArray)
    //console.log('authorBlogNum:', authorBlogNum)

    const authors = Object.keys(authorBlogNum)
    //console.log('authors', authors)

    const blogNums = Object.values(authorBlogNum)
    //console.log('blogNums', blogNums )

    const numOfBlogs = Math.max(...blogNums)
    //console.log('numOfBlogs:', numOfBlogs)

    const mostAuthorIdx = blogNums.indexOf(numOfBlogs)
    const mostAuthor = authors[mostAuthorIdx]
    
    const result = {
        author: mostAuthor,
        blogs: numOfBlogs
    }
    return result
}

const mostLikes = (blogs) => {
    
    var test =lodash.groupBy(blogs,'author')
    //console.log('test:',test)
      
    var sums = lodash(blogs)
        .groupBy('author')
        .map((objs,key) => {
          return{
          'author': key,
          'likes':lodash.sumBy(objs,'likes')
              }
          })
        .value()
    
    let most = lodash.maxBy(sums,'likes')
   // console.log('sums', sums);
   // console.log('test:', test);
    return most
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}