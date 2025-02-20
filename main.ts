// 完全修改掉 main.ts
import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, requestUrl } from 'obsidian';
import fetch from "node-fetch";
type FetchFunction = typeof window.fetch;

// 这个 as unknown 啥意思? 
// 目前已熟练掌握了 "类型体操" 四个字的拼写, 其余都不懂
const node_fetch: FetchFunction = fetch as unknown as FetchFunction;

export default class NoProblemsFetch extends Plugin {
    originalFetch: any;
    async onload () {
        this.originalFetch = window.fetch;
		console.log(`预备使用 node-fetch 替代 window.fetch`);
		
        window.fetch = node_fetch;
		
		const fetch_funcs = [this.originalFetch, node_fetch, window.fetch];
		const current_fetch_desc = fetch_funcs[2] === fetch_funcs[0] ? '原有的fetch':'插件提供的fetch';
		console.log(fetch_funcs);
		console.log(`当前fetch为: ${current_fetch_desc} \n以上三个函数分别是 [原始fetch, 新node-fetch, 目前采用fetch]`);
		new Notice(`使用 node-fetch 替代 window.fetch\n现在是: ${current_fetch_desc}`);
    }
    onunload () {
		console.log(`预备撤销对 window.fetch 的更改`);

		window.fetch = this.originalFetch;

		const fetch_funcs = [this.originalFetch, node_fetch, window.fetch];
		const current_fetch_desc = fetch_funcs[2] === fetch_funcs[0] ? '原有的fetch':'插件提供的fetch';
		console.log(fetch_funcs);
		console.log(`当前fetch为: ${current_fetch_desc} \n以上三个函数分别是 [原始fetch, 新node-fetch, 目前采用fetch]`);
		new Notice(`撤销对 window.fetch 的更改\n现在是: ${current_fetch_desc}`);
    }
}
