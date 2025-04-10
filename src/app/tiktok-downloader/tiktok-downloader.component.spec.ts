import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TikTokDownloaderComponent } from './tiktok-downloader.component';

describe('TikTokDownloaderComponent', () => {
  let component: TikTokDownloaderComponent;
  let fixture: ComponentFixture<TikTokDownloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TikTokDownloaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TikTokDownloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
