"use client";
import React, { useState } from "react";

export const Comment = () => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "3643ce41-a0a5-4baf-bec4-4a46bc6505b5");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      alert("Comment Submitted !");
      event.target.reset();
    } else {
      alert("Unable to send at current moment");
    }
  };

  return (
    <div>
      {/* Form Section */}
      <section className="my-12 px-4 sm:px-6 lg:px-8 text-center ">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Leave Your Comments
        </h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto space-y-4 text-gray-900"
        >
          <div>
            <input
              type="text"
              id="name"
              name="name" // <-- Add this
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 mb-5"
              required
              placeholder="Name"
            />

            <textarea
              id="comment"
              name="comment" // <-- Add this
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
  );
};
