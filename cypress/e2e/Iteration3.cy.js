describe('Iteration 3', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: 'http://localhost:3001/api/v1/urls'
    }, { fixture: 'testUrl' })
    cy.visit('http://localhost:3000/')
  })
  it('should display a title and urls', () => {
    cy.get('h1').contains('URL Shortener')
    cy.get(':nth-child(1) > h3').contains('Test1')
    cy.get(':nth-child(2) > h3').contains('Test2')
    cy.get(':nth-child(3) > h3').contains('Test3')
  })
  it('should have a form', () => {
    cy.get('form')
    cy.get('[name="title"]').should('have.value', '')
    cy.get('[name="urlToShorten"]').should('have.value', '')
    cy.get('button').contains('Shorten Please!')
  })
  it('should be able to enter something into the input fields', () => {
    cy.get('[name="title"]')
    .type('Hello')
    .should('have.value', 'Hello')
    cy.get('[name="urlToShorten"]')
    .type('world')
    .should('have.value', 'world')
  })
})