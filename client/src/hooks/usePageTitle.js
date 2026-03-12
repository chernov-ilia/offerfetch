// Hook to update page title.

import { useEffect } from 'react';

export default function usePageTitle(title) {
    useEffect(() => {
        document.title = title ? `${title} — OfferFetch` : 'OfferFetch';
    }, [title]);
}