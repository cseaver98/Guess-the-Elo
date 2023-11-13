import { TestBed } from '@angular/core/testing';

import { ChessWebApiService } from './chess-web-api.service';

describe('ChessWebApiServiceService', () => {
  let service: ChessWebApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChessWebApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
