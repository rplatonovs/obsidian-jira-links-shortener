export {};

const { formatJiraLink, sanitizeDomain } = require("./utils");

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

    it('should return formatted JIRA link with reverse proxy path', () => {
        expect(formatJiraLink("https://atlassian.examplecompany.net/jira/browse/DEV-456", "atlassian.examplecompany.net"))
            .toBe("[DEV-456](https://atlassian.examplecompany.net/jira/browse/DEV-456)");
    });

    it('should return formatted JIRA link with multiple path segments', () => {
        expect(formatJiraLink("https://atlassian.examplecompany.net/jira/some/path/browse/DEV-456", "atlassian.examplecompany.net"))
            .toBe("[DEV-456](https://atlassian.examplecompany.net/jira/some/path/browse/DEV-456)");
    });

    it('should return formatted JIRA link with reverse proxy path and query', () => {
        expect(formatJiraLink("https://atlassian.examplecompany.net/jira/browse/DEV-456?foo=bar", "atlassian.examplecompany.net"))
            .toBe("[DEV-456](https://atlassian.examplecompany.net/jira/browse/DEV-456?foo=bar)");
    });

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

    it('should return formated JIRA link preserving query string', () => {
        expect(formatJiraLink("https://examplecompany.atlassian.net/browse/DEV-456?param=value&someting=else", "*.atlassian.net"))
            .toBe("[DEV-456](https://examplecompany.atlassian.net/browse/DEV-456?param=value&someting=else)");
    });

    it('should ignore random text which starts from a valid JIRA link', () => {
        expect(formatJiraLink("https://examplecompany.atlassian.net/browse/DEV-456 is a link which shouldn't be modified", "*.atlassian.net"))
            .toBeNull();
    });

    it('should ignore multiple JIRA links as well', () => {
        expect(formatJiraLink("https://examplecompany.atlassian.net/browse/DEV-456?param=value&someting=else https://examplecompany.atlassian.net/browse/DEV-456", "*.atlassian.net"))
            .toBeNull();
    });

});

describe('Domain sanity checks', () => {

    it('Should not fail with empty string', () => {
        expect(sanitizeDomain("")).toBe("");
    });

    it('Should remove illegal chars', () => {
        expect(sanitizeDomain("!@#$%^&()domain.com")).toBe("domain.com");
    });

    it('Should keep dots and astersisks for wildcard definition', () => {
        expect(sanitizeDomain("*.example.domain.com")).toBe("*.example.domain.com");
    });

});
