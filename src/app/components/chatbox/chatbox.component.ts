import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FilesService } from '../../services/files.service';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html'
})
export class ChatboxComponent {
  message = new FormControl("", { nonNullable: true });
  hasMessage = false;
  @Output() sendMessage = new EventEmitter<string>();
  constructor(private files: FilesService) {}
  lookForPhotos(){
    if (Capacitor.getPlatform() !== 'web'){
      this.files.requestIfNoPermissions();
    }
  }
  emitSendMessage(){
		navigator.vibrate(100);
    this.sendMessage.emit(this.message.value);
		this.message.reset();
  }
}

