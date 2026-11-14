import { useCallback, useEffect, useState } from 'react'
import { listLoans } from '@/loans/api/loansApi'
import {
  LoanActiveFilter,
  type LoanActiveFilter as LoanActiveFilterValue,
} from '@/loans/constants/activeFilter'
import { loanStrings } from '@/loans/constants/strings'
import type { Loan } from '@/loans/types/loan'
import { resolveErrorMessage } from '@/shared/utils/resolveErrorMessage'

function activeQueryFromFilter(
  filter: LoanActiveFilterValue,
): boolean | undefined {
  if (filter === LoanActiveFilter.Active) {
    return true
  }

  if (filter === LoanActiveFilter.Inactive) {
    return false
  }

  return undefined
}

export function useLoansList(filter: LoanActiveFilterValue) {
  const [loans, setLoans] = useState<Loan[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const reload = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await listLoans(activeQueryFromFilter(filter))
      setLoans(result)
    } catch (caught) {
      setError(resolveErrorMessage(caught, loanStrings.loadFailed))
      setLoans(null)
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const result = await listLoans(activeQueryFromFilter(filter))
        if (!cancelled) {
          setLoans(result)
        }
      } catch (caught) {
        if (!cancelled) {
          setError(resolveErrorMessage(caught, loanStrings.loadFailed))
          setLoans(null)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [filter])

  return {
    loans,
    error,
    loading,
    reload,
  }
}
