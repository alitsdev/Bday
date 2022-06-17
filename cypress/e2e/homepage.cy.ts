describe('homepage', () => {
	it('passes', () => {
		cy.visit('http://localhost:3000');
		cy.get('[name="userId"]').type('hello');
		cy.get('[name="password"]').type('hello');
		cy.get('button').click();
	});
});
