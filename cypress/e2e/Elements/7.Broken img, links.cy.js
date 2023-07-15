describe('Broken link - images', () => {

  beforeEach(function () {

    cy.visit('/broken')
  })

  it('1. Verify Valid image', () => {
    cy.get('div p').should('contain', 'Valid image')
    cy.get('div > [src="/images/Toolsqa.jpg"]').should('be.visible')

    // 1. Select all image (`img`) elements on the page.
    cy.get('div > [src="/images/Toolsqa.jpg"]').each(($img) => {
      // 2. Scroll the image into view and check if it's visible.
      cy.wrap($img).scrollIntoView().should('be.visible');

      // 3. Ensure the natural width and height is greater than 0.
      expect($img[0].naturalWidth).to.be.greaterThan(0);
      expect($img[0].naturalHeight).to.be.greaterThan(0);
    });
  });

  it.skip('2. Verify Broken image', () => {
    cy.get('div p').should('contain', 'Broken image')

    // 1. Select all image (`img`) elements on the page.
    cy.get('div > [src="/images/Toolsqa_1.jpg"]').each(($img) => {
      // 2. Scroll the image into view and check if it's visible.
      cy.wrap($img).scrollIntoView().should('be.visible');

      // 3. Ensure the natural width and height is greater than 0.
      expect($img[0].naturalWidth).to.be.equal(0);
      expect($img[0].naturalHeight).to.be.equal(0);
    });
  });

  it('3. Verify Valid Link', () => {
    cy.get('div p').should('contain', 'Valid Link')
    cy.get('a[href="http://demoqa.com"]').should('contain', 'Click Here for Valid Link')

    cy.get('a[href="http://demoqa.com"]').should('have.attr', 'href')
      .and('include', 'http://demoqa.com')

    cy.get('a[href="http://demoqa.com"]').each(link => {
      if (link.prop('href'))
        cy.request({
          url: link.prop('href'),
          failOnStatusCode: false
        }).then(response => {
          url: 'http://demoqa.com',
            expect(response.status).to.eq(200)
        })
      cy.log( link.prop('href'))
    })

  })

  it('4. Find all broken links', () => {
    cy.get('div p').should('contain', 'Broken Link')
    cy.get('a[href="http://the-internet.herokuapp.com/status_codes/500"]').should('contain', 'Click Here for Broken Link')

    cy.get('a[href="http://the-internet.herokuapp.com/status_codes/500"]')
      .should('have.attr', 'href')
      .and('include', 'http://the-internet.herokuapp.com/status_codes/500')

    cy.get('a[href="http://the-internet.herokuapp.com/status_codes/500"]').each(link => {
      if (link.prop('href'))
        cy.request({
          url: link.prop('href'),
          failOnStatusCode: false
        }).then(response => {
          url: 'http://the-internet.herokuapp.com/status_codes/500',
            expect(response.status).to.eq(500)
        })
      cy.log( link.prop('href'))
    })
  })

})
