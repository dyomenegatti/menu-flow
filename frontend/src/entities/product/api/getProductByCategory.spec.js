import { describe, it, expect, vi } from 'vitest';
import api from '../../../shared/api/index';
import { getProductByCategory } from './getProductByCategory';

vi.mock('../../../shared/api/index', () => ({
  default: {
    get: vi.fn()
  }
}));

describe('getProductByCategory', () => {
  it('deve chamar API com id da categoria na rota', async () => {
    const mockProducts = [
      { id: 1, category_id: 1, name: 'X-Burguer' }
    ];

    api.get.mockResolvedValue({
      data: mockProducts
    });

    const result = await getProductByCategory(1);

    expect(api.get).toHaveBeenCalledWith(
      '/categories/1/products'
    );

    expect(result).toEqual(mockProducts);
  });
});