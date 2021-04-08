export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price || 1;
    this.preview = data.previewUrl || data.preview;
    this._id = data.trackId || data._id;
    this.id = this._id
  }

  get Template() {
    return `
    <div class="card" style="width: 18rem;" onclick="app.songsController.setActive(${this._id})">
    <img src="${this.albumArt}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${this.artist} | ${this.title}</h5>
    </div>
    </div>
        `;
  }

  get playlistTemplate() {
    return `
    <div class="card" style="width: 18rem;">
    <img src="${this.albumArt}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${this.artist} | ${this.title}</h5>
      <button type="button" class="btn btn-outline-danger" onclick="app.songsController.removeSong('${this._id}')">Remove</button>
    </div>
    </div>
        `;
  }

  get Active() {
    return `
    <div class="card">
    <img src="${this.albumArt}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${this.artist} | ${this.title}</h5>
      <p>Album: ${this.album} | Buy Now $${this.price}</p>
    </div>
    <div>
      <audio controls><source src="${this.preview}" type="audio/ogg"</audio>
      </div>
      <button type="button" class="btn btn-outline-success" onclick="app.songsController.addSong(${this._id})">Add To Playlist</button>
    </div>
        `;
  }
}
