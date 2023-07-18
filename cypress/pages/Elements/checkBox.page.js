class CheckBoxPage{
    get btnMenuCheckBox() { return cy.get('.btn#item-1') }
    get mainHeader() { return cy.get('.main-header') }
    get checkImpressive() { return cy.get('input#impressiveRadio') }
    get resultAfterCheck() { return cy.get('#result') }
    get iconExpandOpen() { return cy.get('.rct-icon-expand-open') }
    get iconExpandAll() { return cy.get('button .rct-icon-expand-all') }
    get iconCollapseAll() { return cy.get('.rct-icon-collapse-all') }
    get titlesCheckBoxes() { return cy.get('.rct-title') }

}

export default new CheckBoxPage()
