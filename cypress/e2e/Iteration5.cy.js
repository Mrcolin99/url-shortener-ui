describe('Error Handling', () => {
    beforeEach(() => {
        cy.intercept({
            method: 'GET',
            url: 'http://localhost:3001/api/v1/urls'
        }, { fixture: 'testUrl' })
        cy.visit('http://localhost:3000/')
    })
    it('should not let you submit a form with empty values', () => {
        cy.get('[name="title"]').type('Hello')
        cy.get('button').click()
        cy.get('form > p').contains('please fill out both input fields')
    })
    it('should let you know when there is an error with your post', () => {
        cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
            statusCode: 500
        })
        cy.get('[name="title"]')
            .type('Hello')
        cy.get('[name="urlToShorten"]')
            .type('world')
        cy.get('button').click()
        cy.get('.App > :nth-child(2)').contains('THERE WAS AN ERROR ADDING THIS URL')
    })
})