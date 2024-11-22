@Smoke
Feature: Test Drive Booking

  Scenario Outline: Verify the landing page
    Given I have navigated to <url>
    When I land on Homepage
    Then I should land on homepage with proper url and title

    Examples:
      | url                         |
      | https://www.polestar.com/se |

  Scenario Outline: Verify test drive page navigation
    Given I am on homepage
    When I hover on <car-type> and click "Provkörning"
    Then I should land on test drive booking page with <car-type> as default selection

    Examples:
      | car-type   |
      | Polestar 2 |

  Scenario Outline: Providing the valid information for test drive booking
    Given I am on test drive page
    When I searched the address with following <address> value
    And Select the specific <address> from address results
    And Select the preference of car by clicking <preference>
    And Select the valid <date> from the calender
    And Provide valid contact details with first name as <firstname>
    And Provide valid last name <lastname>
    And Provide valid Email <Email>
    And Provide valid mobile number <mobile>
    And Provide valid zip code <Zip>
    And Select proper customer type
    And Check the check boxes and click on "Bekräfta din bokning" for confirming booking
    Then I should land on Confirmed booking success page

    Examples:
      | address                 | preference | date       | firstname | lastname | Email                 | mobile     | Zip   |
      |  123 Main St, Stockholm | Polestar 2 | 2024-12-10 | John      | Doe      | john.doe@email.com    | 0701234567 | 11122 |
      | 456 Oak Ave, Gothenburg | Polestar 2 | 2024-12-12 | Alice     | Smith    | alice.smith@email.com | 0702345678 | 22133 |
      |      789 Pine Rd, Malmö | Polestar 2 | 2024-12-15 | Bob       | Johnson  | bob.johnson@email.com | 0703456789 | 33444 |
      | 101 Maple Blvd, Uppsala | Polestar 2 | 2024-12-17 | Carol     | White    | carol.white@email.com | 0704567890 | 44555 |
