describe('Iteration4', () => {
    beforeEach(() => {
        cy.intercept({
            method: 'GET',
            url: 'http://localhost:3001/api/v1/urls'
        }, { fixture: 'testUrl' })
        cy.visit('http://localhost:3000/')
    })
    it('should be able to add an idea', () => {
        cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
            statusCode: 201,
            body: {
                id: '4',
                title: 'Hello',
                long_url: 'world',
                short_url: 'http://localhost:3001/useshorturl/4'

            }
        })
        cy.get('[name="title"]')
            .type('Hello')
        cy.get('[name="urlToShorten"]')
            .type('world')
        cy.get('button').click()
    })
})