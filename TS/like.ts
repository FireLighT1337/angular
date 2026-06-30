class Like {
  constructor(private _numLikes: number, private _isOn: boolean) {
    this._numLikes = _numLikes ?? 0;
    this._isOn = _isOn ?? false;
  }

  click() {
    if (this._isOn === true) {
      this._numLikes--;
    } else {
      this._numLikes++;
    }
    // cleaner way
    // this.numLikes += (this.isOn) ? -1 : 1;
    this._isOn = !this._isOn;
  }

  get numLikes() {
    return this._numLikes;
  }

  get isOn() {
    return this._isOn;
  }
}
