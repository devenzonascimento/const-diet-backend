export type PaginationResponse<T> = {
  itens: T[]
  totalCount: number
  totalPages: number
  currentPage: number
}
