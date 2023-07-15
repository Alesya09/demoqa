describe('Dynamic Properties', () => {
    beforeEach(function () {

        cy.visit('/dynamic-properties')
    })

    it('1. Check dynamic elements', () => {
        cy.get('.main-header').should('have.text', 'Dynamic Properties')
        cy.get('.btn-primary').should('have.css', 'color' ).and('eq','rgb(255, 255, 255)')
        cy.get('#visibleAfter').should('not.exist')
        cy.contains('This text has random Id').should('exist')
        cy.get('button#enableAfter').should('have.text', 'Will enable 5 seconds').wait(5000)
        cy.get('#visibleAfter').should('exist').and('have.text', 'Visible After 5 Seconds')
        cy.get('#colorChange').should('have.text', 'Color Change')
        cy.get('.text-danger').should('have.css', 'color' ).and('eq','rgb(220, 53, 69)')
    })
})