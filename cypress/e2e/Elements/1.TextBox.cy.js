import TextBoxPage from "../../pages/Elements/textBox.page";
describe('Elements', () => {
  beforeEach(function () {

    cy.visit('/elements')
    cy.fixture("elements.json").as("elementsMenuData")

  })

  it('1.Verify Elements', () => {

    TextBoxPage.headerElements.should('include.text', 'Element')
  })

  it('2.Verify menu list Elements page', function () {
    TextBoxPage.menuList.should('be.visible')
    this.elementsMenuData.listElements.forEach(($el) =>
        TextBoxPage.menuList.should('contain', `${$el}`)
    )
  })

  it('3.Verify text box', () => {
    TextBoxPage.btnTextBox.contains('Text Box').click()
    cy.url('//text-box')
    TextBoxPage.userNameLabel.should( 'have.text','Full Name')
    TextBoxPage.userEmailLabel.should('include.text', 'Email')
    TextBoxPage.userCurrentAddressLabel.should('include.text', 'Current Address')
    TextBoxPage.userPermanentAddressLabel.should('include.text', 'Permanent Address')
    TextBoxPage.btnSubmit.should('include.text', 'Submit')
  })

  it('4.Fill text box', () => {
    let name = 'Alice Po'
    let email = 'alice@gmail.com'
    let address = '123 Rou Rd, CA, 12345'

    TextBoxPage.btnTextBox.contains('Text Box').click()
    TextBoxPage.userName.type(name).should('have.value', name)
    TextBoxPage.userEmail.type(email).should('have.value', email)
    TextBoxPage.userCurrentAddress.type(address).should('have.value', address)
    TextBoxPage.btnSubmit.should('be.visible', 'Submit').click()

    TextBoxPage.outputInform.should('be.visible')
    TextBoxPage.outputInformName.should('contain', 'Name:', name)
    TextBoxPage.outputInformEmail.should('contain', 'Email:', email)
    TextBoxPage.outputInformCurrentAddress.should('contain', 'Current Address :', address)
  })

  it('5. Check red border when not correct input email', () => {
    TextBoxPage.btnTextBox.contains('Text Box').click()
    TextBoxPage.userEmail.type('asdfgmail.com').should('have.value','asdfgmail.com' )
    TextBoxPage.btnSubmit.should('be.visible', 'Submit').click()
    TextBoxPage.fieldError.should('have.css', 'border', '1px solid rgb(255, 0, 0)')
  })
})
