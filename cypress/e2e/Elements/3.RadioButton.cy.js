describe('Radio Button', () => {
  beforeEach(function () {

    cy.visit('/radio-button')

  })
  it('Verify radio button', () => {
    cy.get('.mb-3').should('have.text', 'Do you like the site?')
    cy.get('input#yesRadio').check({force: true}).should('be.checked')
    cy.get('div .mt-3').should('have.text', 'You have selected Yes')
    cy.get('input#yesRadio').check({force: true}).should('be.checked')
    cy.get('input#impressiveRadio').check({force: true}).should('be.checked')
    cy.get('div .mt-3').should('have.text', 'You have selected Impressive')
    cy.get('input#noRadio').should('be.disabled')
  })
})
