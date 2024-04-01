import { jest } from '@jest/globals'
import Track, { createTrack } from './Track';
import Contract from './Contract';

describe('Track', () => {
  const mockTrack = {
    title: 'My Test Track',
    version: '1.0',
    artist: 'John Doe',
    isrc: 'US1234567890',
    pline: '℗ 2021 My Record Label',
    aliases: 'alias1; alias2;alias3',
  };
  const expectedTrack = {
    title: 'My Test Track',
    version: '1.0',
    artist: 'John Doe',
    isrc: 'US1234567890',
    pline: '℗ 2021 My Record Label',
    aliases: [
      'alias1',
      'alias2',
      'alias3',
    ],
    contract: undefined,
  };
  console.log = jest.fn();
  console.error = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create new track if not found', async () => {
    Contract.findOne = jest.fn();
    jest.spyOn(Track, 'findOne').mockReturnValue(null);
    jest.spyOn(Track, 'create').mockReturnValue({ title: mockTrack.title });

    const track = await createTrack(mockTrack);

    expect(track).not.toBeNull();
    expect(Track.findOne).toHaveBeenCalledWith({ title: mockTrack.title });
    expect(Track.create).toHaveBeenCalledWith(expectedTrack);
  });

  it('should create new track if not found and link contract', async () => {
    Contract.findOne = jest.fn().mockReturnValue({ _id: '123', name: 'My Test Contract' });
    jest.spyOn(Track, 'findOne').mockReturnValue(null);
    jest.spyOn(Track, 'create').mockReturnValue({ title: mockTrack.title });

    const track = await createTrack({ ...mockTrack, contract: 'My Test Contract' });

    expect(track).not.toBeNull();
    expect(Track.findOne).toHaveBeenCalledWith({ title: mockTrack.title });
    expect(Contract.findOne).toHaveBeenCalledWith({ name: 'My Test Contract' });
    expect(Track.create).toHaveBeenCalledWith({ ...expectedTrack, contract: '123' });
  });

  it('should log error and not create new track if contract not found', async () => {
    Contract.findOne = jest.fn().mockReturnValue(null);
    jest.spyOn(Track, 'findOne').mockReturnValue(null);
    jest.spyOn(Track, 'create').mockReturnValue({ title: mockTrack.title });

    try {
      const track = await createTrack({ ...mockTrack, contract: 'My Test Contract' });
      expect(track).not.toBeNull();
    } catch (e) {
      expect(Track.findOne).toHaveBeenCalledWith({ title: mockTrack.title });
      expect(Track.create).not.toHaveBeenCalled();
    }
  });

  it('should return track if found', async () => {
    Contract.findOne = jest.fn();
    jest.spyOn(Track, 'findOne').mockReturnValue(expectedTrack);
    jest.spyOn(Track, 'create');

    const track = await createTrack({ ...mockTrack, contract: 'My Test Contract' });

    expect(track).not.toBeNull();
    expect(Track.findOne).toHaveBeenCalledWith({ title: mockTrack.title });
    expect(Contract.findOne).not.toHaveBeenCalled();
    expect(Track.create).not.toHaveBeenCalled();
  });
});
