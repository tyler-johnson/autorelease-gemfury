import npm from "global-npm";
import promisify from "es6-promisify";

const loadNpm = promisify(npm.load.bind(npm));

// write npm token to the .npmrc file
export default async function(r, {
	gemfuryApiKey = process.env.GEMFURY_API_KEY,
	gemfuryUser = process.env.GEMFURY_USER
}) {
	if (!gemfuryApiKey || !gemfuryUser) {
		throw new Error("Missing Gemfury API key and/or username.");
	}

	await loadNpm({});
	npm.config.set(`registry`, `https://npm-proxy.fury.io/${gemfuryApiKey}/${gemfuryUser}/`, "project");
	await new Promise((resolve, reject) => {
		npm.config.save("project", (err) => err ? reject(err) : resolve());
	});
}
