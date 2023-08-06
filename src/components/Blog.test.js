import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
// import Note from './Note'

test('renders content', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Test Author',
        url: 'www.testurl.com',
        likes: 5
    }

    const { container } = render(<Blog blog={blog} />)

    const element = screen.getByText('Component testing is done with react-testing-library')
    const div = container.querySelector('.blog')
    expect(element).toBeDefined()
    expect(div).toHaveTextContent('Component testing is done with react-testing-library')
})

test('clicking the button calls event handler once', async () => {
    const blog = {
        user : { id: '123456789', username: 'testUser', name: 'Test User' },
        title: 'Component testing is done with react-testing-library',
        author: 'Test Author',
        url: 'www.testurl.com',
        likes: 5
    }

    const mockHandler = jest.fn()

    render(<Blog blog={blog} updateBlog={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    expect(mockHandler.mock.calls).toHaveLength(1)
})

// test('renders content', () => {
//     const note = {
//         content: 'Component testing is done with react-testing-library',
//         important: true
//     }

//     render(<Note note={note} />)

//     const element = screen.getByText('Component testing is done with react-testing-library')
//     expect(element).toBeDefined()
// })