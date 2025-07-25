import { useQuery } from "@tanstack/react-query"
import { getAuthUser } from "../lib/api"

export default function useAuthUser() {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  })

  return { isLoading: authUser.isLoading, authUser: authUser.data?.user }
}

