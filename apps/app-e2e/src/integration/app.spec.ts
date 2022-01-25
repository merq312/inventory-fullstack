describe('app', () => {
  beforeEach(() => cy.visit('localhost:3333'));

  it.only('should display title message', () => {
    cy.get('[data-cy=homepage-title]').should(
      'have.text',
      'Bento Sushi Product Tracker'
    );
  });

  it.only('can select a store', () => {
    cy.get('[data-cy=user-store]').should('have.text', 'Guest ');
    cy.get('[data-cy=menu]').click();
    cy.get('[data-cy=rcss]').click();
    cy.get('[data-cy=user-store]').should('have.text', 'Guest @ rcss');
  });

  it.only('can increment item', () => {
    cy.get('[data-cy=menu]').click();
    cy.get('[data-cy=rcss]').click();

    cy.get('[data-cy=menu]').click();
    cy.get('[data-cy=inventory-input]').click();
    cy.get('[data-cy=california]').within(() => {
      cy.get('[data-cy=increment]').click();
      cy.get('[data-cy=new-value]').should('have.text', '+1');
    });
  });
});
