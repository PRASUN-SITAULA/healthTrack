import { Mock, beforeEach, describe, expect, it, vi } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import UserSignInForm from "@/components/form/userSignInForm"
import { signin } from "@/actions/auth"

const mockPush = vi.fn()
const mockToast = vi.fn()

// Mock the signin action
vi.mock("@/actions/auth", () => ({
  signin: vi.fn(),
}))

// Mock other dependencies
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

vi.mock("@/components/hooks/use-toast", () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}))

describe("UserSignInForm", () => {
  beforeEach(() => {
    // Reset the mock before each test to avoid state carryover
    vi.clearAllMocks()
  })
  it("should handle successful signin", async () => {
    // Mock successful signin response
    ;(signin as Mock).mockResolvedValue({
      success: "Successfully signed in",
    })

    render(<UserSignInForm />)

    // Fill in the form
    const emailInput = screen.getByPlaceholderText("Enter your Email")
    const passwordInput = screen.getByPlaceholderText("Enter your password")

    fireEvent.change(emailInput, { target: { value: "test@example.com" } })
    fireEvent.change(passwordInput, { target: { value: "password123" } })

    // Submit the form
    const submitButton = screen.getByText("Sign In")
    fireEvent.click(submitButton)

    // Verify signin was called with correct data
    await waitFor(() => {
      expect(signin).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      })
      expect(mockPush).toHaveBeenCalledWith("/dashboard")
      expect(mockToast).toHaveBeenCalledWith({
        title: "Success",
        description: "Successfully signed in",
        variant: "default",
      })
    })
  })

  it("should handle signin error", async () => {
    // Mock error response
    ;(signin as Mock).mockResolvedValue({
      error: "Invalid credentials",
    })

    vi.mock("@/components/hooks/use-toast", () => ({
      useToast: () => ({
        toast: mockToast,
      }),
    }))

    render(<UserSignInForm />)

    // Fill and submit form
    const emailInput = screen.getByPlaceholderText("Enter your Email")
    const passwordInput = screen.getByPlaceholderText("Enter your password")

    fireEvent.change(emailInput, { target: { value: "test@example.com" } })
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } })

    const submitButton = screen.getByText("Sign In")
    fireEvent.click(submitButton)

    // Verify error handling
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      })
    })
  })

  it("should handle unexpected errors", async () => {
    // Mock a rejected promise
    ;(signin as Mock).mockRejectedValue(new Error("Network error"))

    vi.mock("@/components/hooks/use-toast", () => ({
      useToast: () => ({
        toast: mockToast,
      }),
    }))

    render(<UserSignInForm />)

    // Fill and submit form
    const emailInput = screen.getByPlaceholderText("Enter your Email")
    const passwordInput = screen.getByPlaceholderText("Enter your password")

    fireEvent.change(emailInput, { target: { value: "test@example.com" } })
    fireEvent.change(passwordInput, { target: { value: "password123" } })

    const submitButton = screen.getByText("Sign In")
    fireEvent.click(submitButton)

    // Verify error handling
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: "Error",
        description: expect.stringContaining("Network error"),
        variant: "destructive",
      })
    })
  })
})
