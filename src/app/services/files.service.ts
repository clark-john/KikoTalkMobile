import { Injectable } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor() { }
  async requestIfNoPermissions(): Promise<void> {    
    const pstatus = await Filesystem.checkPermissions();
    if (pstatus.publicStorage != "granted") {
      await Filesystem.requestPermissions();
    }
  }
}
