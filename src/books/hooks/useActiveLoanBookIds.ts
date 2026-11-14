import { useCallback, useEffect, useState } from 'react'
import { listLoans } from '@/loans/api/loansApi'

export function useActiveLoanBookIds() {
  const [bookIdsWithActiveLoans, setBookIdsWithActiveLoans] = useState<
    ReadonlySet<string>
  >(() => new Set())

  const reload = useCallback(async () => {
    try {
      const activeLoans = await listLoans(true)
      const ids = new Set(activeLoans.map((loan) => loan.book.id))
      setBookIdsWithActiveLoans(ids)
    } catch {
      setBookIdsWithActiveLoans(new Set())
    }
  }, [])

  useEffect(() => {
    void reload()
  }, [reload])

  return {
    bookIdsWithActiveLoans,
    reloadActiveLoanBookIds: reload,
  }
}
