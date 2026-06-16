"use client";

import { useCallback, useState } from "react";

export const useFormFeedback = () => {
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const clearFeedback = useCallback(() => {
    setFeedback({ type: "", message: "" });
  }, []);

  const setSuccess = useCallback((message) => {
    setFeedback({ type: "success", message });
  }, []);

  const setError = useCallback((message) => {
    setFeedback({ type: "error", message });
  }, []);

  return { feedback, clearFeedback, setSuccess, setError, setFeedback };
};
