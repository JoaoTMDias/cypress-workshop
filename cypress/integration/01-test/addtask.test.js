/// <reference types="cypress" />

const PAGETITLE_LBL = "[data-testid='project-name']";

const MENU = {
  INBOX_BTN: "[data-testid='inbox-action']",
  NEXT7DAYS_BTN: "[data-testid='next_7-action']",
};

const ADDTASK = {
  SHOWACTIONS_BTN: "[data-testid='show-main-action']",
  SUBMIT_BTN: "[data-testid='add-task']",
  CANCEL_BTN: "[data-testid='add-task-main-cancel']",
  TXT: "[data-testid='add-task-content']",
  PROJECT_MENU_BTN: "[data-testid='show-project-overlay']",
  DATE_MENU: {
      BTN: "[data-testid='show-task-date-overlay']",
      TOMORROW_VAL: "[data-testid='task-date-tomorrow']",
      NEXTWEEK_VAL: "[data-testid='task-date-next-week']",
  },
};

const TASK_CHK = "[data-testid='checkbox-action']";

describe('Todoist - Add Task', () => {
  beforeEach(() => {
    cy.visit('/');
})

afterEach(() => {
  cy.get(MENU.NEXT7DAYS_BTN).click();
  cy.get(TASK_CHK).each((task) => {
    cy.wrap(task).click();
  })
})
  it('Add Task for Next Week', () => {
    // 1.1 - Click on Add Task Plus (Show actions) button
    cy.get(PAGETITLE_LBL).contains("Inbox");
    cy.get(ADDTASK.SHOWACTIONS_BTN).click();

    // 1.2 - Check all buttons and click on Date button (menu)
    cy.get(ADDTASK.SUBMIT_BTN).should("be.visible");
    cy.get(ADDTASK.CANCEL_BTN).should("be.visible");
    cy.get(ADDTASK.PROJECT_MENU_BTN).should("be.visible");
    cy.get(ADDTASK.DATE_MENU.BTN).should("be.visible").click();

    // 2.1 - Click on Next Week dropdown (menu)
    cy.get(ADDTASK.DATE_MENU.NEXTWEEK_VAL).click();

    // 2.2 - Fill task field and click on Add Task (Submit) button
    cy.get(ADDTASK.TXT).should("be.visible").type("Check tasks for the next sprint");
    cy.get(ADDTASK.SUBMIT_BTN).click();

    // 2.3 - Check that the task does not appear for today
    cy.get(TASK_CHK).should("not.exist");

    // 3.1 - Click on "Next 7 days" menu and check task created
    cy.get(MENU.NEXT7DAYS_BTN).click();
    cy.get(PAGETITLE_LBL).contains("Next 7 Days");
    cy.get(TASK_CHK).eq(0).parent().contains("Check tasks for the next sprint");
  });
});
