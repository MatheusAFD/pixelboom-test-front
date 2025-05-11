import { useQuery } from '@tanstack/react-query'

import { getDashboardStats } from '@/services'

export const useGetDashboardStats = () => {
  const queryData = useQuery({
    queryKey: ['get-dashboard-stats'],
    queryFn: async () => {
      const [error, response] = await getDashboardStats()
      if (error) {
        throw error
      }

      return response
    },
    placeholderData: (prev) => prev,
    staleTime: 300000,
  })

  return { ...queryData, data: queryData?.data }
}
