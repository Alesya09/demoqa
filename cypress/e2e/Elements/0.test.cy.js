import TestPage from "../../pages/Elements/test.page";
describe('Common methods', () => {
  beforeEach(function () {

    cy.visit('/')

    cy.fixture("main.json").as("mainData")

  })

  it('1.Main page', () => {

    TestPage.iconAvatar.should('be.visible')
    TestPage.cardNames.should('have.length', 6)
    TestPage.cardName.find('h5').should('have.length', 6)
    TestPage.cardNames.contains('Elements').click()
  })

  it('2.Verify all card on main page', function () {
    TestPage.cardNames.should('be.visible')
    this.mainData.cardBody.forEach(($el) =>
      cy.get('div.card-body h5').should('contain', `${$el}`)
    )
  })
})

