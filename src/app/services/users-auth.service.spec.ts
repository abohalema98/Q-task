import { TestBed } from '@angular/core/testing';

import { UsersAuthService } from './users-auth.service';

describe('UsersAuthService', () => {
  let service: UsersAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
