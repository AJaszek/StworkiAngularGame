import { TestBed } from '@angular/core/testing';

import { ApiConnectorService } from './api-connector.service';

describe('ApiConnectorService', () => {
  let service: ApiConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
