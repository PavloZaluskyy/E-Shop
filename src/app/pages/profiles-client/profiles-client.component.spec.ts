import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesClientComponent } from './profiles-client.component';

describe('ProfilesClientComponent', () => {
  let component: ProfilesClientComponent;
  let fixture: ComponentFixture<ProfilesClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilesClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfilesClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
