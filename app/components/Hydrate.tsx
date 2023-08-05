'use client';

import { ReactNode, useEffect, useState } from 'react';

export default function Hydrate({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <>
      {isHydrated ? (
        <>{children}</>
      ) : (
        <div className="flex justify-center text-3xl font-bold">
          <h1 className="">Loading ...</h1>
        </div>
      )}
    </>
  );
}
