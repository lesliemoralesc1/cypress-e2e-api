describe('Task Example', () => {
    it('Logs a message using a task', () => {
        cy.task('logMessage', 'Hello, World!');

    })
    it('Calculates the sum of two numbers using a task', () => {
        cy.task('calculateSum', 5, 10).then((result) => {
            expect(result).to.equal(15);
        });
    })
})
