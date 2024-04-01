import { jest } from '@jest/globals'
import Contract, { createContract } from './Contract';

describe('Contract', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return existing contract if found', async () => {
    jest.spyOn(Contract, 'findOne').mockReturnValue({ name: 'My Test Contract' });
    jest.spyOn(Contract, 'create');

    const contract = await createContract('My Test Contract');

    expect(contract).not.toBeNull();
    expect(Contract.findOne).toHaveBeenCalledWith({ name: 'My Test Contract' });
    expect(Contract.create).not.toHaveBeenCalled();
  });

  it('should create new contract if not found', async () => {
    jest.spyOn(Contract, 'findOne').mockReturnValue(null);
    jest.spyOn(Contract, 'create').mockReturnValue({ name: 'My Test Contract' });
    console.log = jest.fn();

    const contract = await createContract('My Test Contract');

    expect(contract).not.toBeNull();
    expect(Contract.findOne).toHaveBeenCalledWith({ name: 'My Test Contract' });
    expect(Contract.create).toHaveBeenCalledWith({ name: 'My Test Contract' });
  });
});
