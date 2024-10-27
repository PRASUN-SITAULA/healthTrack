import { expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import Hero from "@/components/hero"

test("Page", () => {
  render(<Hero />)
  expect(screen.getByRole("heading", { level: 1, name: "Home" })).toBeDefined()
})
