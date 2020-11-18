context('Infinite Scroll Test', () => {
    beforeEach(() => {
        cy.visit('/infinite_scroll');

    })
    describe('Test Inifinite Scroll Feature', () => {
        it('should scroll until end of the page', () => {
            cy.get('.jscroll-inner').find('.jscroll-added').should('have.length', 2)

            function getLength() {

                cy.get('.jscroll-inner').find('.jscroll-added').then(paragraph => {
                    let length = Cypress.$(paragraph).length
                });

                return length
            }
            for (let p = 2; p >= getLength(); p++) {
                cy.scrollTo('bottom', {
                    duration: 2000
                })
                cy.get('.jscroll-inner').find('.jscroll-added')
                    .children()
                    .then(children => {
                        cy.wrap(children)
                            .its('length')
                            .should('be.gt', p + 1)
                    })
                //Break after 10 scrolls
                if (p == 12) {
                    break;
                }
            };

        });
    });
});