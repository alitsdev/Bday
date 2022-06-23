describe('homepage', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000');
    cy.get('[name="userId"]').type('11');
    cy.get('[name="password"]').type('hello');
    cy.get('button').click();
    cy.url().should('include', '/11/template');
  });
});

describe('main functionality', () => {
  it('checkbox', () => {
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

describe('drag and drop containers', () => {
  it('drag and drop', () => {
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

describe('draw, paint and delete shapes', () => {
  it('a line', () => {
    cy.get('.tool-menu > :nth-child(1)').click();
    cy.get('#canvas')
      .trigger('mousedown', { which: 0, force: true })
      .trigger('mousemove', 0, 0)
      .trigger('mousemove', 200, 150, { force: true })
      .trigger('mouseup');
    cy.get('.tool-menu > :nth-child(5)').click();
    cy.get('#red').click();
    cy.get('#canvas').click(200, 150);
    cy.get('.tool-menu > :nth-child(7)').click();
    cy.get('#canvas')
      .trigger('mousedown', { which: 0, force: true })
      .trigger('mouseup');
  });

  it('a triangle', () => {
    cy.get('.tool-menu > :nth-child(2)').click();
    cy.get('#canvas')
      .trigger('mousedown', { which: 0, force: true })
      .trigger('mousemove', 0, 0)
      .trigger('mousemove', 50, 50, { force: true })
      .trigger('mouseup');
    cy.get('.tool-menu > :nth-child(5)').click();
    cy.get('#blue').click();
    cy.get('#canvas').click(50, 50);
    cy.get('.tool-menu > :nth-child(7)').click();
    cy.get('#canvas')
      .trigger('mousedown', { which: 0, force: true })
      .trigger('mouseup');
  });

  it('a rectangle', () => {
    cy.get('.tool-menu > :nth-child(3)').click();
    cy.get('#canvas')
      .trigger('mousedown', { which: 0, force: true })
      .trigger('mousemove', 0, 0)
      .trigger('mousemove', 200, 150, { force: true })
      .trigger('mouseup');
    cy.get('.tool-menu > :nth-child(5)').click();
    cy.get('#green').click();
    cy.get('#canvas').click(200, 150);
    cy.get('.tool-menu > :nth-child(7)').click();
    cy.get('#canvas')
      .trigger('mousedown', { which: 0, force: true })
      .trigger('mouseup');
  });

  it('a circle', () => {
    cy.get('.tool-menu > :nth-child(4)').click();
    cy.get('#canvas')
      .trigger('mousedown', { which: 0, force: true })
      .trigger('mousemove', 0, 0)
      .trigger('mousemove', 200, 200, { force: true })
      .trigger('mouseup');
    cy.get('.tool-menu > :nth-child(5)').click();
    cy.get('#yellow').click();
    cy.get('#canvas').click(200, 200);
    cy.get('.tool-menu > :nth-child(7)').click();
    cy.get('#canvas')
      .trigger('mousedown', { which: 0, force: true })
      .trigger('mouseup');
  });

  describe('filling forms', () => {
    it('text-form', () => {
      cy.get('.tool-menu > :nth-child(8)').click();
      cy.get('#details-form');
      cy.get('[name="name"]').type('JoanMarc');
      cy.get('[type="number"]').type('30');
      cy.get('[type="date"]').type('2022-03-12');
      cy.get('[type="time"]').type('15:00');
      cy.get('[name="address"]').type('C/cardedeu, 12');
      cy.get('#details-form > button').click();
    });

    it('guest-list', () => {
      cy.get('.tool-menu > :nth-child(9)').click();
      cy.get('.text-menu-container');
      cy.get('[type="text"]').type('Xavi');
      cy.get('[type="email"]').type('hola@gmail.com');
      cy.get('#details-form > button').click();
    });
  });
});

describe('email and paths', () => {
  it('check email and confirm invitation', () => {
    cy.visit(
      'https://ethereal.email/message/YrQU-51qjBpysGRmYrQU.PAppYZb853iAAAAATpo0mhA5RFTOpJM9Me-oHw'
    );
    cy.wait(1000);
  });
  it('check email and confirm invitation', () => {
    cy.visit('http://localhost:3000/11/invitation');
    cy.url().should('include', '/invitation');
    cy.get('#save-button').click();
    cy.get('[type="text"]').type('Xavi');
    cy.get('[type="email"]').type('hola@gmail.com');
    cy.get('#details-form > button').click();
  });
});
