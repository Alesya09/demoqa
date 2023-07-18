import RadioButtonPage from "../../pages/Elements/radioButton.page";
describe('Radio Button', () => {
  beforeEach(function () {

    cy.visit('/radio-button')

  })
  it('Verify radio button', () => {
    RadioButtonPage.header.should('have.text', 'Do you like the site?')
    RadioButtonPage.checkYes.check({force: true}).should('be.checked')
    RadioButtonPage.verifyText.should('have.text', 'You have selected Yes')
    RadioButtonPage.checkYes.check({force: true}).should('be.checked')
    RadioButtonPage.checkImpressive.check({force: true}).should('be.checked')
    RadioButtonPage.verifyText.should('have.text', 'You have selected Impressive')
    RadioButtonPage.checkNo.should('be.disabled')
  })
})
