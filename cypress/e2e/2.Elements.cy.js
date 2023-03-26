describe('Elements', () => {
  beforeEach(function () {

    cy.visit('/elements')

    cy.fixture("elements.json").as("elementsMenuData")
  })

  it('1.Verify Elements', () => {

  cy.get('div.main-header').should('have.text','Elements')
  cy.get('div.main-header').should('include.text', 'Element')
  })

  it('2.Verify menu list Elements page', function () {
    cy.get('.menu-list').should('be.visible')
    this.elementsMenuData.listElements.forEach(($el) =>
      cy.get('.menu-list').should('contain', `${$el}`)
    )
  })

  it('3.Verify text box', () => {
    cy.get('.btn#item-0').contains('Text Box').click()
    cy.get('#userName-label').should( 'have.text','Full Name')
    cy.get('#userEmail-label').should('include.text', 'Email')
    cy.get('#currentAddress-label').should('include.text', 'Current Address')
    cy.get('#permanentAddress-label').should('include.text', 'Permanent Address')
    cy.get('#submit').should('include.text', 'Submit')
  })

  it('4.Fill text box', () => {
    let name = 'Alice Po'
    let email = 'alice@gmail.com'
    let address = '123 Rou Rd, CA, 12345'

    cy.get('.btn#item-0').contains('Text Box').click()
    cy.get('#userName').type(name).should('have.value', name)
    cy.get('#userEmail').type(email).should('have.value', email)
    cy.get('#currentAddress').type(address).should('have.value', address)
    cy.get('#submit').should('be.visible', 'Submit').click()

    cy.get('#output').should('be.visible')
    cy.get('p#name').should('contain', 'Name:', name)
    cy.get('p#email').should('contain', 'Email:', email)
    cy.get('p#currentAddress').should('contain', 'Current Address :', address)
  })
})
