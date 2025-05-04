export function formatJiraLink(pastedText: string, domain: string): string | null {
	
	// Avoid modifying text fragments which start from a JIRA link
	if (/\s/.test(pastedText)) return null;
	
	const escDomain = domain.replace(/\./g, '\\.').replace(/(\*)/g, '.*')	
	const jiraRegex = new RegExp(`^https?:\/\/${escDomain}\/browse\/([A-Z]+-\\d+)(\\?.*)?`, 'g');

	if (!jiraRegex.test(pastedText)) return null;

	return pastedText.replace(jiraRegex, (match, issueId) => {
		return `[${issueId}](${match})`;
	});
}

export function satinizeDomain(domain: string): string {
	return domain.replace(/[^a-zA-Z0-9.*-]/g, '')
}