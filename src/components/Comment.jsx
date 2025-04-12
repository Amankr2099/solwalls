import React, { useState } from 'react'

export const Comment = () => {
    const [ comment , setComment ] = useState('')
  return (
    <div>
        {/* Comment Box Section */}
      <section className="max-w-screen-md mx-auto my-10 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Leave a Comment
        </h2>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="5"
          placeholder="Write your comment here..."
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
        ></textarea>
        <button
          onClick={() => alert("Comment Submitted!")}
          className="w-1/4 mx-auto bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition mt-4 sm:mt-6"
        >
          Submit Comment
        </button>
      </section>
    </div>
  )
}
