describe('Forms', () => {
  beforeEach(function () {

    cy.visit('/')

  })

  it('1. Forms', () => {

    cy.get('header a img').should('be.visible')
    cy.get('div.card-body h5').contains('Forms').click()
    cy.url('/forms')
    cy.get('.main-header').should('have.text', 'Forms')
    cy.contains('Please select an item from left to start practice.').should('be.visible')
  })

  it('2. Practice forms open', () => {
    cy.visit('/forms')
    cy.get('.btn#item-0').contains( 'Practice Form').click()
    cy.url('/automation-practice-form')
    cy.get('h5').should('have.text', 'Student Registration Form')
  })

  it('3. Practice forms verify all label-elements', () => {
    cy.visit('/automation-practice-form')
    cy.get('h5').should('have.text', 'Student Registration Form')
    cy.get('#userName-label').should( 'have.text','Name')
    cy.get('#userEmail-label').should( 'have.text','Email')
    cy.get('#genterWrapper > .col-md-3').should( 'have.text','Gender')
    cy.get('label[for="gender-radio-1"]').should( 'have.text','Male')
    cy.get('label[for="gender-radio-2"]').should( 'have.text','Female')
    cy.get('label[for="gender-radio-3"]').should( 'have.text','Other')
    cy.get('#userNumber-label').should( 'have.text','Mobile(10 Digits)')
    cy.get('#dateOfBirth-label').should( 'have.text','Date of Birth')
    cy.get('#subjectsWrapper #subjects-label').should( 'have.text','Subjects')
    cy.get('div#hobbiesWrapper  label#subjects-label').should( 'have.text','Hobbies')
    cy.get('label[for="hobbies-checkbox-1"]').should( 'have.text','Sports')
    cy.get('label[for="hobbies-checkbox-2"]').should( 'have.text','Reading')
    cy.get('label[for="hobbies-checkbox-3"]').should( 'have.text','Music')
    cy.get('div:nth-of-type(8) > .col-md-3 > label#subjects-label').should( 'have.text','Picture')
    cy.get('.form-file-label').should( 'have.text','Select picture')
    cy.get('#currentAddress-label').should( 'have.text','Current Address')
    cy.get('#stateCity-label').should( 'have.text','State and City')
  })

  it.only('4. Practice forms check placeholder and fill All forms', () => {

    let firstName = 'Alice'
    let lastName = 'Po'
    let email = 'alice@gmail.com'
    let phone = 1234567890
    let inputSubject = 'Hello World 123!'
    let address = '123 Rou Rd, CA, 12345'

    cy.visit('/automation-practice-form')
    cy.get('#firstName')
        .should('have.attr', 'placeholder', 'First Name')
        .type(firstName, {force: true}).and('have.value', firstName)
    cy.get('#lastName')
        .should('have.attr', 'placeholder', 'Last Name')
        .type(lastName, {force: true}).and('have.value', lastName)
    cy.get('#userEmail')
        .should('have.attr', 'placeholder', 'name@example.com')
        .type(email, {force: true}).and('have.value', email)
    cy.get('#gender-radio-1').check({force: true}).should('be.checked')
    cy.get('#gender-radio-2').check({force: true}).should('be.checked')
    cy.get('#gender-radio-1').should('not.be.checked')
    cy.get('#userNumber')
        .should('have.attr', 'placeholder', 'Mobile Number')
        .type(phone, {force: true}).and('have.value', phone)
    cy.get('#subjectsInput')
        .type(inputSubject, {force: true}).should('have.value', inputSubject)
    cy.get('#hobbies-checkbox-1').click({force: true}).should('be.checked')
    cy.get('#hobbies-checkbox-1').click({force: true}).should('not.be.checked')
    cy.get('#hobbies-checkbox-3').click({force: true}).should('be.checked')
    cy.get('#hobbies-checkbox-3').click({force: true}).should('not.be.checked')
    cy.get('#hobbies-checkbox-2').click({force: true}).should('be.checked')
    cy.get('#hobbies-checkbox-2').click({force: true}).should('not.be.checked')
    cy.get('#hobbies-checkbox-2').click({force: true}).should('be.checked')
    cy.get('#currentAddress')
        .should('have.attr', 'placeholder', 'Current Address')
        .type(address, {force: true}).and('have.value', address)

    cy.get('div#state .css-1hwfws3').should('be.visible').then((el) => {
      cy.wrap(el).click({force: true});
    });
    cy.get('.css-26l3qy-menu').contains('NCR').click({force: true});

    cy.get('div#city .css-1hwfws3').should('be.visible').then((el) => {
      cy.wrap(el).click({force: true});
    });
    cy.get('.css-26l3qy-menu').contains('Delhi').click({force: true});

    // NCR, Rajasthan,Uttar Pradesh,Haryana. Uttar Pradesh = Agra, Lucknow, Merrut. NCR = Delhi, Gurgaon, Noida.
    // Rajasthan=Jaipur, Jaiselmer. Haryana =Karnal, Panipat.
    cy. get('#submit').click({force: true})

    cy.get('#example-modal-sizes-title-lg').contains('Thanks for submitting the form').should('be.visible')
    
  })
})
