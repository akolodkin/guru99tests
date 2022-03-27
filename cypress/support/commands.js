// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('getEmailRegistrationData', () => {
    cy.contains('td','User ID :').then(jqElement => {
            const userID = jqElement.parent().find('td').eq(1).text();
            cy.contains('td','Password :').then(jqElement => {
                const password = jqElement.parent().find('td').eq(1).text();
                return {
                    userID,
                    password
                }
            });
        });
        
});

Cypress.Commands.add('fillCustomerForm', (Name, Surname, Email, Address, Phone) => {
    cy.get('input[id="fname"]').type(Name);
    cy.get('input[id="lname"]').type(Surname);
    cy.get('input[id="email"]').type(Email);
    cy.get('textarea[name="addr"]').type(Address);
    cy.get('input[name="telephoneno"]').type(Phone);
});
