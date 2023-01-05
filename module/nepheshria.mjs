import NepheshriaItemSheet from "./sheets/nepheshriaItemSheets.mjs";

Hooks.once("init", async function () {
    console.log("nepheshria | Initialising Nepheshria System");

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("nepheshria", NepheshriaItemSheet, { makeDefault: true});
});