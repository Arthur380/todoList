import { Component, ChangeDetectionStrategy, NgZone } from '@angular/core';
import {TodolistService} from '../todolist.service';

declare const annyang: any;


@Component({
  selector: 'app-voice-detect',
  templateUrl: './voice-detect.component.html',
  styleUrls: ['./voice-detect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoiceDetectComponent {

  voiceActiveSectionDisabled = true;
  voiceActiveSectionError = false;
  voiceActiveSectionSuccess = false;
  voiceActiveSectionListening = false;
  voiceText: any;
  voiceTextOld: any;

  constructor(private ngZone: NgZone, private TDLS: TodolistService){}

  initializeVoiceRecognitionCallback(): void {
    annyang.addCallback('error', (err: any) => {
      if (err.error === 'network'){
        this.voiceText = 'Internet is require';
        annyang.abort();
        this.ngZone.run(() => this.voiceActiveSectionSuccess = true);
      } else if (this.voiceText === undefined) {
        this.ngZone.run(() => this.voiceActiveSectionError = true);
        annyang.abort();
      }
    });

    annyang.addCallback('soundstart', (res: any) => {
      this.ngZone.run(() => this.voiceActiveSectionListening = true);
    });

    annyang.addCallback('end', () => {
      if (this.voiceText === undefined) {
        this.ngZone.run(() => this.voiceActiveSectionError = true);
        annyang.abort();
      }
    });

    annyang.addCallback('result', (userSaid: any) => {
      this.ngZone.run(() => this.voiceActiveSectionError = false);

      const queryText: any = userSaid[0];

      annyang.abort();

      this.voiceText = queryText;
      if (this.voiceText !== null && this.voiceText !== undefined && this.voiceText !== this.voiceTextOld){
        this.voiceTextOld = this.voiceText;
        this.TDLS.append(queryText);
      }
      this.closeVoiceRecognition();
    });
  }

  startVoiceRecognition(): void {
    this.voiceActiveSectionDisabled = false;
    this.voiceActiveSectionError = false;
    this.voiceActiveSectionSuccess = false;
    this.voiceText = undefined;

    if (annyang) {
      const commands = {
        'demo-annyang': () => { }
      };

      annyang.addCommands(commands);

      this.initializeVoiceRecognitionCallback();

      annyang.start({ autoRestart: false });
    }
  }
  closeVoiceRecognition(): void {
    this.voiceActiveSectionDisabled = true;
    this.voiceActiveSectionError = false;
    this.voiceActiveSectionSuccess = false;
    this.voiceActiveSectionListening = false;
    this.voiceText = undefined;
    if (annyang){
      annyang.abort();
    }
  }
}
