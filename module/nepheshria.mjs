import NepheshriaItemSheet from "./sheets/nepheshriaItemSheets.mjs";
import {nepheshria} from "./config.mjs";

Hooks.once("init", async function () {
    console.log("nepheshria | Initialising Nepheshria System");
    CONFIG.nepheshria = nepheshria;
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("nepheshria", NepheshriaItemSheet, { makeDefault: true});
});