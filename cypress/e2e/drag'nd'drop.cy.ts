describe('drag and drop', () => {
	it('passes', () => {
		cy.visit('http://localhost:3000');
		cy.get('[name="userId"]').type('hello');
		cy.get('[name="password"]').type('hello');
		cy.get('button').click();

		cy.get('.tool-menu-container')
			.trigger('mousedown', { which: 0, force: true })
			.trigger('mousemove', 200, -200, { force: true })
			.trigger('mouseup');

		cy.get(':nth-child(5) > label').click();
		cy.get('.color-menu > div')
			.trigger('mousedown', { which: 0, force: true })
			.trigger('mousemove', 200, 100, { force: true });

		cy.get(':nth-child(8) > label').click();
		cy.get('#details-form')
			.trigger('mousedown', { which: 0, force: true })
			.trigger('mousemove', 200, -100, { force: true });

		cy.get(':nth-child(9) > label').click();
		cy.get('.text-menu-container')
			.trigger('mousedown', { which: 0, force: true })
			.trigger('mousemove', 200, 300, { force: true });
	});
});
