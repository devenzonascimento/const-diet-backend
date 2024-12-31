export type PaginationResponse<T> = {
  items: T[]
  totalCount: number
  totalPages: number
  currentPage: number
}
