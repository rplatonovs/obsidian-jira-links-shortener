export function formatJiraLink(pastedText: string, domain: string): string | null {
	const escDomain = domain.replace(/\./g, '\\.').replace(/(\*)/g, '.*')	
	const jiraRegex = new RegExp(`^https?:\/\/${escDomain}\/browse\/([A-Z]+-\\d+)`, 'g');
	
	console.info(escDomain);

	if (!jiraRegex.test(pastedText)) return null;
	return pastedText.replace(jiraRegex, (match, issueId) => {
		return `[${issueId}](${match})`;
	});
}

export function satinizeDomain(domain: string): string {
	return domain.replace(/[^a-zA-Z0-9.*-]/g, '')
}