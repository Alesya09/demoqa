describe('Buttons', () => {
  beforeEach(function () {

    cy.visit('/buttons')

  })
  it('Verify double click button', () =>{
    // cy.url('/buttons')
    cy.get('button[id="doubleClickBtn"]').should('contain', 'Double Click Me').dblclick({force:true})
    cy.get('#doubleClickMessage').should('have.text', 'You have done a double click')
  })

  it('Verify button click me',  () => {
    cy.contains('Click Me').should('be.visible').click({force:true})
    // cy.get('p#dynamicClickMessage').should('have.text', 'You have done a dynamic click')
  })

  it('Verify button Click Me',  () => {
    cy.get('button[id="rightClickBtn"]').should('be.visible', 'Right Click Me').click({force:true})
  })
})
