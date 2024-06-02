import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderRoomsComponent } from './header-rooms.component';

describe('HeaderRoomsComponent', () => {
  let component: HeaderRoomsComponent;
  let fixture: ComponentFixture<HeaderRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderRoomsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
