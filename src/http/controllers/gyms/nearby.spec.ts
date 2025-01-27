import { app } from "@/app"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

describe("Search Nearby Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to list nearby gyms", async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "JavaScript Gym",
        description: "Some description",
        phone: "11998887676",
        latitude: -23.3127928,
        longitude: -45.9931887,
      })

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "TypeScript Gym",
        description: "Some description",
        phone: "11998887676",
        latitude: -23.141616,
        longitude: -45.761729,
      })

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -23.3127928,
        longitude: -45.9931887,
      })
      .set("Authorization", `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "JavaScript Gym",
      }),
    ])
  })
})
