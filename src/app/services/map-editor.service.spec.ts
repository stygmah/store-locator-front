import { TestBed } from '@angular/core/testing';

import { MapEditorService } from './map-editor.service';

describe('MapEditorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapEditorService = TestBed.get(MapEditorService);
    expect(service).toBeTruthy();
  });
});
