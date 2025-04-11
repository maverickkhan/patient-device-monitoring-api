import { DEFAULT_PAGINATION, PaginationDto } from '../constants';

/**
 * @param {any} pagination?:PaginationDto
 * @returns {any}
 */
export const PAGINATION_CONSTRUCTOR = (pagination?: PaginationDto) => {
  return {
    skip: pagination
      ? (pagination.page - 1) * pagination?.limit
      : DEFAULT_PAGINATION.PAGE,
    take: pagination ? +pagination.limit : DEFAULT_PAGINATION.PAGE_SIZE,
  };
};

/**
 * @param {any} count:number
 * @param {any} pagination?:PaginationDto
 * @returns {any}
 */
export const METADATA_CONSTRUCTOR = (
  count: number,
  pagination?: PaginationDto,
) => {
  return {
    page: pagination ? +pagination?.page : DEFAULT_PAGINATION.PAGE + 1,
    limit: pagination ? pagination?.limit : DEFAULT_PAGINATION.PAGE_SIZE,
    total: {
      pages: Math.ceil(
        count /
          (pagination ? +pagination?.limit : DEFAULT_PAGINATION.PAGE_SIZE),
      ),
      records: count,
    },
  };
};
