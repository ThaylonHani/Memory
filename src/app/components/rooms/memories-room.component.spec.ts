import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoriesRoomComponent } from './memories-room.component';

describe('MemoriesRoomComponent', () => {
  let component: MemoriesRoomComponent;
  let fixture: ComponentFixture<MemoriesRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoriesRoomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemoriesRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
