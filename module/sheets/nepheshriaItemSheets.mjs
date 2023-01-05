export default class NepheshriaItemSheet extends ItemSheet {
    get template() {
        const path = "systems/nepheshria/templates/item";
        return `${path}/${this.item.type}-sheet.html`;
    }

    getData() {
        const data = super.getData();

        data.config = CONFIG.nepheshria;

        return data;
    }
}