/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class NepheshriaActorSheet extends ActorSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["nepheshria", "sheet", "actor"],
            width: 600,
            height: 600,
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

        const actorData = this.actor.toObject(false);

        // Retrieve the roll data for TinyMCE editors.
        data.rollData = {};


        // Add the actor's data to context.data for easier access, as well as flags.
        data.system = dataClone.system;
        data.flags = dataClone.flags;
        data.config = CONFIG.NEPHESHRIA;

        // Prepare character data and items.
        if (actorData.type == 'character') {
            this._prepareSpells(data);
            this._prepareChara(data);
        }

        // Prepare character data and items.
        if (actorData.type == 'npc') {
            this._prepareSpells(data);
        }

        // Add roll data for TinyMCE editors.
        data.rollData = data.actor.getRollData();

        return data;
    }

    /**
     * Organize and classify Items for Character sheets.
     * @param {Object} actorData The actor to prepare
     */
    _prepareSpells(data) {
        const spells = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: []
        };

        // Iterate through items, allocating to containers
        for (let i of data.items) {
            i.img = i.img || DEFAULT_TOKEN;
            // Append to spells.
            if (i.type === 'spell') {
                if (i.system.item !== undefined) {
                    if (i.system.item.level.number !== undefined) {
                        spells[i.system.item.level.number].push(i);
                    }
                }
                else {
                    spells[i.system.level.number].push(i);
                }
            }
        }
        console.log("Nepheshria : " + data);
        data.spells = spells;
    }

    /**
     * Organize and classify Items for Character sheets.
     * @param {Object} actorData The actor to prepare
     */
    _prepareChara (data) {
        const inventory = [];
        const skills = [];
        const masteries =  [];

        // Iterate through items, allocating to containers
        for (let i of data.items) {
            i.img = i.img || DEFAULT_TOKEN;
            // Append to inventory.
            if (i.type === 'mastery') {
                skills.push(i);
            }
            // Append to skills.
            else if (i.type === 'skill') {
                masteries.push(i);
            }
            // Append to masteries.
            else if (i.type !== 'spell') {
                inventory.push(i);
            }
        }

        data.inventory = inventory;
        data.skills = skills;
        data.masteries = masteries;
    }

    /* -------------------------------------------- */

    /** @override */
    activateListeners(html) {

        // Render the item sheet for viewing/editing prior to the editable check.
        html.find('.item-edit').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("itemId"));
            item.sheet.render(true);
        });

        // Everything below here is only needed if the sheet is editable
        if (!this.isEditable) return;

        // exemple html.find(cssSelector).event(this._someCallBack.bind(this));

        // Add Inventory Item
        html.find(".item-create").click(this._onItemCreate.bind(this));

        // Delete Inventory Item
        html.find('.item-delete').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("itemId"));
            item.delete();
            li.slideUp(200, () => this.render(false));
        });

        super.activateListeners(html);
    }

    async _onItemCreate(event) {
        event.preventDefault();
        const element = event.currentTarget;
        // Get the type of item to create.
        const type = element.dataset.type;
        // Grab any data associated with this control.
        const data = duplicate(element.dataset);
        // Initialize a default name.
        const name = game.i18n.localize("NEPHESHRIA.sheet.newItem");
        // Prepare the item object.
        const itemData = {
            name: name,
            type: type,
            system: data
        };


        // Finally, create the item!
        return await Item.create(itemData, {parent: this.actor});
    }
}