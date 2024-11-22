@Smoke
Feature: Test Home Page

  Scenario Outline: Verify the landing page
    Given I have navigated to "<url>"
    When I land on Homepage
    Then I should land on homepage with proper url and title

    Examples:
      | url                         |
      | https://www.polestar.com/se |