describe('homepage', () => {
	it('passes', () => {
		cy.visit('http://localhost:3000');
		cy.get('[name="userId"]').type('hello');
		cy.get('[name="password"]').type('hello');
		cy.get('button').click();
		cy.get(':nth-child(1) > label').click();
		cy.get(':nth-child(2) > label').click();
		cy.get(':nth-child(3) > label').click();
		cy.get(':nth-child(4) > label').click();
		cy.get(':nth-child(5) > label').click();
		cy.get(':nth-child(6) > label').click();
		cy.get(':nth-child(7) > label').click();
		cy.get(':nth-child(8) > label').click();
		cy.get(':nth-child(9) > label').click();
	});
});
