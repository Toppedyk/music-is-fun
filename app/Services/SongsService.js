import { ProxyState } from "../AppState.js";
import Song from "../Models/Song.js";
import { sandBoxApi } from "./AxiosService.js";

class SongsService {
  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  getMusicByQuery(query) {
    //NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?callback=?&term=" + query;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        ProxyState.songs = res.results.map(rawData => new Song(rawData));
        console.log(ProxyState.songs);
      })
      .catch(err => {
        throw new Error(err);
      });
      window.event.target.reset()
  }

  /**
   * Retrieves the saved list of songs from the sandbox
   */
  async getMySongs() {
    //TODO What are you going to do with this result
    let res = await sandBoxApi.get()
    ProxyState.playlist = res.data.map(s => new Song(s))
  }

  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async addSong(id) {
    let res = await sandBoxApi.post('', ProxyState.activeSong)
    ProxyState.playlist = [...ProxyState.playlist, new Song(res.data)]
    console.log(ProxyState.playlist)
  }

  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async removeSong(id) {
    //TODO Send the id to be deleted from the server then update the store
    let song = ProxyState.playlist.find(s => s.id === id)
    await sandBoxApi.delete(song.id)
    ProxyState.playlist = ProxyState.playlist.filter(s => s.id !== id)
  }
  setActive(id) {
    let song = ProxyState.songs.find(s => s.id === id)
    ProxyState.activeSong = song
  }
}

const service = new SongsService();
export default service;
