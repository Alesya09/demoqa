class TextBoxPage{
    get headerElements() { return cy.get('div.main-header') }
    get menuList() { return cy.get('.menu-list') }
    get btnTextBox() { return cy.get('.btn#item-0') }
    get userNameLabel() { return cy.get('#userName-label') }
    get userEmailLabel() { return cy.get('#userEmail-label') }
    get userCurrentAddressLabel() { return cy.get('#currentAddress-label') }
    get userPermanentAddressLabel() { return cy.get('#permanentAddress-label') }
    get btnSubmit() { return cy.get('#submit') }
    get userName() { return cy.get('#userName') }
    get userEmail() { return cy.get('#userEmail') }
    get userCurrentAddress() { return cy.get('#currentAddress') }
    get outputInform() { return cy.get('#output') }
    get outputInformName() { return cy.get('p#name') }
    get outputInformEmail() { return cy.get('p#email') }
    get outputInformCurrentAddress() { return cy.get('p#currentAddress') }
    get fieldError() { return cy.get('.field-error') }


}
export default new TextBoxPage()
