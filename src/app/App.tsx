import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/app/layout/AppLayout'
import { BooksPage } from '@/books/pages/BooksPage'
import { MembersPage } from '@/members/pages/MembersPage'
import { LoansPage } from '@/loans/pages/LoansPage'
import { AppRoute, AppRouteSegment } from '@/shared/constants/routes'

export default function App() {
  const content = (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to={AppRoute.Books} replace />} />
        <Route path={AppRouteSegment.Books} element={<BooksPage />} />
        <Route path={AppRouteSegment.Members} element={<MembersPage />} />
        <Route path={AppRouteSegment.Loans} element={<LoansPage />} />
      </Route>
    </Routes>
  )

  return content
}
