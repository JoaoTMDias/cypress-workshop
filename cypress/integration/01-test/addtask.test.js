/// <reference types="cypress" />

const PAGETITLE_LBL = "[data-testid='project-name']";

const MENU = {
  INBOX_BTN: "[data-testid='inbox-action']",
  NEXT7DAYS_BTN: "[data-testid='next_7-action']",
};

const ADDTASK = {
  SHOWACTIONS_BTN: "[data-testid='show-main-action']",
  SUBMIT_BTN: "[data-testid='add-task__submit']",
  CANCEL_BTN: "[data-testid='add-task-main-cancel']",
  PROJECT_MENU_BTN: "[data-testid='show-project-overlay']",
  DATE_MNU: {
      BTN: "[data-testid='show-task-date-overlay']",
      TOMORROW_VAL: "[data-testid='task-date-tomorrow']",
  },
};

const TASK_CHK = "[data-testid='checkbox-action']";


describe('Todoist - Add Task', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('Add Task for Tomorrow', () => {
    // 1.1 - Click on Add Task Plus (Show actions) button
    cy.get(PAGETITLE_LBL).contains("Inbox");
    cy.get(ADDTASK.SHOWACTIONS_BTN).click();

    // 1.2 - Check all buttons and click on Date button (menu)
    cy.get(ADDTASK.SUBMIT_BTN).should("be.visible").and("be.enabled");
    cy.get(ADDTASK.CANCEL_BTN).should("be.visible").and("be.enabled");
    cy.get(ADDTASK.PROJECT_MNU).should("be.visible").and("be.enabled");
    cy.get(ADDTASK.DATE_MNU.BTN).should("be.visible").and("be.enabled").click();

    // 2.1 - Click on Tomorrow value (menu)
    cy.get(ADDTASK.DATE_MNU.TOMORROW_VAL).click();

    // 2.2 - Fill task field and click on Add Task (Submit) button
    cy.get("[data-testid='add-task-content']").should("be.visible").type("Check tasks for the next sprint");
    cy.get(ADDTASK.SUBMIT_BTN).click();

    // 2.3 - Check that the task does not appear for today
    cy.get(TASK_CHK).should("not.be.visible");

    // 3.1 - Click on "Next 7 days" menu and check task created
    cy.get(MENU.NEXT7DAYS_BTN).click();
    cy.get(PAGETITLE_LBL).contains("Next 7 Days");
    cy.get(TASK_CHK).contains("Check tasks for the next sprint");
  })

})
