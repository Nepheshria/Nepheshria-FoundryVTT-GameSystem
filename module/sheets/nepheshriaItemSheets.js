export default class NepheshriaItemSheet extends ItemSheet {
    get template() {
        return 'systems/nepheshria/templates/sheets/${this.item.data.type}-sheet.html';
    }
}