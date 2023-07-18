import CheckBoxPage from "../../pages/Elements/checkBox.page";

describe('Check Box', () => {
  beforeEach(function () {

    cy.visit('/elements')
    cy.get('.show #item-1 > span').contains('Check Box').should('be.visible').click()
    cy.fixture("checkBox.json").as("checkBoxData")

  })

  it('1.Verify check box', () => {
    CheckBoxPage.btnMenuCheckBox.contains('Check Box').should('be.visible').click()
    cy.url('/checkbox').should('include', '/checkbox')
    CheckBoxPage.mainHeader.should( 'have.text','Check Box')
    CheckBoxPage.iconExpandOpen.should('not.exist')
    CheckBoxPage.iconExpandAll.should('be.visible').click()
    CheckBoxPage.iconExpandOpen.should('exist')
    CheckBoxPage.iconCollapseAll.should('be.visible').click()
  })

  it('2.All elements checkBox check and uncheck', function (){
    CheckBoxPage.btnMenuCheckBox.contains('Check Box').should('be.visible').click()
    cy.url('/checkbox')
    cy.get('button .rct-icon-expand-all').should('be.visible').click()

    CheckBoxPage.titlesCheckBoxes.each(($el, idx) => {
      expect($el.text()).to.include(this.checkBoxData.allElementsCheckBox[idx])
    })

    cy.get('[type="checkbox"]').as('checkboxes')
      .first()
      .check({force: true}).should('be.checked')
    cy.get('@checkboxes')
      .each(checkbox=> {
        expect(checkbox[0].checked).to.equal(true)
      })
    CheckBoxPage.resultAfterCheck.should('contain', 'You have selected').and('exist')

    cy.get('@checkboxes')
      .first()
      .uncheck({force:true}).should('not.be.checked')
    cy.get('#result').should('not.exist')
  })

  it('3.Check each element separate', function (){
    CheckBoxPage.btnMenuCheckBox.contains('Check Box').should('be.visible').click()

    // cy.get('button[aria-label=Toggle]').click()
    // cy.get('ol li:nth-child(3) button').click()
    // cy.contains('Excel File.doc').click()

    cy.get('span .rct-title').should('contain', 'Home')
    CheckBoxPage.resultAfterCheck.should('not.exist')
    cy.get('[type="checkbox"]').check({force:true}).should('be.checked')
    CheckBoxPage.resultAfterCheck.should('exist')
    CheckBoxPage.resultAfterCheck.should('contain', 'You have selected')
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
    CheckBoxPage.resultAfterCheck.should('contain', 'You have selected')
  })
})


