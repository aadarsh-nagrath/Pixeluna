import { ClerkProvider } from '@clerk/nextjs';
import React from 'react';

const layout = ({children}: {children : React.ReactNode}) => {
    return(
        <ClerkProvider>
            {children}
        </ClerkProvider>
    )
}

export default layout;