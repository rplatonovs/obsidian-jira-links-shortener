export function formatJiraLink(pastedText: string, domain: string): string | null {
	if (!pastedText || typeof pastedText !== 'string' || pastedText.trim() === '') return null;
	if (/\s/.test(pastedText)) return null;

	const escDomain = domain.replace(/\./g, '\\.').replace(/(\*)/g, '.*');
	const jiraRegex = new RegExp('^https?:\/\/' + escDomain + '\/.*browse\/([A-Z]+-\\d+)(\\?.*)?', 'g');

	if (!jiraRegex.test(pastedText)) return null;

	return pastedText.replace(jiraRegex, (match, issueId) => {
		return `[${issueId}](${match})`;
	});
}

export function sanitizeDomain(domain: string): string {
	return domain.replace(/[^a-zA-Z0-9.*-]/g, '')
}