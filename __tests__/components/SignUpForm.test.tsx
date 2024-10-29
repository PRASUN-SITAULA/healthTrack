import { Mock, beforeEach, describe, expect, it, vi } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import  SignUpForm from "@/components/form/userSignUpForm"

describe("SignUpForm", () => {
  it("should signup successfully", () => {
    render(<SignUpForm />)

    // Fill in the form
    const emailInput = screen.getByPlaceholderText("Enter your Email")
    const passwordInput = screen.getByPlaceholderText("Enter your password")
    const nameInput = screen.getByPlaceholderText("Enter your name")
    const dobInput = screen.getByPlaceholderText("Enter your date of birth")

    fireEvent.change(emailInput, { target: { value: "test@example.com" } })
    fireEvent.change(passwordInput, { target: { value: "password123" } })
    fireEvent.change(nameInput, { target: { value: "John Doe" } })
    fireEvent.change(dobInput, { target: { value: "01/01/2000" } })

    // Submit the form
    const submitButton = screen.getByText("Sign Up")
    fireEvent.click(submitButton)

    // Verify signup was called with correct data
    expect(signup).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
      name: "John Doe",
      dob: "01/01/2000",
  })
})
