export function formatJiraLink(pastedText: string, domain: string): string | null {
	const jiraRegex = /^http.*\/browse\/([A-Z]+-\d+)/g;
	if (!jiraRegex.test(pastedText)) return null;
	return pastedText.replace(jiraRegex, (match, issueId) => {
		return `[${issueId}](${match})`;
	});
}