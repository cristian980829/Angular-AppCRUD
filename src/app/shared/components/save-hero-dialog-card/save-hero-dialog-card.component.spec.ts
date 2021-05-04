import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveHeroDialogCardComponent } from './save-hero-dialog-card.component';

describe('SaveHeroDialogCardComponent', () => {
  let component: SaveHeroDialogCardComponent;
  let fixture: ComponentFixture<SaveHeroDialogCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveHeroDialogCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveHeroDialogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
