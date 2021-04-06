/* eslint-disable class-methods-use-this */
export default class Gui {
  constructor() {
    this.widget = document.querySelector('.widget');

    this.chat = document.querySelector('.chat');
    this.chatForm = document.querySelector('.chat form');
    this.postList = document.querySelector('.conversations');
    this.postInput = this.chatForm.querySelector('input');

    this.modal = this.widget.querySelector('.modal');
    this.modalInput = this.modal.querySelector('input');
    this.modalTooltip = this.modal.querySelector('.tooltip');
  }

  textNoteTeplate({ text, latitude, longitude }) {
    return `
    <div>
      <p>${text}</p>
      <span>[${latitude}, ${longitude}]</span>
    </div>
    `;
  }
}
