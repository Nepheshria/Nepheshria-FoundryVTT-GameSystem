/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class NepheshriaItemSheet extends ItemSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["nepheshria", "sheet", "item"],
            width: 520,
            height: 480,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
        });
    }

    /** @Override */
    get template() {
        // template link
        const path = "systems/nepheshria/templates/item";
        // return template corresponding to item type
        return `${path}/${this.item.type}-sheet.html`;
    }

    /* -------------------------------------------- */

    getData() {
        const data = super.getData();
        const dataClone = data.item;

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