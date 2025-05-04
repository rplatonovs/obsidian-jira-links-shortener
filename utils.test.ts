export {};

const { formatJiraLink, satinizeDomain } = require("./utils");

describe('JIRA links formatting function sanity checks', () => {

    it('should return null if domain is empty', () => {
        expect(formatJiraLink("random text", "")).toBeNull();
    });

    it('should return null if pasted text is empty', () => {
        expect(formatJiraLink("", "domain")).toBeNull();
    });

    it('should return null if pasted text is null', () => {
        expect(formatJiraLink(null, "domain")).toBeNull();
    });

    it('should return null if not a hyperlink', () => {
        expect(formatJiraLink("random text", "*.atlassian.net")).toBeNull();
    });

    it('should return null if not an http(s) hyperlink', () => {
        expect(formatJiraLink("ftp://examplecompany.atlassian.net/browse/DEV-456", "examplecompany.atlassian.net")).toBeNull();
    });

    it('should return null if not a JIRA link', () => {
        expect(formatJiraLink("https://docs.google.com/spreadsheets/d/2343223432", "*.atlassian.net")).toBeNull();
    });

});

describe('JIRA links formatting function cases', () => {

    it('should return formated JIRA link exact domain match', () => {
        expect(formatJiraLink("https://examplecompany.atlassian.net/browse/DEV-456", "examplecompany.atlassian.net"))
            .toBe("[DEV-456](https://examplecompany.atlassian.net/browse/DEV-456)");
    });

    it('should return formated JIRA link with exact domain match HTTP', () => {
        expect(formatJiraLink("http://examplecompany.atlassian.net/browse/DEV-456", "examplecompany.atlassian.net"))
            .toBe("[DEV-456](http://examplecompany.atlassian.net/browse/DEV-456)");
    });

    it('should return formated JIRA link wildcard', () => {
        expect(formatJiraLink("https://examplecompany.atlassian.net/browse/DEV-456", "*.atlassian.net"))
            .toBe("[DEV-456](https://examplecompany.atlassian.net/browse/DEV-456)");
    });

    it('should return formated JIRA link wildcard HTTP', () => {
        expect(formatJiraLink("http://examplecompany.atlassian.net/browse/DEV-456", "*.atlassian.net"))
            .toBe("[DEV-456](http://examplecompany.atlassian.net/browse/DEV-456)");
    });

    it('should not return formated JIRA link if domain doesn\'t match wildcard', () => {
        expect(formatJiraLink("https://examplecompany.atlassian.net/browse/DEV-456", "*.selfhosted.com")).toBeNull();
    });

    it('should not return formated JIRA link if no exact match for a domain name', () => {
        expect(formatJiraLink("https://examplecompany.atlassian.net/browse/DEV-456", "company.selfhosted.com")).toBeNull();
    });

});

describe('Domain sanity checks', () => {

    it('Should not fail with empty string', () => {
        expect(satinizeDomain("")).toBe("");
    });

    it('Should remove illegal chars', () => {
        expect(satinizeDomain("!@#$%^&()domain.com")).toBe("domain.com");
    });

    it('Should keep dots and astersisks for wildcard definition', () => {
        expect(satinizeDomain("*.example.domain.com")).toBe("*.example.domain.com");
    });

});