import default_theme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				'sans': ["Titillium Web", ...default_theme.fontFamily.sans],
			},
			colors: {
				slate: {
					725: '#2E3B4F',
					750: '#293548',
					775: '#232F42'
				}
			}
		}
	},

	plugins: []
};

module.exports = config;
