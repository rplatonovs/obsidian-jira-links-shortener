import { Plugin, MarkdownView, Editor } from "obsidian";

export default class JiraLinksPastePlugin extends Plugin {
  async onload() {
    console.log("📋 JIRA links shortener plugin loaded");

    this.registerEvent(
      this.app.workspace.on("editor-paste", (evt: ClipboardEvent, editor: Editor, view: MarkdownView) => {
        const pastedText = evt.clipboardData?.getData("text/plain");
        if (!pastedText) return;
    
        const jiraRegex = /^http.*\/browse\/([A-Z]+-\d+)/g;
        if (!jiraRegex.test(pastedText)) return;
    
        evt.preventDefault();
    
        const modifiedText = pastedText.replace(jiraRegex, (match, issueId) => {
          return `[${issueId}](${match})`;
        });
    
        editor.replaceSelection(modifiedText);
      })
    );
  }
}