// Import Document classes
import {NepheshriaActor} from "./documents/actor.mjs";
import { NepheshriaItem } from "./documents/item.mjs";
// Import sheet classes.
import { NepheshriaItemSheet } from "./sheets/nepheshriaItemSheets.mjs";
import {NepheshriaActorSheet} from "./sheets/nepheshriaActorSheets.mjs";
// Import helper/utility classes and constants.
import { preloadHandlebarsTemplates } from "./helpers/templates.mjs";
import { NEPHESHRIA } from "./helpers/config.mjs";

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */
Hooks.once('init', async function () {
    console.log("Nepheshria  | Initialising Nepheshria System");

    // Add utility classes to the global game object so that they're more easily
    // accessible in global contexts.
    game.nepheshria = {
        NepheshriaActor,
        NepheshriaItem
    };

    // Add custom constants for configuration.
    CONFIG.NEPHESHRIA = NEPHESHRIA;

    /**
     * Set an initiative formula for the system
     * @type {String}
     */
    CONFIG.Combat.initiative = {
        formula: "1d100 + @abilities.dex",
        decimals: 2
    }

    // Define custom Document classes
    CONFIG.Actor.documentClass = NepheshriaActor;
    CONFIG.Item.documentClass = NepheshriaItem;

    // Register sheet application classes
    // Actor
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("nepheshria", NepheshriaActorSheet, { makeDefault: true});

    // Item
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("nepheshria", NepheshriaItemSheet, { makeDefault: true});

    // Preload Handlebars templates.
    return preloadHandlebarsTemplates();
});

/* -------------------------------------------- */
/*  Handlebars Helpers                          */
/* -------------------------------------------- */


// If you need to add Handlebars helpers, here are a few useful examples:
Handlebars.registerHelper('concat', function() {
    var outStr = '';
    for (var arg in arguments) {
        if (typeof arguments[arg] != 'object') {
            outStr += arguments[arg];
        }
    }
    return outStr;
});

Handlebars.registerHelper('toLowerCase', function(value, options) {
    // Helper parameters
    var d1
});

Handlebars.registerHelper('eachConcat', function(base, end) {
    return base+"{{"+end+"}}"
})

/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */

Hooks.once("ready", async function() {
    // Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
    Hooks.on("hotbarDrop", (bar, data, slot) => createItemMacro(data, slot));
});

/* -------------------------------------------- */
/*  Hotbar Macros                               */
/* -------------------------------------------- */

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {Object} data     The dropped data
 * @param {number} slot     The hotbar slot to use
 * @returns {Promise}
 */
async function createItemMacro(data, slot) {
    // First, determine if this is a valid owned item.
    if (data.type !== "Item") return;
    if (!data.uuid.includes('Actor.') && !data.uuid.includes('Token.')) {
        return ui.notifications.warn("You can only create macro buttons for owned Items");
    }
    // If it is, retrieve it based on the uuid.
    const item = await Item.fromDropData(data);

    // Create the macro command using the uuid.
    const command = `game.boilerplate.rollItemMacro("${data.uuid}");`;
    let macro = game.macros.find(m => (m.name === item.name) && (m.command === command));
    if (!macro) {
        macro = await Macro.create({
            name: item.name,
            type: "script",
            img: item.img,
            command: command,
            flags: { "boilerplate.itemMacro": true }
        });
    }
    game.user.assignHotbarMacro(macro, slot);
    return false;
}

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {string} itemUuid
 */
function rollItemMacro(itemUuid) {
    // Reconstruct the drop data so that we can load the item.
    const dropData = {
        type: 'Item',
        uuid: itemUuid
    };
    // Load the item from the uuid.
    Item.fromDropData(dropData).then(item => {
        // Determine if the item loaded and if it's an owned item.
        if (!item || !item.parent) {
            const itemName = item?.name ?? itemUuid;
            return ui.notifications.warn(`Could not find item ${itemName}. You may need to delete and recreate this macro.`);
        }

        // Trigger the item roll
        item.roll();
    });
}

