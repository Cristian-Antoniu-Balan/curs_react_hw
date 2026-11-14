import { useCallback, useEffect, useState } from 'react'
import { listMembers } from '@/members/api/membersApi'
import { memberStrings } from '@/members/constants/strings'
import { resolveErrorMessage } from '@/members/utils/resolveErrorMessage'
import type { Member } from '@/members/types/member'

export function useMembersList() {
  const [members, setMembers] = useState<Member[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const reload = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await listMembers()
      setMembers(result)
    } catch (caught) {
      setError(resolveErrorMessage(caught, memberStrings.loadFailed))
      setMembers(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const result = await listMembers()
        if (!cancelled) {
          setMembers(result)
        }
      } catch (caught) {
        if (!cancelled) {
          setError(resolveErrorMessage(caught, memberStrings.loadFailed))
          setMembers(null)
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
  }, [])

  return {
    members,
    error,
    loading,
    reload,
  }
}
