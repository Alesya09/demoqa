describe('Check Box', () => {
  beforeEach(function () {

    cy.visit('/elements')
    cy.get('.show #item-1 > span').contains('Check Box').should('be.visible').click()
    cy.fixture("checkBox.json").as("checkBoxData")

  })

  it('1.Verify check box', () => {
    cy.get('.btn#item-1').contains('Check Box').should('be.visible').click()
    cy.url('/checkbox').should('include', '/checkbox')
    cy.get('.main-header').should( 'have.text','Check Box')
    cy.get('.rct-icon-expand-open').should('not.exist')
    cy.get('button .rct-icon-expand-all').should('be.visible').click()
    cy.get('.rct-icon-expand-open').should('exist')
    cy.get('.rct-icon-collapse-all').should('be.visible').click()
  })

  it('2.All elements checkBox check and uncheck', function (){
    cy.get('.btn#item-1').contains('Check Box').should('be.visible').click()
    cy.url('/checkbox')
    cy.get('button .rct-icon-expand-all').should('be.visible').click()

    cy.get('.rct-title').each(($el, idx) => {
      expect($el.text()).to.include(this.checkBoxData.allElementsCheckBox[idx])
    })

    cy.get('[type="checkbox"]').as('checkboxes')
      .first()
      .check({force: true}).should('be.checked')
    cy.get('@checkboxes')
      .each(checkbox=> {
        expect(checkbox[0].checked).to.equal(true)
      })
    cy.get('#result').should('contain', 'You have selected').and('exist')

    cy.get('[type="checkbox"]')
      .first()
      .uncheck({force:true}).should('not.be.checked')
    cy.get('#result').should('not.exist')
  })

  it.only('3.Check each element separate', function (){
    cy.get('.btn#item-1').contains('Check Box').should('be.visible').click()

    // cy.get('button[aria-label=Toggle]').click()
    // cy.get('ol li:nth-child(3) button').click()
    // cy.contains('Excel File.doc').click()

    cy.get('span .rct-title').should('contain', 'Home')
    cy.get('#result').should('not.exist')
    cy.get('[type="checkbox"]').check({force:true}).should('be.checked')
    cy.get('#result').should('exist')
    cy.get('#result').should('contain', 'You have selected')
  })


  it('4.Open check box', function (){
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


