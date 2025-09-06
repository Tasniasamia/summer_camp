"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Hydrate } from "@tanstack/react-query"
import { ReactNode, useState } from "react"

export default function ReactQueryProvider({ children, dehydratedState }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>{children}</Hydrate>
    </QueryClientProvider>
  )
}


"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { persistQueryClient } from '@tanstack/query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-persist-client-sync-storage';

export default function ReactQueryProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  // persister setup
  const localStoragePersister = createSyncStoragePersister({
    storage: window.localStorage,
  });

  // persist query cache
  persistQueryClient({
    queryClient,
    persister: localStoragePersister,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}











// "use client"

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// import { Hydrate } from "@tanstack/react-query"
// import { ReactNode, useState } from "react"

// export default function ReactQueryProvider({ children, dehydratedState }) {
//   const [queryClient] = useState(() => new QueryClient())

//   return (
//     <QueryClientProvider client={queryClient}>
//       <Hydrate state={dehydratedState}>{children}</Hydrate>
//     </QueryClientProvider>
//   )
// }
