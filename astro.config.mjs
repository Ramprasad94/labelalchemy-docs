// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const site = 'https://docs.labelalchemy.dev';

// https://astro.build/config
export default defineConfig({
	site,
	integrations: [
		starlight({
			title: 'Label Alchemy',
			description:
				'Documentation for Label Alchemy — the VS Code extension that converts hard-coded Salesforce strings into Custom Labels.',
			logo: {
				light: './src/assets/logo-light.svg',
				dark: './src/assets/logo-dark.svg',
				replacesTitle: true,
			},
			favicon: '/favicon.svg',
			customCss: ['./src/styles/custom.css'],
			social: [
				{
					icon: 'github',
					label: 'Community & support',
					href: 'https://github.com/Ramprasad94/labelalchemy',
				},
			],
			editLink: { baseUrl: 'https://github.com/Ramprasad94/labelalchemy-docs/edit/main/' },
			head: [
				// Google Fonts: Inter + JetBrains Mono
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true } },
				{
					tag: 'link',
					attrs: {
						rel: 'stylesheet',
						href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
					},
				},
				// Open Graph / canonical metadata
				{ tag: 'meta', attrs: { property: 'og:image', content: `${site}/icon-128.png` } },
				{ tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
				{ tag: 'meta', attrs: { name: 'twitter:card', content: 'summary' } },
				{ tag: 'meta', attrs: { name: 'twitter:image', content: `${site}/icon-128.png` } },
			],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Install', slug: 'install' },
						{ label: 'Quick Start', slug: 'quick-start' },
						{ label: 'AI provider setup (BYOK)', slug: 'providers' },
						{ label: 'License activation', slug: 'license-activation' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'How it works', slug: 'how-it-works' },
						{ label: 'Features', slug: 'features' },
						{ label: 'Troubleshooting', slug: 'troubleshooting' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'FAQ', slug: 'faq' },
						{ label: 'Privacy', slug: 'privacy' },
						{ label: 'Changelog', slug: 'changelog' },
					],
				},
			],
		}),
	],
});
