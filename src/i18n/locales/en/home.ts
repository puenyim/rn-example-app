/**
 * Strings owned by the Home (customer list) feature.
 */
export const home = {
  title: 'Customers',
  searchPlaceholder: 'Search...',
  emptyTitle: 'No customers found',
  emptySubtitle: 'Try a different keyword or pull to refresh.',
  errorTitle: 'Something went wrong',
  loadMore: 'Loading more…',
  endOfList: 'You have reached the end',
  totalLabel: '{{count}} of {{total}}',
  category: {
    label: 'Filter',
    all: 'All',
    male: 'Male',
    female: 'Female',
  },
  age: 'Age',
  gender: 'Gender',
} as const;

export type HomeNS = typeof home;
