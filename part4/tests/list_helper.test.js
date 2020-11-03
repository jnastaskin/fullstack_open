const listHelper = require('../utils/list_helper')

describe('dummy test',() => {
    test('dummy returns one', () => {
        const blogs = []
    
        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 6,
          __v: 0
        }
      ]

      const blogs = [ 
            {
                _id: "5a422a851b54a676234d17f7", 
                title: "React patterns", 
                author: "Michael Chan", 
                url: "https://reactpatterns.com/", 
                likes: 7,
                 __v: 0 
            },
            { 
                _id: "5a422aa71b54a676234d17f8", 
                title: "Go To Statement Considered Harmful", 
                author: "Edsger W. Dijkstra", 
                url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                likes: 5,
                 __v: 0 
            },
            { 
                _id: "5a422b3a1b54a676234d17f9",
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra", 
                url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
                likes: 12,
                 __v: 0 
            }, 
            {
              _id: "5a422b891b54a676234d17fa",
              title: "First class tests",
              author: "Robert C. Martin",
               url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
               likes: 10,
                __v: 0 
            }, 
            {
            _id: "5a422ba71b54a676234d17fb",
             title: "TDD harms architecture",
            author: "Robert C. Martin", 
              url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, 
              __v: 0 
            }, 
        ]

      test('when list has only one blog, equals the likes of that', () => {
          const result = listHelper.totalLikes(listWithOneBlog)
          expect(result).toBe(6)
      })

      test('multiple blogs', ()=> {
          const result = listHelper.totalLikes(blogs)
          expect(result).toBe(34)
      })

})

describe('most liked', () => {
    const blogs = [ 
        {
            _id: "5a422a851b54a676234d17f7", 
            title: "React patterns", 
            author: "Michael Chan", 
            url: "https://reactpatterns.com/", 
            likes: 7,
             __v: 0 
        },
        { 
            _id: "5a422aa71b54a676234d17f8", 
            title: "Go To Statement Considered Harmful", 
            author: "Edsger W. Dijkstra", 
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
             __v: 0 
        },
        { 
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra", 
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
            likes: 12,
             __v: 0 
        }, 
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
           url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
           likes: 10,
            __v: 0 
        }, 
        {
        _id: "5a422ba71b54a676234d17fb",
         title: "TDD harms architecture",
        author: "Robert C. Martin", 
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, 
          __v: 0 
        }, 
    ]
    test('favorite blog of multiple blogs', () => {
        const result = listHelper.favoriteBlog(blogs)

        const favorite = { 
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra", 
            likes: 12
        }

        expect(result).toEqual(favorite)

    })
})

describe('most blogs', () =>{
    const blogs = [ 
        {
            _id: "5a422a851b54a676234d17f7", 
            title: "React patterns", 
            author: "Michael Chan", 
            url: "https://reactpatterns.com/", 
            likes: 7,
             __v: 0 
        },
        { 
            _id: "5a422aa71b54a676234d17f8", 
            title: "Go To Statement Considered Harmful", 
            author: "Edjjjsger W. Dijkstra", 
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
             __v: 0 
        },
        { 
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra", 
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
            likes: 12,
             __v: 0 
        }, 
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
           url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
           likes: 10,
            __v: 0 
        }, 
        {
        _id: "5a422ba71b54a676234d17fb",
         title: "TDD harms architecture",
        author: "Robert C. Martin", 
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
          likes: 0, 
          __v: 0 
        }, 
    ]
    test('Number of most blogs by an author', () => {
        const result = listHelper.mostBlogs(blogs)

        const favorite = {
           author: "Robert C. Martin",
           blogs: 2 
        }
        console.log('result:', result)

        expect(result).toEqual(favorite)

    })
})

describe('author with most likes', () =>{
    const blogs = [ 
        {
            _id: "5a422a851b54a676234d17f7", 
            title: "React patterns", 
            author: "Michael Chan", 
            url: "https://reactpatterns.com/", 
            likes: 7,
             __v: 0 
        },
        { 
            _id: "5a422aa71b54a676234d17f8", 
            title: "Go To Statement Considered Harmful", 
            author: "Edsger W. Dijkstra", 
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
             __v: 0 
        },
        { 
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra", 
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
            likes: 12,
             __v: 0 
        }, 
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
           url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
           likes: 10,
            __v: 0 
        }, 
        {
        _id: "5a422ba71b54a676234d17fb",
         title: "TDD harms architecture",
        author: "Robert C. Martin", 
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
          likes: 2, 
          __v: 0 
        }, 
    ]
    test('Author with most total likes', () => {
        const result = listHelper.mostLikes(blogs)

        const favorite = {
           author: "Edsger W. Dijkstra",
           likes: 17 
        }
        console.log('result:', result)

        expect(result).toEqual(favorite)

    })
})