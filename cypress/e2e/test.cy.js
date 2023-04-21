describe('Common methods', () => {
  beforeEach(function () {

    cy.visit('/')

    cy.fixture("main.json").as("mainData")

  })

  it('1.Main page', () => {

    cy.get('header a img').should('be.visible')
    cy.get('div.card-body h5').should('have.length', 6)
    cy.get('div.card-body').find('h5').should('have.length', 6)
    cy.get('div.card-body h5').contains('Elements').click()
  })

  it('2.Verify all card on main page', function () {
    cy.get('div.card-body h5').should('be.visible')
    this.mainData.cardBody.forEach(($el) =>
      cy.get('div.card-body h5').should('contain', `${$el}`)
    )
  })
})

