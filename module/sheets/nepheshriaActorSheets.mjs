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

        // Everything below here is only needed if the sheet is editable
        if (!this.isEditable) return;

        // Roll handlers, click handlers, etc. would go here.
        // exemple html.find(cssSelector).event(this._someCallBack.bind(this));

        html.find(".item-create").click(this._onItemCreate.bind(this));
        html.find(".inline-edit").change(this._onSkillEdit.bind(this));

        super.activateListeners(html);
    }

    _onItemCreate(event) {
        event.preventDefault();
        let element = event.currentTarget;

        let itemData = {
            name: game.i18n.localize("NEPHESHRIA.sheet.newItem"),
            type: element.dataset.type
        };

        return this.actor.createOwnedItem(itemData);
    }

    _onSkillEdit(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let itemID = element.closest(".item").dataset.itemId;
        let item = this.actor.getOwnItem(itemId);
        let field = element.dataset.field;
        return item.update({ [field]: element.value});
    }
}