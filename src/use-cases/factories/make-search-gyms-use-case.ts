import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { SearchGymsUseCase } from "../search-gyms"

export function makeSearchGymsUseCase() {
  const gymsReporitory = new PrismaGymsRepository()
  const useCase = new SearchGymsUseCase(gymsReporitory)

  return useCase
}
