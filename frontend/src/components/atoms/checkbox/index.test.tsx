import React from "react"
import Checkbox from "."
import { fireEvent, render, screen } from "@testing-library/react"

describe("Checkbox component",() => {
    test("verify component rendering",()=>{
        render(<Checkbox/>)
        const checkbox = screen.getByRole("checkbox")
        const checkboxIcon = screen.getByAltText("unchecked icon")
        expect(checkboxIcon).toBeInTheDocument()
        fireEvent.click(checkbox)
        expect(checkbox).toBeChecked()
        expect(screen.getByAltText("checked icon")).toBeInTheDocument()
    })

    test("verify indeterminate icon",()=>{
        render(<Checkbox indeterminate/>)
        const indeterminateIcon = screen.getByAltText("indeterminate icon")
        expect(indeterminateIcon).toBeInTheDocument()
        expect(screen.queryByAltText("checked icon")).not.toBeInTheDocument()
    })
})