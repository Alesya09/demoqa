class RadioButtonPage{
    get header() { return cy.get('.mb-3') }
    get checkYes() { return cy.get('input#yesRadio') }
    get checkImpressive() { return cy.get('input#impressiveRadio') }
    get checkNo() { return cy.get('input#noRadio') }
    get verifyText() { return cy.get('div .mt-3') }

}

export default new RadioButtonPage()
