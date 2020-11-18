context('iframe tests', () => {
  beforeEach(() => {
    cy.visit('/iframe');
    cy.get('body').then($body => {
      if ($body.find("#mceu_34 > button", {
          timeout: 10000
        })) {

        cy.get('#mceu_34 > button').click();

      }
    })
  })

  describe('Test iframes', () => {


    let getIframeDocument = () => {
      return cy
        .get('#mce_0_ifr')
        .its('0.contentDocument').should('exist')
    }

    let getIframeBody = () => {
      return getIframeDocument()
        .its('body').should('not.be.undefined')
        .then(cy.wrap)
    }

    it('types the text and format font style', () => {

      getIframeBody().find('p', {
        timeout: 10000
      }).should('have.text', 'Your content goes here.').clear()
      getIframeBody().find('p').type('First Line {enter}Second Line {enter}Third Line{selectall}')

      //Make text Bold
      cy.get('#mceu_18-open').click()
      cy.get('span').contains('Bold').click()
      //Assert text is changed to bold
      getIframeBody().find('p > strong').should(($labels) => {
        expect($labels).to.have.css('font-weight', '700'); //bold
      })

      //Make text Bold and italic
      cy.get('#mceu_18-open').click()
      cy.get('span').contains('Italic').click()
      //Assert text is changed to bold and italic
      getIframeBody().find('p > em > strong').should(($labels) => {
        expect($labels).to.have.css('font-weight', '700'); //bold
        expect($labels).to.have.css('font-style', 'italic'); //italic
      })


    })

    it('types the text and format text', () => {
      // Enter text
      getIframeBody().find('p', {
        timeout: 10000
      }).should('have.text', 'Your content goes here.').clear()
      getIframeBody().find('p').type('First Line {enter}Second Line {enter}Third Line{selectall}')

      //select Bullet list
      cy.get('#mceu_9 > button').click()
      //assert 
      getIframeBody().find('ul > li').should(($labels) => {
        expect($labels).to.have.css('list-style-type', 'disc');

      })

      //select Numbered list
      cy.get('#mceu_10 > button').click()
      //assert 
      getIframeBody().find('ol > li').should(($labels) => {
        expect($labels).to.have.css('list-style-type', 'decimal');

      })
    })

  })
});