import { jest } from '@jest/globals'
import { ingest, ingestWorksheet } from './ingest';
import xlsx from 'node-xlsx';

jest.mock('../../model/Track.js');

describe('ingest', () => {
  console.error = jest.fn();
  console.log = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('ingest', () => {
    const mockWorksheet = {
      name: 'worksheet1',
      data: [
        ['id', 'name'],
        [1, 'John Doe'],
        [2, 'Jane Doe'],
      ]
    };

    it('should log error and return null if file not found', () => {
      const result = ingest('some unknown file');

      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(`ENOENT: no such file or directory, open 'data/some unknown file.xlsx'`);
    });

    it('should return worksheet', () => {
      xlsx.parse = jest.fn().mockReturnValue(mockWorksheet);

      const result = ingest('Track Import Test');

      expect(result).toEqual(mockWorksheet);
    });
  });

  describe('ingestTrack', () => {
    const mockData = [
      {
        data: [
          ['id', 'title', 'version', 'artist', 'isrc', 'pline', 'aliases', 'contract'],
          ['adasd', , ' ', '', 'asdasdasdd', 'asdasdas'],
          ['', 'Track 1', '1.0', 'Some Artist1', '12345', 'Pl1', 'test1;test 1 ;test111', 'Contract 1'],
          ['', 'Track 2', '1.0', 'Some Artist2', '54321', 'Pl1', 'test2;test 2 ;test222', 'Contract 2'],
        ],
      },
    ];

    it('should log error and return null if no worksheet found', async () => {
      let result = await ingestWorksheet([]);
      expect(result.tracks).toBeUndefined();
      expect(result.errors).toEqual(['[Ingest] No worksheet found']);


      result = await ingestWorksheet([]);
      expect(result.tracks).toBeUndefined();
      expect(result.errors).toEqual(['[Ingest] No worksheet found']);

      result = await ingestWorksheet([]);
      expect(result.tracks).toBeUndefined();
      expect(result.errors).toEqual(['[Ingest] No worksheet found']);

      result = await ingestWorksheet([]);
      expect(result.tracks).toBeUndefined();
      expect(result.errors).toEqual(['[Ingest] No worksheet found']);
    });

    it('should log error and return null if no headers found', async () => {
      const result = await ingestWorksheet([{ data: [] }]);

      expect(result.tracks).toBeUndefined();
      expect(result.errors).toEqual(['[Ingest] No headers found']);
    });
  });
});
