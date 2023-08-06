import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const inputs = screen.getAllByPlaceholderText('title')
    const sendButton = screen.getByText('create')

    await user.type(inputs[0], 'testing a form...' )

    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].content).toBe('testing a form...' )
})