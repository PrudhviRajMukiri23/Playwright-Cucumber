@Smoke
Feature: Test Drive Booking

  Scenario Outline: Verify test drive booking flow
    Given I have navigated to "https://www.polestar.com/se" and handled the popup
    And I am on the home page
    When I hover on <car-type> and click "Provkörning"
    And I should land on the test drive booking page with selected model as default selection
    And I searched the address with following "<address>" value
    And Select the preference of car by clicking "<preference>"
    And Select the valid "<date>" from the calendar
    And Provide valid contact details with valid "<firstname>", "<lastname>", "<Email>", "<mobile>", "<Zip>"
    And Select proper customer type
    And Check the checkboxes and click on "Bekräfta din bokning" for confirming booking
    Then I should land on the Confirmed booking success page

    Examples:
      | car-type     | address                | preference    | date       | firstname | lastname | Email              | mobile     | Zip   |
      | "Polestar 2" | 123 Main St, Stockholm | Dual motor + Performance pack | nov-23 | John      | Doe      | john.doe@email.com | 0701234567 | 11122 |
      # | "Polestar 2" | 456 Oak Ave, Gothenburg | Dual motor | nov-23 | Alice     | Smith    | alice.smith@email.com | 0702345678 | 22133 |
      # | "Polestar 2" | 789 Pine Rd, Malmö      | No preference | nov-24 | Bob       | Johnson  | bob.johnson@email.com | 0703456789 | 33444 |
      # | "Polestar 2" | 101 Maple Blvd, Uppsala | Single motor | nov-25 | Carol     | White    | carol.white@email.com | 0704567890 | 44555 |
