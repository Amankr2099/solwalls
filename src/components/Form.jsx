'use client'
import React, { useState } from 'react'

export const Form = () => {
      const [name, setName] = useState("");
      const [comment, setComment] = useState("");

      const handleFormSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here (e.g., send to server)
        alert("Submitted!");
      };
  return (
    <div>
              {/* Form Section */}
      <section className="my-12 px-4 sm:px-6 lg:px-8 text-center" id='contact'>
        <h2 className="text-2xl font-semibold text-center mb-6">
          Leave Your Comments
        </h2>
        <form
          onSubmit={handleFormSubmit}
          className="max-w-lg mx-auto space-y-4"
        >
          <div>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              placeholder="Name"
            />
          </div>
          <div>
            <textarea
              type="comment"
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              placeholder="Comment"
            />
          </div>
          <button
            type="submit"
            className="w-1/4 mx-auto bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  )
}
