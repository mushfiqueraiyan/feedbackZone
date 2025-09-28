"use client";

import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    const res = await fetch("/api/feedback");
    const data = await res.json();
    if (data.length > 0) {
      setFeedbacks(data);
      localStorage.setItem("feedbacks", JSON.stringify(data));
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("feedbacks");
    if (stored) setFeedbacks(JSON.parse(stored));

    fetchFeedbacks();
  }, []);

  const handleSubmit = async (e) => {
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, feedback }),
    });

    if (res.ok) {
      const newFeedback = await res.json();
      setFeedbacks((prev) => [...prev, newFeedback]);
      setName("");
      setEmail("");
      setFeedback("");
      localStorage.setItem(
        "feedbacks",
        JSON.stringify([...feedbacks, newFeedback])
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2">
            Feedback App
          </h1>
          <p className="text-gray-600 text-lg">Share your thoughts with us!</p>
        </div>

        <div className="bg-white backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl border-2 border-pink-100 bg-pink-50/50 focus:border-pink-300 focus:bg-white focus:outline-none transition-all duration-300 text-gray-700 placeholder-pink-300"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl border-2 border-purple-100 bg-purple-50/50 focus:border-purple-300 focus:bg-white focus:outline-none transition-all duration-300 text-gray-700 placeholder-purple-300"
                />
              </div>

              <div>
                <textarea
                  placeholder="Share your feedbacks here..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows="4"
                  className="w-full px-6 py-4 rounded-2xl border-2 border-indigo-100 bg-indigo-50/50 focus:border-indigo-300 focus:bg-white focus:outline-none transition-all duration-300 text-gray-700 placeholder-indigo-300 resize-none"
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-indigo-400 cursor-pointer text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 "
            >
              Send Feedback
            </button>
          </div>
        </div>

        {feedbacks.length > 0 && (
          <div className="bg-white backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
              Feedbacks
            </h2>

            <div className="space-y-4">
              {feedbacks.map((f, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-pink-50/80 via-purple-50/80 to-indigo-50/80 rounded-2xl p-6 border border-pink-100/50 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-gray-800 text-lg">
                        {f.name}
                      </p>
                      <p className="text-purple-600 text-sm">{f.email}</p>
                    </div>
                    <p className="text-pink-400 text-xs bg-white/50 px-3 py-1 rounded-full">
                      {new Date(f.date).toLocaleDateString()} at
                      {new Date(f.date).toLocaleTimeString([])}
                    </p>
                  </div>

                  <div className="bg-white/60 rounded-xl p-4 mt-3">
                    <p className="text-gray-700 leading-relaxed">
                      {f.feedback}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {feedbacks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4"></div>
            <p className="text-gray-500 text-lg">
              No feedback yet... be the first to share!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
