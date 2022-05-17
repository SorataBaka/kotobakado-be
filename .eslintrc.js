module.exports = {
	env: {
		node: true,
	},
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
	},
	plugins: ["@typescript-eslint"],
	rules: {
		"linebreak-style": ["error", "windows"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
	},
	ignorePatterns: [
		"node_modules/",
		"dist/",
		"build/",
		"coverage/",
		"test/",
		".env",
	],
};
