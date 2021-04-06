/* eslint-disable prefer-destructuring */
/* eslint-disable class-methods-use-this */
export default class Logic {
  constructor(gui) {
    this.gui = gui;
    this.text = null;
    this.latitude = null;
    this.longitude = null;
    this.notes = [];
    this.sendGPS = this.sendGPS.bind(this);
  }

  init() {
    this.gui.chatForm.addEventListener('submit', (e) => this.sendTextNote(e));
    this.gui.modal.addEventListener('submit', (evt) => this.sendGPS(evt));
    this.gui.modal.addEventListener('input', (e) => this.checkGPS(e));
  }

  checkGPS(e) {
    if (e) e.preventDefault();
    const errors = {
      gps: [/^\[{0,}-{0,1}\d{1,3}\.\d{5},\s{0,}-{0,1}\d{1,3}\.\d{5}\]{0,}$/, 'Mismatch pattern'],
    };
    const constraint = errors.gps[0];
    if (constraint.test(this.gui.modalInput.value)) {
      this.gui.modalInput.setCustomValidity('');
      this.gui.modalTooltip.innerText = '';
      return true;
    }
    this.gui.modalInput.setCustomValidity(errors.gps[1]);
    this.gui.modalTooltip.innerText = errors.gps[1];
    return false;
  }

  sendGPS(e) {
    if (e) e.preventDefault();
    if (!this.checkGPS(e)) return;

    const reg = /-{0,1}\d{1,3}\.\d{5}/g;
    const latitude = this.gui.modalInput.value.match(reg)[0];
    const longitude = this.gui.modalInput.value.match(reg)[1];
    const { text } = this;
    // сохранение
    this.notes.push({ text, latitude, longitude });
    this.showPosts();
    this.gui.modal.classList.add('hidden');
    this.gui.modalInput.value = '';
    this.text = null;
  }

  sendTextNote(e) {
    e.preventDefault();
    if (this.gui.postInput.value === '') return;
    const text = this.gui.postInput.value;
    // сохранить значение текста
    this.text = this.gui.postInput.value;
    this.showPosts();

    this.getlocation()
      .then((position) => {
        const latitude = position.coords.latitude.toFixed(5);
        const longitude = position.coords.longitude.toFixed(5);
        this.notes.push({ text, latitude, longitude });
        this.showPosts();
        this.gui.postList.scrollTo(0, 0);
      }).catch(() => {
        this.gui.modal.classList.remove('hidden');
        this.gui.modalInput.focus();
      });
    this.gui.postInput.value = '';
  }

  getlocation(options) {
    return new Promise((resolve, posError) => {
      navigator.geolocation.getCurrentPosition(resolve, posError, options);
    });
  }

  showPosts() {
    this.gui.postList.innerHTML = '';
    for (let i = this.notes.length - 1; i >= 0; i -= 1) {
      this.gui.postList.innerHTML += this.gui.textNoteTeplate(this.notes[i]);
    }
  }
}
