/// <reference types="cypress" />

import { PAGETITLE_LBL, MENU, ADDTASK, TASK_CHK, ADDPROJECT, PROJECT_LBL } from "selectors";

describe("Todoist - Add Task", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  afterEach(() => {
    cy.get(MENU.NEXT7DAYS_BTN).click();
    cy.get(TASK_CHK).each((task) => {
      cy.wrap(task).click();
    });
  });

  it("Add Task for Next Week", () => {
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

    // 3.1 - Click on "Next 7 days" menu and check task created
    cy.get(MENU.NEXT7DAYS_BTN).click();
    cy.get(PAGETITLE_LBL).contains("Next 7 Days");
    cy.get(TASK_CHK).eq(0).parent().contains("Check tasks for the next sprint");
  });
  it("Add Project", () => {
    // 1.1 - Click on Add Project button
    cy.get(PAGETITLE_LBL).contains("Inbox");
    cy.get(ADDPROJECT.SHOWACTIONS_BTN).click();

    // 2.1 - Fill project field and click on Add Project (Submit) button
    cy.get(ADDPROJECT.WRP)
      .find(ADDPROJECT.TXT)
      .invoke("attr", "placeholder")
      .should("contain", "Name your project");

    cy.get(ADDPROJECT.WRP).find(ADDPROJECT.TXT).type("Lunch time");

    cy.get(ADDPROJECT.SUBMIT_BTN).click();

    // 2.2 - Check Projects (old and new projects)
    cy.get(PROJECT_LBL).eq(0).contains("Brewery");
    cy.get(PROJECT_LBL).eq(1).contains("Lunch time");
  });
});
