export default class NepheshriaItemSheet extends ItemSheet {
    get template() {
        const path = "systems/nepheshria/templates/item";
        return `${path}/${this.item.type}-sheet.html`;
    }
}