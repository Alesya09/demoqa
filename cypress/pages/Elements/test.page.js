class TestPage{
    get iconAvatar() { return cy.get('header a img') }
    get cardNames() { return cy.get('div.card-body h5') }
    get cardName() { return cy.get('div.card-body') }

}

export default new TestPage()
