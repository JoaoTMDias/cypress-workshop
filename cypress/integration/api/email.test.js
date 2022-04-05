/// <reference types="cypress" />

URL = 'https://api.eva.pingutil.com/email'

describe('example tests for rest api - e-mail validator', () => {
  it('validate no email parameter', () => {
    cy.request({ url: URL }).as('noEmailParameter');

    cy.get('@noEmailParameter')
      .then(
        response => {
          cy.log(JSON.stringify(response.body))
          expect(response.status).to.eq(200);
          expect(response.body.toString()).to.includes("Email is missing")
        });
  });

  it('validate valid email', () => {
    let validEmail = "ricardo.lopes@feedzai.com";
    cy.request({ url: URL, qs: { 'email': validEmail } }).as('validEmail');

    cy.get('@validEmail')
      .then(
        response => {
          cy.log(JSON.stringify(response.body))
          expect(response.status).to.eq(200);
          expect(response.body.data.email_address).to.eq(validEmail)
          expect(response.body.data.valid_syntax).to.eq(true)
        });
  });

  it('validate invalid email', () => {
    let invalidEmail = ";lopes@feedzai.com";
    cy.request({ url: URL, qs: { 'email': invalidEmail } }).as('invalidEmail');

    cy.get('@invalidEmail')
      .then(
        response => {
          cy.log(JSON.stringify(response.body))
          expect(response.status).to.eq(200);
          expect(response.body.data.email_address).to.eq(invalidEmail)
          expect(response.body.data.valid_syntax).to.eq(false)
        });
  });

  it('validate invalid mail - refactored method', () => {
    let email = ";lopes@feedzai.com";
    let isValid = false;
    cy.queryApiAndValidateRequest(email, isValid);
  });
})
