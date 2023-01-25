/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class NepheshriaActorSheet extends ActorSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["nepheshria", "sheet", "actor"],
            width: 520,
            height: 480,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
        });
    }

    /** @Override */
    get template() {
        // template link
        const path = "systems/nepheshria/templates/actor";
        // return template corresponding to item type
        return `${path}/${this.actor.type}-sheet.html`;
    }

    /* -------------------------------------------- */

    getData() {
        const data = super.getData();
        const dataClone = data.actor;

        // Retrieve the roll data for TinyMCE editors.
        data.rollData = {};


        // Add the actor's data to context.data for easier access, as well as flags.
        data.system = dataClone.system;
        data.flags = dataClone.flags;
        data.config = CONFIG.NEPHESHRIA;
        return data;
    }

    /* -------------------------------------------- */

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // Everything below here is only needed if the sheet is editable
        if (!this.isEditable) return;

        // Roll handlers, click handlers, etc. would go here.
    }
}