/** Set before app/public/index loads so dogfood tests do not require a real Convex deployment. */
process.env.CONVEX_URL ??= "https://placeholder.invalid.convex.cloud";
