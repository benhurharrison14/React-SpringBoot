import React from "react"
import { render, screen } from "@testing-library/react"
import Modal from "."
import NameCashKick from "../nameCashKickModal"

describe("Modal Component",()=>{
    test("verify component render",()=>{
        render(<Modal modalOpen={true} modalOnClose={jest.fn()}>
            <NameCashKick/>
        </Modal>)
        expect(screen.getByRole("dialog")).toBeInTheDocument()
    })
})