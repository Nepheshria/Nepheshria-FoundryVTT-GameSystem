/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
 export const preloadHandlebarsTemplates = async function() {
    return loadTemplates([

        // Actor partials.
        "systems/nepheshria/templates/actor/parts/actor-items.html",
        "systems/nepheshria/templates/actor/parts/actor-spells.html",
        "systems/nepheshria/templates/actor/parts/actor-skills.html",
        "systems/nepheshria/templates/actor/parts/actor-masteries.html",
        "systems/nepheshria/templates/actor/parts/actor-effects.html",
        "systems/nepheshria/templates/actor/parts/actor-stats.html",
        "systems/nepheshria/templates/actor/parts/actor-stats-cara.html",

        // Item partials
        "systems/nepheshria/templates/item/parts/item-requirements.html"


  ]);
};
