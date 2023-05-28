import { useEffect, useState } from "react";

const FIRST_LOAD_KEY = "__first_load__";

export interface FirstLoadHookInterface {
  isFirstLoad: boolean;
}

export function useFirstLoad(): FirstLoadHookInterface {
  const [isFirstLoad, setFirstLoad] = useState(false);
  useEffect(() => {
    setFirstLoad(localStorage.getItem(FIRST_LOAD_KEY) === null);
  }, []);

  return { isFirstLoad };
}
