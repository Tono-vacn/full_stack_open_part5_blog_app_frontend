describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'test_cy',
            username: 'test_cy',
            password: 'test_cy'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function() {
        cy.contains('Blog App')
    // cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
    })

    describe('Login',function(){

        it('login form can be opened', function() {
            cy.contains('login').click()
            cy.get('#username').type('test_cy')
            cy.get('#password').type('test_cy')
            cy.get('#login-button').click()

            cy.contains('test_cy logged in')
        })
        it('login fails with wrong password', function() {
            cy.contains('login').click()
            cy.get('#username').type('test_cy')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            //cy.contains('invalid username or password')
            cy.get('.error')
                .should('contain', 'invalid username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')

            cy.get('html').should('not.contain', 'test_cy logged in')
        })
    })


    describe('when logged in', function() {
        beforeEach(function() {
            // cy.contains('login').click()
            // cy.get('input:first').type('test_cy')
            // cy.get('input:last').type('test_cy')
            // cy.get('#login-button').click()

            // cy.request('POST', 'http://localhost:3001/api/login', {
            //     username: 'test_cy', password: 'test_cy'
            // }).then(response => {
            //     localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
            //     cy.visit('http://localhost:3000')
            // })

            cy.login({ username: 'test_cy', password: 'test_cy' })
        })

        it('a new blog can be created', function() {
            cy.contains('create new blog').click()
            cy.get('#title').type('a blog created by cypress')
            cy.get('#author').type('cypress')
            cy.get('#url').type('www.cypress.com')
            cy.get('#create-button').click()
            cy.contains('a blog created by cypress')
        })

        describe('and a blog exists', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'a blog cypress',
                    author: 'cypress',
                    url: 'www.cypress.com'
                })
                cy.createBlog({
                    title: 'b blog cypress',
                    author: 'cypress',
                    url: 'www.cypress.com'
                })
                // cy.contains('create new blog').click()
                // cy.get('#title').type('a blog created by cypress')
                // cy.get('#author').type('cypress')
                // cy.get('#url').type('www.cypress.com')
                // cy.get('#create-button').click()
            })

            it('a blog can be liked', function () {
                cy.contains('b blog cypress').contains('view').click()
                cy.contains('b blog cypress').parent().find('button').contains('like').click()
                cy.contains('b blog cypress').contains('view').click()
                cy.contains('b blog cypress')
                cy.contains('1 likes')
            })

            it('a blog can be deleted by the user who created it', function () {
                cy.contains('b blog cypress').contains('view').click()
                cy.contains('b blog cypress').parent().find('button').contains('delete').click()
                cy.get('html').should('not.contain', 'b blog cypress')
            })

            // it.only('a blog cannot be deleted by the user who did not create it', function () {
            //     cy.contains('logout').click()
            //     const user = {
            //         name: 'test_cy2',
            //         username: 'test_cy2',
            //         password: 'test_cy2'
            //     }
            //     cy.request('POST', 'http://localhost:3001/api/users/', user)
            //     cy.login({ username: 'test_cy2', password: 'test_cy2' })
            //     cy.contains('b blog cypress').contains('view').click()
            //     cy.contains('b blog cypress').parent().find('button').should('not.contain', 'delete')
            // })

            it('blogs are ordered according to likes', function () {
                cy.contains('a blog cypress').contains('view').click()
                cy.contains('a blog cypress').parent().find('button').contains('like').click()
                //wait for 1 second
                cy.wait(1000)
                cy.contains('a blog cypress').contains('view').click()
                cy.contains('a blog cypress').parent().find('button').contains('like').click()
                cy.wait(1000)
                cy.contains('b blog cypress').contains('view').click()
                cy.contains('b blog cypress').parent().find('button').contains('like').click()
                cy.wait(1000)
                cy.contains('b blog cypress').contains('view').click()
                cy.contains('b blog cypress').parent().find('button').contains('like').click()
                cy.wait(1000)
                cy.contains('b blog cypress').contains('view').click()
                cy.contains('b blog cypress').parent().find('button').contains('like').click()
                cy.wait(1000)
                cy.contains('b blog cypress').contains('view').click()
                cy.contains('b blog cypress').parent().find('button').contains('like').click()
                cy.get('.blog').eq(0).contains('b blog cypress')
                cy.get('.blog').eq(1).contains('a blog cypress')

            })
        })
    })
})