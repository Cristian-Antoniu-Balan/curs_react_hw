import {
  ApiPath,
  ApiQueryParam,
  loanByIdPath,
  loanReturnPath,
} from '@/shared/constants/api'
import { HttpMethod } from '@/shared/constants/http'
import { apiRequest } from '@/shared/api/client'
import type { Loan, LoanRequest } from '@/loans/types/loan'

export function listLoans(active?: boolean): Promise<Loan[]> {
  if (active === undefined) {
    return apiRequest<Loan[]>(ApiPath.Loans)
  }

  return apiRequest<Loan[]>(ApiPath.Loans, {
    query: { [ApiQueryParam.Active]: active },
  })
}

export function getLoan(id: string): Promise<Loan> {
  return apiRequest<Loan>(loanByIdPath(id))
}

export function createLoan(payload: LoanRequest): Promise<Loan> {
  return apiRequest<Loan>(ApiPath.Loans, {
    method: HttpMethod.Post,
    body: payload,
  })
}

export function returnLoan(id: string): Promise<Loan> {
  return apiRequest<Loan>(loanReturnPath(id), {
    method: HttpMethod.Post,
  })
}
