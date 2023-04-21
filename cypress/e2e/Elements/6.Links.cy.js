describe('Buttons', () => {

  const API_BASE_URL = Cypress.env('apiBaseUrl')

  beforeEach(function () {

    cy.visit('/links')
    cy.fixture("links.json").as("linksData")

  })
  it('1. Following links will open new tab', () => {
    cy.get('h5 strong').should('contain', 'Following links will open new tab')
    cy.get('#simpleLink').should('have.text', 'Home')
    cy.get('#simpleLink').invoke('removeAttr', 'target').click()
    cy.url().should('include', '/')
  })

  it('2. Following links will open new tab 2', () => {
    cy.get('h5 strong').should('contain', 'Following links will open new tab')
    cy.get('#dynamicLink').should('contain', 'Home')
    cy.get('#dynamicLink').invoke('removeAttr', 'target').click()
    cy.url().should('include', '/')
  })

  it('3. Following links will send an api call', function () {
    cy.get('h5 strong').should('contain', 'Following links will send an api call')
    cy.get('#linkWrapper').should('be.visible')
    this.linksData.linksElements.forEach(($el) =>
      cy.get('#linkWrapper p').should('contain', `${$el}`)
    )
  })

  it('4.API call link Created', () => {
    cy.get('#linkResponse').should('not.exist')
    cy.get('#created').contains('Created').click()
    cy.get('#linkResponse').should('have.text', 'Link has responded with staus 201 and status text Created')
      .should('exist').and('be.visible')
    const getResponse = () =>
      cy.request({
        method: "GET",
        url: `https://demoqa.com/created`
      })
    getResponse()
      .its('status')
      .should('be.eq', 201)
  })

  it('5.API call link - No Content', () => {
    cy.get('#linkResponse').should('not.exist')
    cy.get('#no-content').contains('No Content').click()
    cy.get('#linkResponse').should('have.text', 'Link has responded with staus 204 and status text No Content')
      .should('exist').and('be.visible')
    const getResponse = () =>
      cy.request({
        method: "GET",
        url: `${API_BASE_URL}/no-content`
      })
    getResponse()
      .its('status')
      .should('be.eq', 204)
  })

  it('6.API call link - Moved', () => {
    cy.get('#linkResponse').should('not.exist')
    cy.get('#moved').contains('Moved').click()
    cy.get('#linkResponse').should('have.text', 'Link has responded with staus 301 and status text Moved Permanently')
      .should('exist').and('be.visible')
    const getResponse = () =>
      cy.request({
        method: "GET",
        url: `${API_BASE_URL}/moved`
      })
    getResponse()
      .its('status')
      .should('be.eq', 301)
  })

  it('7.API call link - Bad Request', () => {
    cy.get('#linkResponse').should('not.exist')
    cy.get('#bad-request').contains('Bad Request').click()
    cy.get('#linkResponse').should('have.text', 'Link has responded with staus 400 and status text Bad Request')
      .should('exist').and('be.visible')

    cy.request({
      method: 'GET',
      url: `${API_BASE_URL}/bad-request`,
      failOnStatusCode:false,
    }).then((resp) => {
      expect(resp.status).to.eq(400)
    })
  })

  it('8.API call link - Unauthorized', () => {
    cy.get('#linkResponse').should('not.exist')
    cy.get('#unauthorized').contains('Unauthorized').click()
    cy.get('#linkResponse').should('have.text', 'Link has responded with staus 401 and status text Unauthorized')
      .should('exist').and('be.visible')
    cy.request({
      method: 'GET',
      url: `${API_BASE_URL}/unauthorized`,
      failOnStatusCode:false,
    }).then((resp) => {
      expect(resp.status).to.eq(401)
    })
  })

  it('9.API call link - Forbidden', () => {
    cy.get('#linkResponse').should('not.exist')
    cy.get('#forbidden').contains('Forbidden').click()
    cy.get('#linkResponse').should('have.text', 'Link has responded with staus 403 and status text Forbidden')
      .should('exist').and('be.visible')
    cy.request({
      method: 'GET',
      url: `${API_BASE_URL}/forbidden`,
      failOnStatusCode:false,
    }).then((resp) => {
      expect(resp.status).to.eq(403)
    })
  })

  it('10.API call link - Not Found', () => {
    cy.get('#linkResponse').should('not.exist')
    cy.get('#invalid-url').contains('Not Found').click()
    cy.get('#linkResponse').should('have.text', 'Link has responded with staus 404 and status text Not Found')
      .should('exist').and('be.visible')
    cy.request({
      method: 'GET',
      url: `${API_BASE_URL}/invalid-url`,
      failOnStatusCode:false,
    }).then((resp) => {
      expect(resp.status).to.eq(404)
    })
  })
})
