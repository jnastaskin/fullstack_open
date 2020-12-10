/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3033/api/testing/reset')
    const user = {
      name: 'jake nastaskin',
      username: 'jnastaskin',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3033/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('jnastaskin')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('jake nastaskin is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('jna')
      cy.get('#password').type('pa')
      cy.get('#login-button').click()
      
      cy.contains('Wrong credentials')
      // cy.get('.notification').contains('Wrong credentials')
    })
  })

  describe.only('When logged in', function (){
    beforeEach(function(){
      cy.login({ username: 'jnastaskin', password: 'password' })
      // cy.get('#username').type('jnastaskin')
      // cy.get('#password').type('password')
      // cy.get('#login-button').click()
    })
    it('A new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('new title')
      cy.get('#author').type('new author')
      cy.get('#url').type('new url')
      cy.get('#createNewBlog').click()

      cy.contains('new title new author')

    })
    it('A blog can be liked', function (){
      cy.createBlog ({
        title: 'hi',
        author: 'hello',
        url: 'hey'
      })

      cy.contains('hello')
      .contains('view').click()

      cy.get('#likeButton').click()
      cy.contains('likes 1')
    })

    it('A blog can be removed', function (){
      cy.createBlog ({
        title: 'hi',
        author: 'hello',
        url: 'hey'
      })
      cy.contains('hello')
      .contains('view').click()

      cy.get('#removeButton').click()
      cy.should('not.contain', 'hello')
    })

    it.only('Blogs are ordered by likes', function (){
      cy.createBlog ({
        title: 'b1',
        author: 'b1',
        url: 'b1'
      })

      cy.createBlog ({
        title: 'b2',
        author: 'b2',
        url: 'b2'
      })

      cy.createBlog ({
        title: 'b3',
        author: 'b3',
        url: 'b3'
      })

      cy.contains('b3').contains('view').click()
      cy.contains('b3').parent().find('.showAll').contains('like').click()

      cy.contains('b2').contains('view').click()
      cy.contains('b2').parent().find('.showAll').contains('like').click().click()
      cy.contains('b2').parent().find('.showAll').contains('like').click().click()

      cy.get('.blogDiv').then(blogDivs => {
        cy.wrap(blogDivs[0]).should('contain','b2')
        cy.wrap(blogDivs[1]).should('contain','b3')
        cy.wrap(blogDivs[2]).should('contain','b1')
        console.log(blogDivs)
      })
     
    })
  })

})