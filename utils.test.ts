export {};

const { formatJiraLink } = require("./utils");

describe('JIRA links formatting function', () => {

    it('should return null if not a hyperlink', () => {
        expect(formatJiraLink("random text", "*.atlassian.net")).toBeNull();
    });

});