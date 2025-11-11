# Insuragrid Integration Guide for PolicyAngel

## Overview

This guide explains how to integrate PolicyAngel with Insuragrid APIs to power the opportunity discovery, insurance optimization, mortgage refinancing, and grant application features.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     PolicyAngel Frontend                     │
│  (React Web / React Native)                                  │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Insurance    │  │  Mortgage    │  │   Grants     │     │
│  │ Optimizer    │  │  Optimizer   │  │   Screen     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│         │                  │                  │             │
│         └──────────────────┴──────────────────┘             │
│                           │                                 │
│                  ┌────────▼────────┐                        │
│                  │ insuragridApi.ts │                       │
│                  │  (Integration    │                       │
│                  │     Layer)       │                       │
│                  └────────┬────────┘                        │
└───────────────────────────┼─────────────────────────────────┘
                            │
                  ┌─────────▼─────────┐
                  │  PolicyAngel API  │
                  │   (Backend)       │
                  └─────────┬─────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼────────┐  ┌──────▼──────┐  ┌────────▼────────┐
│  Insuragrid    │  │   Partner   │  │  External APIs  │
│      API       │  │   APIs      │  │  (Gov Grants)   │
└────────────────┘  └─────────────┘  └─────────────────┘
```

---

## Quick Start

### 1. Install Dependencies

```bash
npm install @tanstack/react-query axios
```

For React Native:
```bash
npm install @tanstack/react-query axios react-native-mmkv
```

### 2. Configure API Keys

Create a `.env` file:

```env
# PolicyAngel API
POLICYANGEL_API_URL=https://api.policyangel.com/v1
POLICYANGEL_API_KEY=your_api_key_here

# Insuragrid API
INSURAGRID_API_URL=https://api.insuragrid.com/v2
INSURAGRID_API_KEY=your_insuragrid_key_here

# Sandbox (for development)
INSURAGRID_SANDBOX_URL=https://sandbox.insuragrid.com/v2
INSURAGRID_SANDBOX_KEY=sandbox_key_here
```

### 3. Initialize API Client

```typescript
import { insuragridApi } from './utils/insuragridApi';

// Configure with your API keys
insuragridApi.setAuthToken(userAuthToken);
```

### 4. Set Up TanStack Query (Recommended)

```typescript
// App.tsx or _app.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app */}
    </QueryClientProvider>
  );
}
```

---

## Integration Examples

### Example 1: Opportunity Discovery (OpportunityRevealScreen)

```typescript
import { useQuery } from '@tanstack/react-query';
import { insuragridApi } from '../utils/insuragridApi';

export default function OpportunityRevealScreen({ propertyId }: Props) {
  // Fetch opportunities from Insuragrid
  const { data, isLoading, error } = useQuery({
    queryKey: ['opportunities', propertyId],
    queryFn: async () => {
      const response = await insuragridApi.getOpportunities(propertyId);
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to fetch opportunities');
      }
      return response.data;
    },
    // Refetch every 5 minutes for fresh data
    refetchInterval: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  const { totalValue, opportunities } = data;

  return (
    <div>
      <h1>You have ${totalValue.toLocaleString()} in opportunities!</h1>
      
      {/* Grants */}
      <section>
        <h2>Available Grants: ${opportunities.grants.value.toLocaleString()}</h2>
        {opportunities.grants.items.map(grant => (
          <GrantCard key={grant.id} grant={grant} />
        ))}
      </section>

      {/* Insurance Savings */}
      <section>
        <h2>Insurance Savings: ${opportunities.insurance.annualSavings.toLocaleString()}/year</h2>
        <InsuranceCard opportunity={opportunities.insurance} />
      </section>

      {/* Mortgage Savings */}
      <section>
        <h2>Mortgage Savings: ${opportunities.mortgage.monthlySavings.toLocaleString()}/month</h2>
        <MortgageCard opportunity={opportunities.mortgage} />
      </section>
    </div>
  );
}
```

### Example 2: Insurance Optimizer

```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { insuragridApi } from '../utils/insuragridApi';

export default function InsuranceOptimizerScreen({ propertyId }: Props) {
  // Fetch insurance quotes
  const { data, isLoading } = useQuery({
    queryKey: ['insurance-quotes', propertyId],
    queryFn: async () => {
      const response = await insuragridApi.getInsuranceQuotes(propertyId);
      if (!response.success) throw new Error(response.error?.message);
      return response.data;
    },
    staleTime: 1 * 60 * 1000, // 1 minute - rates change frequently
  });

  // Apply for policy
  const applyMutation = useMutation({
    mutationFn: async (quoteId: string) => {
      const response = await fetch(`${API_URL}/insurance/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          quoteId,
          propertyId,
          startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        }),
      });
      return response.json();
    },
    onSuccess: (data) => {
      console.log('Application submitted:', data.applicationId);
      navigation.navigate('ApplicationTracking', { id: data.applicationId });
    },
  });

  if (isLoading) return <LoadingState />;

  const { currentPolicy, quotes, coverageGaps } = data;

  return (
    <div>
      {/* Current Policy */}
      <PolicyCard policy={currentPolicy} />

      {/* Available Quotes */}
      {quotes.map(quote => (
        <QuoteCard
          key={quote.id}
          quote={quote}
          onApply={() => applyMutation.mutate(quote.id)}
        />
      ))}

      {/* Coverage Gaps */}
      <CoverageGapsSection gaps={coverageGaps} />
    </div>
  );
}
```

### Example 3: Mortgage Optimizer

```typescript
import { useQuery } from '@tanstack/react-query';
import { insuragridApi } from '../utils/insuragridApi';

export default function MortgageOptimizerScreen({ propertyId }: Props) {
  const [loanAmount, setLoanAmount] = useState(400000);

  // Fetch mortgage offers
  const { data, isLoading } = useQuery({
    queryKey: ['mortgage-offers', propertyId, loanAmount],
    queryFn: async () => {
      const response = await insuragridApi.getMortgageOffers(propertyId, {
        loanAmount,
      });
      if (!response.success) throw new Error(response.error?.message);
      return response.data;
    },
    staleTime: 30 * 1000, // 30 seconds - rates are very time-sensitive
    // Only refetch when loan amount changes
    enabled: loanAmount > 0,
  });

  // Prequalify mutation
  const prequalifyMutation = useMutation({
    mutationFn: async (offerId: string) => {
      const response = await fetch(`${API_URL}/mortgage/prequalify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          offerId,
          propertyId,
          employmentInfo: userData.employment,
          creditScore: userData.creditScore,
        }),
      });
      return response.json();
    },
  });

  if (isLoading) return <LoadingState />;

  const { currentMortgage, offers, savings } = data;

  return (
    <div>
      {/* Current Mortgage */}
      <MortgageCard mortgage={currentMortgage} />

      {/* Savings Summary */}
      <SavingsSummary
        monthly={savings.monthly}
        annual={savings.annual}
        lifetime={savings.lifetime}
      />

      {/* Calculator */}
      <Calculator
        loanAmount={loanAmount}
        onLoanAmountChange={setLoanAmount}
      />

      {/* Available Offers */}
      {offers.map(offer => (
        <OfferCard
          key={offer.id}
          offer={offer}
          currentPayment={currentMortgage.monthlyPayment}
          onPrequalify={() => prequalifyMutation.mutate(offer.id)}
        />
      ))}
    </div>
  );
}
```

### Example 4: Grant Applications

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { insuragridApi } from '../utils/insuragridApi';

export default function GrantApplicationScreen({ grantId, propertyId }: Props) {
  const queryClient = useQueryClient();

  // Fetch grant details
  const { data: grant } = useQuery({
    queryKey: ['grant', grantId],
    queryFn: async () => {
      const response = await insuragridApi.getGrants(propertyId);
      if (!response.success) throw new Error(response.error?.message);
      return response.data.grants.find(g => g.id === grantId);
    },
  });

  // Fetch pre-fill data from Insuragrid
  const { data: prefillData } = useQuery({
    queryKey: ['grant-prefill', grantId, propertyId],
    queryFn: async () => {
      const response = await insuragridApi.getPropertyEnrichment(propertyId);
      if (!response.success) throw new Error(response.error?.message);
      return response.data;
    },
  });

  // Submit application
  const submitMutation = useMutation({
    mutationFn: async (application: GrantApplication) => {
      const response = await fetch(`${API_URL}/grants/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          grantId,
          propertyId,
          application,
        }),
      });
      return response.json();
    },
    onSuccess: (data) => {
      // Invalidate grants query to refetch
      queryClient.invalidateQueries(['grants', propertyId]);
      
      // Navigate to tracking
      navigation.navigate('GrantTracking', { 
        applicationId: data.applicationId 
      });
    },
  });

  return (
    <GrantForm
      grant={grant}
      prefillData={prefillData}
      onSubmit={(application) => submitMutation.mutate(application)}
      isSubmitting={submitMutation.isLoading}
    />
  );
}
```

---

## Real-time Updates with WebSocket

For live rate updates and notifications:

```typescript
import { useEffect } from 'react';

export function useRealtimeRates(propertyId: string) {
  useEffect(() => {
    const ws = new WebSocket(
      `wss://api.policyangel.com/v1/ws?token=${authToken}`
    );

    ws.onopen = () => {
      // Subscribe to property updates
      ws.send(JSON.stringify({
        action: 'subscribe',
        channel: `property:${propertyId}`,
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.event === 'rate.updated') {
        // Invalidate queries to refetch
        queryClient.invalidateQueries(['mortgage-offers', propertyId]);
        queryClient.invalidateQueries(['insurance-quotes', propertyId]);
      }
    };

    return () => ws.close();
  }, [propertyId]);
}
```

---

## Error Handling

### Global Error Handler

```typescript
import { QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error: any) => {
        // Log to analytics
        analytics.trackError(error);

        // Show user-friendly message
        if (error.statusCode === 401) {
          toast.error('Please log in again');
          // Redirect to login
        } else if (error.statusCode === 429) {
          toast.error('Too many requests. Please wait a moment.');
        } else if (error.code === 'INSURAGRID_ERROR') {
          toast.error('Unable to fetch data. Please try again.');
        } else {
          toast.error('Something went wrong. Please try again.');
        }
      },
    },
  },
});
```

### Component-Level Error Handling

```typescript
const { data, error, isError, refetch } = useQuery({
  queryKey: ['opportunities', propertyId],
  queryFn: () => insuragridApi.getOpportunities(propertyId),
  retry: 3, // Retry 3 times before showing error
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
});

if (isError) {
  return (
    <ErrorState
      message={error.message}
      onRetry={refetch}
      canRetry={!error.code?.includes('PERMANENT')}
    />
  );
}
```

---

## Caching Strategy

### Cache Keys Organization

```typescript
// Hierarchical cache keys for easy invalidation
const cacheKeys = {
  property: (id: string) => ['property', id] as const,
  
  opportunities: (id: string) => 
    [...cacheKeys.property(id), 'opportunities'] as const,
  
  insurance: (id: string) => 
    [...cacheKeys.property(id), 'insurance'] as const,
  
  insuranceQuotes: (id: string, options?: any) => 
    [...cacheKeys.insurance(id), 'quotes', options] as const,
  
  mortgage: (id: string) => 
    [...cacheKeys.property(id), 'mortgage'] as const,
  
  mortgageOffers: (id: string, options?: any) => 
    [...cacheKeys.mortgage(id), 'offers', options] as const,
  
  grants: (id: string) => 
    [...cacheKeys.property(id), 'grants'] as const,
};

// Usage
const { data } = useQuery({
  queryKey: cacheKeys.insuranceQuotes(propertyId, { deductible: 2000 }),
  queryFn: () => insuragridApi.getInsuranceQuotes(propertyId, { deductible: 2000 }),
});

// Invalidate all insurance queries for a property
queryClient.invalidateQueries(cacheKeys.insurance(propertyId));
```

### Cache Persistence (React Native)

```typescript
import { MMKV } from 'react-native-mmkv';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

const storage = new MMKV();

const asyncStoragePersister = createAsyncStoragePersister({
  storage: {
    getItem: (key) => storage.getString(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
    removeItem: (key) => storage.delete(key),
  },
});

function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
      {/* Your app */}
    </PersistQueryClientProvider>
  );
}
```

---

## Performance Optimization

### 1. Prefetching

```typescript
// Prefetch insurance quotes when user views opportunities
const prefetchInsuranceQuotes = async (propertyId: string) => {
  await queryClient.prefetchQuery({
    queryKey: cacheKeys.insuranceQuotes(propertyId),
    queryFn: () => insuragridApi.getInsuranceQuotes(propertyId),
  });
};

// Usage in OpportunityRevealScreen
useEffect(() => {
  prefetchInsuranceQuotes(propertyId);
}, [propertyId]);
```

### 2. Optimistic Updates

```typescript
const applyForGrantMutation = useMutation({
  mutationFn: (application: GrantApplication) => 
    submitGrantApplication(application),
  
  // Optimistically update the UI before the request completes
  onMutate: async (application) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries(cacheKeys.grants(propertyId));

    // Snapshot previous value
    const previousGrants = queryClient.getQueryData(cacheKeys.grants(propertyId));

    // Optimistically update
    queryClient.setQueryData(cacheKeys.grants(propertyId), (old: any) => ({
      ...old,
      appliedGrants: [...old.appliedGrants, application],
    }));

    return { previousGrants };
  },
  
  // Rollback on error
  onError: (err, variables, context) => {
    queryClient.setQueryData(
      cacheKeys.grants(propertyId),
      context?.previousGrants
    );
  },
  
  // Refetch after success
  onSettled: () => {
    queryClient.invalidateQueries(cacheKeys.grants(propertyId));
  },
});
```

### 3. Parallel Queries

```typescript
import { useQueries } from '@tanstack/react-query';

// Fetch multiple data sources in parallel
const results = useQueries({
  queries: [
    {
      queryKey: cacheKeys.opportunities(propertyId),
      queryFn: () => insuragridApi.getOpportunities(propertyId),
    },
    {
      queryKey: cacheKeys.insuranceQuotes(propertyId),
      queryFn: () => insuragridApi.getInsuranceQuotes(propertyId),
    },
    {
      queryKey: cacheKeys.mortgageOffers(propertyId),
      queryFn: () => insuragridApi.getMortgageOffers(propertyId),
    },
  ],
});

const [opportunities, insurance, mortgage] = results;
```

---

## Testing

### Mock Data for Development

The `insuragridApi.ts` module currently uses mock data. To switch to real API:

```typescript
// In insuragridApi.ts

async getOpportunities(propertyId: string) {
  // PRODUCTION: Use real API
  return this.request<OpportunityData>(
    `/properties/${propertyId}/opportunities`
  );
  
  // DEVELOPMENT: Use mock data (current implementation)
  // return { success: true, data: mockData };
}
```

### Unit Tests

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useOpportunities } from './hooks';

describe('useOpportunities', () => {
  it('fetches opportunities successfully', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );

    const { result } = renderHook(
      () => useOpportunities('prop_test123'),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    
    expect(result.current.data).toBeDefined();
    expect(result.current.data.totalValue).toBeGreaterThan(0);
  });
});
```

---

## Security Best Practices

1. **Never expose API keys in frontend code**
   - Store keys in backend only
   - Use backend as proxy for Insuragrid API calls

2. **Implement rate limiting**
   - Prevent abuse of expensive API calls
   - Use exponential backoff for retries

3. **Validate all user input**
   - Sanitize property IDs and parameters
   - Validate amounts and dates

4. **Use HTTPS only**
   - Encrypt all data in transit
   - Implement certificate pinning in mobile apps

5. **Implement proper authentication**
   - Use JWT tokens with short expiry
   - Refresh tokens securely
   - Implement proper logout

---

## Monitoring & Analytics

### Track API Performance

```typescript
const { data, dataUpdatedAt } = useQuery({
  queryKey: ['opportunities', propertyId],
  queryFn: async () => {
    const startTime = Date.now();
    const response = await insuragridApi.getOpportunities(propertyId);
    const duration = Date.now() - startTime;
    
    // Track API performance
    analytics.track('api_call', {
      endpoint: 'getOpportunities',
      duration,
      success: response.success,
      propertyId,
    });
    
    return response.data;
  },
});
```

### Track User Actions

```typescript
const applyMutation = useMutation({
  mutationFn: (application) => submitApplication(application),
  onSuccess: (data) => {
    // Track conversion
    analytics.track('grant_application_submitted', {
      grantId: data.grantId,
      amount: data.amount,
      propertyId,
    });
  },
});
```

---

## Troubleshooting

### Common Issues

**Issue: "API key invalid"**
- Solution: Verify API keys in `.env` file
- Check if using sandbox vs production keys correctly

**Issue: "Rate limit exceeded"**
- Solution: Implement caching and reduce API calls
- Use `staleTime` in queries to prevent unnecessary refetches

**Issue: "Property not found"**
- Solution: Ensure property is properly connected to Insuragrid
- Call `/insuragrid/connect` endpoint first

**Issue: "Data not updating"**
- Solution: Check `staleTime` settings
- Manually invalidate queries when needed
- Verify WebSocket connection for real-time updates

---

## Next Steps

1. **Set up production API keys** from Insuragrid
2. **Replace mock data** in `insuragridApi.ts` with real API calls
3. **Implement authentication** flow with JWT tokens
4. **Add error tracking** with Sentry or similar
5. **Set up monitoring** for API performance
6. **Implement push notifications** for rate alerts
7. **Add offline support** with query persistence
8. **Test thoroughly** with real user scenarios

---

## Support

For technical support:
- **PolicyAngel:** support@policyangel.com
- **Insuragrid:** developers@insuragrid.com
- **Documentation:** https://docs.insuragrid.com

For integration issues, contact: integrations@policyangel.com
