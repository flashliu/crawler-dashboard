import { useEffect, useRef } from "react";

// 自定义一个初始不更新的hook
const useUpdateEffect = (fn: Function, inputs: any[] = []) => {
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) fn();
    else didMountRef.current = true;
  }, inputs);
};

export default useUpdateEffect;
