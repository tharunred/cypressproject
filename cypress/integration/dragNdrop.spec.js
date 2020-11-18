context('Drag and Drop Test', () => {

    beforeEach(() => {
        cy.visit('/drag_and_drop');

    })
    describe('Test Drag and Drop Feature', () => {


        let dataTransfer = new DataTransfer;

        function dnd(source, destination) {
            cy.get(source)
                .trigger('dragstart', {
                    dataTransfer
                });

            cy.get(destination)
                .trigger('drop', {
                    dataTransfer
                });

            cy.get(source)
                .trigger('dragend', {
                    dataTransfer
                });
        }

        it('Drags the object and drops at desired location', () => {
            dnd('#column-a', '#column-b')
            cy.get('#column-b').contains('header', 'A')
            dnd('#column-a', '#column-b')
            cy.get('#column-b').contains('header', 'B')

        });

    });
})