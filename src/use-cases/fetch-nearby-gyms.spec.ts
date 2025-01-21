import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { describe, expect, it } from "vitest"
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms"

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe("Fetch Nearby Gyms Use Case", () => {
  gymsRepository = new InMemoryGymsRepository()
  sut = new FetchNearbyGymsUseCase(gymsRepository)

  it("shoulb be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -23.3127928,
      longitude: -45.9931887,
    })

    await gymsRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -23.141616,
      longitude: -45.761729,
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.3127928,
      userLongitude: -45.9931887,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })])
  })
})
