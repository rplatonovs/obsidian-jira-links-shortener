export function formatJiraLink(pastedText: string, domain: string): string | null {
	if (!pastedText || typeof pastedText !== 'string' || pastedText.trim() === '') return null;
	if (/\s/.test(pastedText)) return null;

	const escDomain = domain.replace(/\./g, '\\.').replace(/(\*)/g, '.*');
	const jiraRegex = new RegExp(`^https?:\/\/${escDomain}(\/[\\w\\-\\.]+)*\/browse\/(?<issueId>[A-Z]+-\\d+)(\\?.*)?`, 'g');

	if (!jiraRegex.test(pastedText)) return null;

	return pastedText.replace(jiraRegex, (match, ...groups) => {
		const groupsObj = groups[groups.length - 1];
		const issueId = groupsObj?.issueId;
		return `[${issueId}](${match})`;
	});
}
export function sanitizeDomain(domain: string): string {
	return domain.replace(/[^a-zA-Z0-9.*-]/g, '')
}