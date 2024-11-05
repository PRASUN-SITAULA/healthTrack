import { Mock, beforeEach, describe, expect, it, vi } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import UserSignUpForm from "@/components/form/userSignUpForm"
import { signup } from "@/actions/auth"

const mockPush = vi.fn()
const mockToast = vi.fn()

// mock the signup function
vi.mock("@/actions/auth", () => ({
  signup: vi.fn(),
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

describe("SignUpForm", () => {
  beforeEach(() => {
    // Reset the mock before each test to avoid state carryover
    vi.clearAllMocks()
  })
  it("should signup successfully", async () => {
    ;(signup as Mock).mockResolvedValue({ success: "successfully signed up" })
    render(<UserSignUpForm />)

    // Fill in the form
    const emailInput = screen.getByPlaceholderText("Enter your Email")
    const passwordInput = screen.getByPlaceholderText("Enter your password")
    const nameInput = screen.getByPlaceholderText("Enter your name")

    // Select Gender
    const genderSelect = screen.getByText(/gender/i)
    fireEvent.mouseDown(genderSelect)
    const maleOption = await screen.findByText("Female")
    fireEvent.click(maleOption)

    // Select Date of Birth
    const datePickerTrigger = screen.getByText(/Date of birth/i)
    fireEvent.click(datePickerTrigger)

    // Select Day
    const dayTrigger = screen.getByText(/day/i)
    fireEvent.mouseDown(dayTrigger)
    const dayOption = screen.getByText("15")
    fireEvent.click(dayOption)

    // Select Month
    const monthTrigger = screen.getByText(/month/i)
    fireEvent.mouseDown(monthTrigger)
    const monthOption = screen.getByText("March")
    fireEvent.click(monthOption)

    // Select Year
    const yearTrigger = screen.getByText(/year/i)
    fireEvent.mouseDown(yearTrigger)
    const yearOption = screen.getByText("2000")
    fireEvent.click(yearOption)
    const buttonInput = screen.getByText("Sign Up")

    // Submit the form
    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } })
    fireEvent.change(passwordInput, { target: { value: "password123" } })
    fireEvent.change(nameInput, { target: { value: "John Doe" } })

    // Submit the form
    fireEvent.click(buttonInput)

    await waitFor(() => {
      expect(signup).toHaveBeenCalledWith({
        email: "test@gmail.com",
        password: "password123",
        name: "John Doe",
        dob: new Date("1930-01-01T00:00:00.000Z"),
        gender: "male",
      })
    })
  })
})
// describe("SignUpForm", () => {
//   beforeEach(() => {
//     vi.mock("@/api/auth", async () => {
//       return {
//         signup: vi.fn().mockResolvedValue({ data: { token: "token" } }),
//       }
//     })
//   })

//   afterEach(() => {
//     vi.clearAllMocks()

//     fireEvent.change(emailInput, { target: { value: "test@example.com" } })
//     fireEvent.change(passwordInput, { target: { value: "password123" } })
//     fireEvent.change(nameInput, { target: { value: "John Doe" } })
//     fireEvent.change(dobInput, { target: { value: "01/01/2000" } })

//     // Submit the form
//     const submitButton = screen.getByText("Sign Up")
//     fireEvent.click(submitButton)

//     // Verify signup was called with correct data
//     expect(signup).toHaveBeenCalledWith({
//       email: "test@example.com",
//       password: "password123",
//       name: "John Doe",
//       dob: "01/01/2000",
//     })
//   })
// })

// import { Mock, beforeEach, describe, expect, it, vi } from "vitest"
// import { render, screen, fireEvent, waitFor } from "@testing-library/react"
// import { UserSignUpForm } from "@/components/form/userSignUpForm"
// import { signup } from "@/actions/auth"

// // Mock the necessary dependencies
// vi.mock('next/navigation', () => ({
//   useRouter: () => ({
//     push: vi.fn(),
//   }),
// }))

// vi.mock('@/actions/auth', () => ({
//   signup: vi.fn(),
// }))

// describe('UserSignUpForm', () => {
//   it('should allow selecting gender', async () => {
//     render(<UserSignUpForm />)

//     // Open the gender select dropdown
//     const genderSelect = screen.getByRole('combobox', { name: /gender/i })
//     await fireEvent.click(genderSelect)

//     // Select "female" option
//     const femaleOption = screen.getByRole('option', { name: /female/i })
//     await fireEvent.click(femaleOption)

//     // Verify the selected value
//     expect(genderSelect).toHaveTextContent('female')
//   })

//   it('should allow selecting date of birth', async () => {
//     render(<UserSignUpForm />)

//     // Open the date picker
//     const datePickerButton = screen.getByRole('button', { name: /date of birth/i })
//     await fireEvent.click(datePickerButton)

//     // Select year from dropdown
//     const yearSelect = screen.getByLabelText(/year/i)
//     await fireEvent.selectOptions(yearSelect, '1990')

//     // Select month from dropdown
//     const monthSelect = screen.getByLabelText(/month/i)
//     await fireEvent.selectOptions(monthSelect, '3') // March

//     // Select day from dropdown
//     const daySelect = screen.getByLabelText(/day/i)
//     await fireEvent.selectOptions(daySelect, '15')

//     // Verify the selected date is displayed
//     expect(datePickerButton).toHaveTextContent('March 15, 1990')
//   })

//   it('should submit form with selected gender and DOB', async () => {
//     const mockSignup = jest.fn()
//     jest.spyOn(require('@/actions/auth'), 'signup').mockImplementation(mockSignup)

//     render(<UserSignUpForm />)

//     // Fill in required fields
//     await fireEvent.type(screen.getByPlaceholderText(/email/i), 'test@example.com')
//     await fireEvent.type(screen.getByPlaceholderText(/password/i), 'password123')
//     await fireEvent.type(screen.getByPlaceholderText(/name/i), 'Test User')

//     // Select gender
//     const genderSelect = screen.getByRole('combobox', { name: /gender/i })
//     await fireEvent.click(genderSelect)
//     await fireEvent.click(screen.getByRole('option', { name: /female/i }))

//     // Select DOB
//     const datePickerButton = screen.getByRole('button', { name: /date of birth/i })
//     await fireEvent.click(datePickerButton)
//     await fireEvent.selectOptions(screen.getByLabelText(/year/i), '1990')
//     await fireEvent.selectOptions(screen.getByLabelText(/month/i), '3')
//     await fireEvent.selectOptions(screen.getByLabelText(/day/i), '15')

//     // Submit form
//     const submitButton = screen.getByRole('button', { name: /sign up/i })
//     await fireEvent.click(submitButton)

//     // Verify form submission
//     await waitFor(() => {
//       expect(mockSignup).toHaveBeenCalledWith({
//         email: 'test@example.com',
//         password: 'password123',
//         name: 'Test User',
//         gender: 'female',
//         dob: new Date(1990, 2, 15), // Month is 0-based
//       })
//     })
//   })
// })
