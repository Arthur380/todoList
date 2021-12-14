import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceDetectComponent } from './voice-detect.component';

describe('VoiceDetectComponent', () => {
  let component: VoiceDetectComponent;
  let fixture: ComponentFixture<VoiceDetectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoiceDetectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiceDetectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
