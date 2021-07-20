import React, { useState } from "react";

const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const resetLoading = () => setIsLoading(false);

  const setLoading = React.useCallback(
    (value) => {
      if (value instanceof Boolean) {
        resetLoading();

        return;
      }

      if (value) {
        setIsLoading(true);

        return;
      }

      setIsLoading(false);
    },
    [resetLoading]
  );

  return {
    isLoading,
    setLoading,
  };
};

export default useLoading;
