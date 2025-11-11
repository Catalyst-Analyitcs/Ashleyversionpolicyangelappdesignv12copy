# PolicyAngel Backend API Specifications

## Overview
This document defines the complete API structure for PolicyAngel's integration with Insuragrid and other backend services. All endpoints follow REST principles with JWT authentication.

**Base URL:** `https://api.policyangel.com/v1`  
**Insuragrid Base:** `https://api.insuragrid.com/v2`

---

## Authentication

### POST /auth/email-login
Start email-only login flow

**Request:**
```json
{
  "email": "user@example.com",
  "propertyAddress": "123 Main St, San Francisco, CA 94102" // optional
}
```

**Response:**
```json
{
  "userId": "usr_abc123",
  "token": "jwt_token_here",
  "isNewUser": true,
  "profile": {
    "email": "user@example.com",
    "createdAt": "2025-11-09T12:00:00Z"
  }
}
```

---

## Property Management

### GET /properties
Get user's properties

**Headers:** `Authorization: Bearer {token}`

**Response:**
```json
{
  "properties": [
    {
      "id": "prop_xyz789",
      "address": "2847 Pacific Ave, San Francisco, CA 94115",
      "type": "single_family",
      "yearBuilt": 1925,
      "squareFeet": 2400,
      "bedrooms": 3,
      "bathrooms": 2.5,
      "estimatedValue": 2850000,
      "purchaseDate": "2020-05-15",
      "purchasePrice": 2400000,
      "insuragridConnected": true,
      "lastUpdated": "2025-11-09T08:30:00Z"
    }
  ]
}
```

### POST /properties
Add new property

**Request:**
```json
{
  "address": "2847 Pacific Ave, San Francisco, CA 94115",
  "type": "single_family",
  "yearBuilt": 1925,
  "squareFeet": 2400,
  "bedrooms": 3,
  "bathrooms": 2.5
}
```

**Response:**
```json
{
  "propertyId": "prop_xyz789",
  "status": "created",
  "enrichmentStatus": "in_progress"
}
```

### GET /properties/:id/enrichment
Get property enrichment data from Insuragrid

**Response:**
```json
{
  "propertyId": "prop_xyz789",
  "enrichment": {
    "appraisal": {
      "currentValue": 2850000,
      "comparables": [...],
      "confidenceScore": 0.92
    },
    "risk": {
      "earthquake": "high",
      "flood": "low",
      "fire": "medium",
      "scores": {
        "earthquake": 8.5,
        "flood": 2.1,
        "fire": 5.7
      }
    },
    "compliance": {
      "permits": [...],
      "violations": [],
      "upcomingDeadlines": [...]
    },
    "insuragridScore": 87
  }
}
```

---

## Opportunity Discovery

### GET /opportunities/:propertyId
Get all opportunities for a property (THE MAGIC MOMENT)

**Response:**
```json
{
  "propertyId": "prop_xyz789",
  "totalValue": 23500,
  "calculatedAt": "2025-11-09T12:00:00Z",
  "opportunities": {
    "grants": {
      "value": 18500,
      "count": 3,
      "items": [
        {
          "id": "grant_1",
          "name": "Energy Efficiency Grant",
          "amount": 8500,
          "source": "California Energy Commission",
          "deadline": "2026-01-31",
          "eligibilityScore": 0.95,
          "requirements": [...],
          "applicationUrl": "https://..."
        }
      ]
    },
    "insurance": {
      "annualSavings": 1200,
      "currentProvider": "State Farm",
      "currentPremium": 2940,
      "bestOffer": {
        "provider": "Lemonade",
        "premium": 2268,
        "coverageImprovement": "+$50K dwelling, earthquake included"
      }
    },
    "mortgage": {
      "monthlySavings": 450,
      "annualValue": 5400,
      "currentRate": 6.5,
      "bestOffer": {
        "lender": "Better.com",
        "rate": 5.125,
        "payment": 2179
      }
    },
    "compliance": {
      "potentialFinesSaved": 2000,
      "deadlines": [...]
    }
  }
}
```

---

## Insurance APIs

### GET /insurance/quotes/:propertyId
Get insurance quotes from Insuragrid network

**Query Params:**
- `coverageAmount` (optional): Desired coverage amount
- `deductible` (optional): Desired deductible

**Response:**
```json
{
  "propertyId": "prop_xyz789",
  "currentPolicy": {
    "provider": "State Farm",
    "policyNumber": "SF-123456789",
    "premium": 2940,
    "coverageAmount": 450000,
    "deductible": 2500,
    "renewalDate": "2026-03-15",
    "features": [...]
  },
  "quotes": [
    {
      "id": "quote_1",
      "provider": "Lemonade",
      "monthlyPremium": 189,
      "annualPremium": 2268,
      "coverageAmount": 500000,
      "deductible": 2000,
      "features": [...],
      "rating": 4.7,
      "claimSpeed": "3-5 days",
      "perks": [...],
      "quoteExpiresAt": "2025-11-16T12:00:00Z"
    }
  ],
  "coverageGaps": [
    {
      "type": "earthquake",
      "severity": "high",
      "description": "Bay Area homes have 72% chance of major earthquake in next 30 years",
      "recommendedCoverage": 50000,
      "monthlyCost": 18
    }
  ]
}
```

### POST /insurance/apply
Apply for insurance policy

**Request:**
```json
{
  "quoteId": "quote_1",
  "propertyId": "prop_xyz789",
  "startDate": "2025-12-01",
  "additionalCoverage": [
    {
      "type": "earthquake",
      "amount": 50000
    }
  ]
}
```

**Response:**
```json
{
  "applicationId": "app_ins_123",
  "status": "pending_review",
  "estimatedApprovalTime": "2-3 business days",
  "nextSteps": [...]
}
```

### GET /insurance/coverage-analysis/:propertyId
Get AI-powered coverage analysis

**Response:**
```json
{
  "propertyId": "prop_xyz789",
  "analysis": {
    "adequacy": {
      "dwelling": "adequate",
      "personalProperty": "underinsured",
      "liability": "adequate",
      "lossOfUse": "adequate"
    },
    "recommendations": [
      {
        "type": "personalProperty",
        "issue": "Current coverage $225K, recommended $280K",
        "reasoning": "Based on property contents assessment",
        "monthlyCostIncrease": 15
      }
    ],
    "riskScore": 7.2,
    "overallRating": "B+"
  }
}
```

---

## Mortgage APIs

### GET /mortgage/offers/:propertyId
Get refinance offers from Insuragrid lending network

**Query Params:**
- `loanAmount` (optional): Desired loan amount
- `term` (optional): 15, 20, 30 years
- `cashOut` (optional): Cash-out amount

**Response:**
```json
{
  "propertyId": "prop_xyz789",
  "currentMortgage": {
    "lender": "Wells Fargo",
    "loanNumber": "WF-987654321",
    "rate": 6.5,
    "monthlyPayment": 2528,
    "remainingBalance": 400000,
    "remainingTermMonths": 324,
    "nextPaymentDate": "2025-12-01"
  },
  "offers": [
    {
      "id": "offer_1",
      "lender": "Better.com",
      "rate": 5.125,
      "apr": 5.23,
      "monthlyPayment": 2179,
      "loanTerm": 30,
      "closingCosts": 3200,
      "points": 0,
      "lockPeriod": 45,
      "features": [...],
      "rating": 4.8,
      "processingTime": "21 days",
      "offerExpiresAt": "2025-11-16T12:00:00Z"
    }
  ],
  "savings": {
    "monthly": 349,
    "annual": 4188,
    "lifetime": 113076,
    "breakEvenMonths": 9
  }
}
```

### POST /mortgage/prequalify
Get pre-qualified for refinance

**Request:**
```json
{
  "offerId": "offer_1",
  "propertyId": "prop_xyz789",
  "employmentInfo": {
    "employer": "Tech Corp",
    "annualIncome": 185000,
    "yearsEmployed": 5
  },
  "creditScore": 780,
  "debts": [
    {
      "type": "auto_loan",
      "monthlyPayment": 450,
      "remainingBalance": 18000
    }
  ]
}
```

**Response:**
```json
{
  "prequalificationId": "preq_123",
  "status": "approved",
  "approvedAmount": 450000,
  "approvedRate": 5.125,
  "nextSteps": [
    "Full application",
    "Appraisal",
    "Income verification"
  ],
  "expiresAt": "2025-12-09T12:00:00Z"
}
```

### GET /mortgage/scenarios/:propertyId
Get refinance scenario analysis

**Response:**
```json
{
  "propertyId": "prop_xyz789",
  "scenarios": [
    {
      "name": "Rate & Term Refinance",
      "description": "Lower your rate, keep same term",
      "newRate": 5.125,
      "newPayment": 2179,
      "monthlySavings": 349,
      "closingCosts": 3200,
      "breakEvenMonths": 9,
      "lifetimeSavings": 113076
    },
    {
      "name": "15-Year Accelerated",
      "description": "Pay off faster, build equity quicker",
      "newRate": 4.625,
      "newPayment": 3063,
      "monthlySavings": -535,
      "closingCosts": 3200,
      "breakEvenMonths": 0,
      "lifetimeSavings": 187440
    },
    {
      "name": "Cash-Out Refinance",
      "description": "Access $50K equity for home improvements",
      "newRate": 5.5,
      "newPayment": 2556,
      "monthlySavings": -28,
      "closingCosts": 3500,
      "breakEvenMonths": 0,
      "lifetimeSavings": 85000,
      "cashOut": 50000
    }
  ]
}
```

---

## Grant APIs

### GET /grants/:propertyId
Get available grants for property

**Query Params:**
- `category` (optional): energy, seismic, water, etc.
- `minAmount` (optional): Minimum grant amount

**Response:**
```json
{
  "propertyId": "prop_xyz789",
  "grants": [
    {
      "id": "grant_1",
      "name": "Energy Efficiency Grant",
      "amount": 8500,
      "source": "California Energy Commission",
      "category": "energy",
      "deadline": "2026-01-31",
      "eligibilityScore": 0.95,
      "requirements": [
        "Property built before 2010",
        "Energy audit completed",
        "Licensed contractor"
      ],
      "applicationUrl": "https://...",
      "estimatedProcessingTime": "30-45 days",
      "description": "Rebate for energy-efficient upgrades including insulation, HVAC, windows"
    }
  ],
  "totalAvailable": 18500,
  "appliedGrants": []
}
```

### POST /grants/apply
Submit grant application

**Request:**
```json
{
  "grantId": "grant_1",
  "propertyId": "prop_xyz789",
  "application": {
    "projectDescription": "Install new dual-pane windows and attic insulation",
    "estimatedCost": 12000,
    "contractor": {
      "name": "GreenHome Contractors",
      "license": "CA-123456"
    },
    "timeline": {
      "startDate": "2026-02-01",
      "completionDate": "2026-02-28"
    }
  },
  "documents": [
    {
      "type": "energy_audit",
      "url": "https://storage.policyangel.com/..."
    }
  ]
}
```

**Response:**
```json
{
  "applicationId": "app_grant_123",
  "status": "submitted",
  "trackingNumber": "CA-EE-2025-12345",
  "estimatedDecisionDate": "2025-12-15",
  "nextSteps": [
    "Wait for initial review (5-7 days)",
    "Complete inspection (if required)",
    "Receive approval"
  ]
}
```

### GET /grants/applications/:applicationId
Track grant application status

**Response:**
```json
{
  "applicationId": "app_grant_123",
  "grantId": "grant_1",
  "status": "approved",
  "statusHistory": [
    {
      "status": "submitted",
      "timestamp": "2025-11-09T12:00:00Z"
    },
    {
      "status": "under_review",
      "timestamp": "2025-11-10T09:00:00Z"
    },
    {
      "status": "approved",
      "timestamp": "2025-11-15T14:30:00Z",
      "notes": "Application approved for $8,500"
    }
  ],
  "approvedAmount": 8500,
  "disbursementDate": "2026-03-15",
  "conditions": [
    "Submit final inspection report",
    "Provide receipts for all materials"
  ]
}
```

---

## Compliance APIs

### GET /compliance/:propertyId
Get compliance status and deadlines

**Response:**
```json
{
  "propertyId": "prop_xyz789",
  "status": "action_required",
  "score": 75,
  "deadlines": [
    {
      "id": "deadline_1",
      "type": "permit_renewal",
      "description": "Rental housing inspection renewal",
      "dueDate": "2025-12-15",
      "priority": "high",
      "estimatedFine": 1000,
      "steps": [
        "Schedule inspection",
        "Complete repairs",
        "Submit renewal application"
      ]
    }
  ],
  "permits": [...],
  "violations": []
}
```

---

## Document APIs

### POST /documents/upload
Upload document

**Request:** `multipart/form-data`
- `file`: Document file
- `type`: Document type (insurance, mortgage, grant, etc.)
- `propertyId`: Associated property

**Response:**
```json
{
  "documentId": "doc_abc123",
  "url": "https://storage.policyangel.com/...",
  "type": "energy_audit",
  "uploadedAt": "2025-11-09T12:00:00Z",
  "metadata": {
    "filename": "energy_audit.pdf",
    "size": 2458000,
    "mimeType": "application/pdf"
  }
}
```

### GET /documents/:propertyId
Get documents for property

**Response:**
```json
{
  "propertyId": "prop_xyz789",
  "documents": [
    {
      "id": "doc_abc123",
      "type": "insurance_policy",
      "name": "Homeowners Insurance Policy",
      "url": "https://...",
      "uploadedAt": "2025-01-15T10:00:00Z",
      "expiresAt": "2026-03-15T00:00:00Z"
    }
  ]
}
```

---

## Insuragrid Integration APIs

### POST /insuragrid/connect
Connect property to Insuragrid

**Request:**
```json
{
  "propertyId": "prop_xyz789",
  "permissions": [
    "insurance_data",
    "mortgage_data",
    "compliance_data"
  ]
}
```

**Response:**
```json
{
  "connectionId": "conn_123",
  "status": "connected",
  "dataSync": {
    "insurance": "synced",
    "mortgage": "synced",
    "compliance": "synced"
  },
  "lastSyncAt": "2025-11-09T12:00:00Z"
}
```

### GET /insuragrid/sync/:propertyId
Trigger data sync from Insuragrid

**Response:**
```json
{
  "propertyId": "prop_xyz789",
  "syncId": "sync_789",
  "status": "in_progress",
  "estimatedCompletionTime": "30 seconds"
}
```

---

## Webhooks

PolicyAngel sends webhooks for important events:

### Webhook Events

**grant.approved**
```json
{
  "event": "grant.approved",
  "timestamp": "2025-11-15T14:30:00Z",
  "data": {
    "applicationId": "app_grant_123",
    "grantId": "grant_1",
    "amount": 8500,
    "userId": "usr_abc123",
    "propertyId": "prop_xyz789"
  }
}
```

**insurance.quote_available**
```json
{
  "event": "insurance.quote_available",
  "timestamp": "2025-11-09T12:00:00Z",
  "data": {
    "quoteId": "quote_1",
    "propertyId": "prop_xyz789",
    "savings": 672
  }
}
```

**mortgage.rate_drop**
```json
{
  "event": "mortgage.rate_drop",
  "timestamp": "2025-11-10T08:00:00Z",
  "data": {
    "propertyId": "prop_xyz789",
    "previousBestRate": 5.25,
    "newBestRate": 5.125,
    "potentialSavings": 29
  }
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "error": {
    "code": "PROPERTY_NOT_FOUND",
    "message": "Property with ID prop_xyz789 not found",
    "statusCode": 404,
    "requestId": "req_abc123",
    "timestamp": "2025-11-09T12:00:00Z"
  }
}
```

### Common Error Codes

- `AUTH_REQUIRED` (401): Authentication required
- `INVALID_TOKEN` (401): Invalid or expired token
- `FORBIDDEN` (403): Insufficient permissions
- `NOT_FOUND` (404): Resource not found
- `VALIDATION_ERROR` (422): Request validation failed
- `RATE_LIMIT` (429): Too many requests
- `SERVER_ERROR` (500): Internal server error
- `INSURAGRID_ERROR` (502): Insuragrid integration error

---

## Rate Limits

- **Free Tier:** 100 requests/hour
- **Premium Tier:** 1,000 requests/hour
- **Enterprise:** Unlimited

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1699545600
```

---

## WebSocket API

Real-time updates via WebSocket:

**Connect:** `wss://api.policyangel.com/v1/ws?token={jwt}`

**Subscribe to property updates:**
```json
{
  "action": "subscribe",
  "channel": "property:prop_xyz789"
}
```

**Receive updates:**
```json
{
  "channel": "property:prop_xyz789",
  "event": "opportunity.new",
  "data": {
    "type": "insurance",
    "savings": 1200
  }
}
```

---

## Testing

**Sandbox Base URL:** `https://sandbox.policyangel.com/v1`

Test credentials:
- Email: `test@policyangel.com`
- Test Property ID: `prop_test123`

All sandbox API calls return mock data and don't affect production.
