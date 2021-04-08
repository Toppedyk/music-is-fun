export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price || 1;
    this.preview = data.previewUrl || data.preview;
    this.id = data.trackId || data.id;
   // this.id = this.id
  }

  get Template() {
    return `
    <div class="card my-2 shadow" onclick="app.songsController.setActive(${this.id})">
    <img src="${this.albumArt}" class="card-img-top" alt="...">
    <div class="card-body p-1">
      <h5 class="card-title">${this.artist} | ${this.title}</h5>
    </div>
    </div>
        `;
  }

  get playlistTemplate() {
    return `
    <div class="card my-2 shadow" >
    <img src="${this.albumArt}" class="card-img-top" alt="...">
    <div class="card-body p-1">
      <h5 class="card-title">${this.artist} | ${this.title}</h5>
      <div class = "d-flex">
      <audio controls><source src="${this.preview}" type="audio/ogg"</audio>
      </div>
    </div>
    <button type="button" class="btn btn-sm btn-outline-danger mt-2" onclick="app.songsController.removeSong('${this.id}')">Remove</button>
    </div>
        `;
  }

  get Active() {
    return `
    <div class="card shadow">
    <img src="${this.albumArt}" class="card-img-top" alt="...">
    <div class="card-body p-1">
      <h5 class="card-title">${this.artist} | ${this.title}</h5>
      <p>Album: ${this.album} | Buy Now $${this.price}</p>
    </div>
    <div>
      <audio controls><source src="${this.preview}" type="audio/ogg"</audio>
      </div>
      <button type="button" class="btn btn-outline-success" onclick="app.songsController.addSong(${this.id})">Add To Playlist</button>
    </div>
        `;
  }
}
