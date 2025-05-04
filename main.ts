import { Plugin, MarkdownView, Editor, App, PluginSettingTab, Setting } from "obsidian";
import { formatJiraLink } from './utils';

interface JiraLinksShortenerPluginSettings {
	supportedDomain: string;
}

const DEFAULT_SETTINGS: JiraLinksShortenerPluginSettings = {
	supportedDomain: '*.atlassian.net'
}

export default class JiraLinksShortenerPlugin extends Plugin {

  settings: JiraLinksShortenerPluginSettings;

  async onload() {
    
    await this.loadSettings();
		this.addSettingTab(new JiraLinksShortenerPluginSettingsTab(this.app, this));

    console.log("📋 JIRA links shortener plugin loaded");

    this.registerEvent(
      this.app.workspace.on("editor-paste", (evt: ClipboardEvent, editor: Editor, view: MarkdownView) => {
        const pastedText = evt.clipboardData?.getData("text/plain");
        if (!pastedText) return;
    
        const modifiedText = formatJiraLink(pastedText, this.settings.supportedDomain);
		if(!modifiedText) return;
		
		evt.preventDefault();
        editor.replaceSelection(modifiedText);
      })
    );
  }

  async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
		await this.saveData(this.settings);
  }
}

class JiraLinksShortenerPluginSettingsTab extends PluginSettingTab {
	plugin: JiraLinksShortenerPlugin;

	constructor(app: App, plugin: JiraLinksShortenerPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Apply for domain')
			.setDesc('You may want to configure your custom JIRA domain if standard config ' +
				' doesn\'t work for you. You can aso use * for wildcard style definition.')
			.addText(text => text
				.setPlaceholder('Enter your JIRA domain')
				.setValue(this.plugin.settings.supportedDomain)
				.onChange(async (value) => {
					this.plugin.settings.supportedDomain = value;
					await this.plugin.saveSettings();
				}));
	}
}