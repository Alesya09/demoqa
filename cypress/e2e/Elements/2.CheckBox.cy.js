describe('Check Box', () => {
  beforeEach(function () {

    cy.visit('/elements')
    cy.fixture("checkBox.json").as("checkBoxData")

  })

  it('1.Verify check box', () => {
    cy.get('.btn#item-1').contains('Check Box').should('be.visible').click()
    cy.url('/checkbox')
    cy.get('span .rct-title').should('contain', 'Home')
    cy.get('#result').should('not.exist')
    cy.get('[type="checkbox"]').check({force:true}).should('be.checked')
    cy.get('#result').should('exist')
    cy.get('#result').should('contain', 'You have selected')
  })

  it.only('2.Open check box', function (){
    cy.get('.btn#item-1').contains('Check Box').should('be.visible').click()
    cy.url('/checkbox')
    cy.get('button[aria-label=Toggle]').should('be.visible').click({force: true})
      this.checkBoxData.checkBoxHome.forEach(($el) =>
        cy.get('span .rct-title').should('contain', `${$el}`)
      )
    cy.get('button.rct-collapse').eq(1).click({force:true})
    this.checkBoxData.checkBoxDesktop.forEach(($el) =>
      cy.get('ol > li').eq(1).should('contain', `${$el}`)
    )
    cy.get('button.rct-collapse').eq(2).click({force:true})
    // this.checkBoxData.checkBoxDocuments.forEach(($el) =>
    //   cy.get('ol > li').should('contain', `${$el}`)
    // )

    cy.get('ol li:nth-child(3) button').click()
    cy.contains('Excel File.doc').click()
    cy.get('#result').should('contain', 'You have selected')
  })
})


