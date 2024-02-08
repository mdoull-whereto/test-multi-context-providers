import React from 'react'
import { NotesContextProvider } from './Notes'
import { MultiCountContextProvider } from './MultiCounter'
import MultiProviderComposer from './MultiProviderComposer'

export default function MultiProvider ({ children }) {
  return (
    <MultiProviderComposer
      contextProviders={[
        <NotesContextProvider key="notes_context_provider" />,
        <MultiCountContextProvider key="multi_count_provider" />
      ]}
    >
      {children}
    </MultiProviderComposer>
  )
}
