import NepheshriaItemSheet from "./sheets/nepheshriaItemSheets.js";

Hooks.once("init", function () {
    console.log("nepheshria | Initialising Nepheshria System");

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("nepheshria", NepheshriaItemSheet, { makeDefault: true});
});