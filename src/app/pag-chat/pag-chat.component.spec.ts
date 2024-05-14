import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagChatComponent } from './pag-chat.component';

describe('PagChatComponent', () => {
  let component: PagChatComponent;
  let fixture: ComponentFixture<PagChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagChatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
