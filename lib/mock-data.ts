// Mock telecom data for TEMS AI Assistant

export interface VendorData {
  vendor: string
  totalCost: number
  circuits: number
  invoices: number
}

export interface MonthlyTrend {
  month: string
  cost: number
  [key: string]: string | number
}

export interface CircuitData {
  circuitId: string
  vendor: string
  type: string
  monthlyCost: number
  location: string
  status: 'active' | 'inactive'
}

export interface ClarificationOption {
  label: string
  query: string
}

export interface TableColumn {
  key: string
  label: string
  align?: 'left' | 'right'
  format?: (value: unknown) => string
}

export interface QueryResult {
  title: string
  value: string
  source: string
  calculation: string
  sql?: string
  chartData?: MonthlyTrend[]
  chartTitle?: string
  tableData?: Record<string, unknown>[]
  tableColumns?: TableColumn[]
}

export interface AIResponse {
  message: string
  result?: QueryResult
  clarification?: {
    question: string
    options: ClarificationOption[]
  }
  suggestedFollowUps?: string[]
}

export const vendorData: VendorData[] = [
  { vendor: 'Rogers', totalCost: 1850000, circuits: 245, invoices: 89 },
  { vendor: 'Bell', totalCost: 1391000, circuits: 198, invoices: 76 },
  { vendor: 'Telus', totalCost: 890000, circuits: 156, invoices: 58 },
  { vendor: 'Shaw', totalCost: 456000, circuits: 87, invoices: 34 },
  { vendor: 'Cogeco', totalCost: 234000, circuits: 45, invoices: 18 },
  { vendor: 'Videotron', totalCost: 178000, circuits: 32, invoices: 12 },
  { vendor: 'Eastlink', totalCost: 145000, circuits: 28, invoices: 11 },
  { vendor: 'SaskTel', totalCost: 98000, circuits: 19, invoices: 8 },
  { vendor: 'MTS', totalCost: 76000, circuits: 15, invoices: 6 },
  { vendor: 'TBayTel', totalCost: 45000, circuits: 9, invoices: 4 },
]

export const monthlyFiberCost: MonthlyTrend[] = [
  { month: 'Jan', cost: 245000 },
  { month: 'Feb', cost: 252000 },
  { month: 'Mar', cost: 248000 },
  { month: 'Apr', cost: 265000 },
  { month: 'May', cost: 278000 },
  { month: 'Jun', cost: 285000 },
  { month: 'Jul', cost: 292000 },
  { month: 'Aug', cost: 288000 },
  { month: 'Sep', cost: 301000 },
  { month: 'Oct', cost: 315000 },
  { month: 'Nov', cost: 328000 },
  { month: 'Dec', cost: 341000 },
]

export const rogersVsBellMonthly: { month: string; rogers: number; bell: number }[] = [
  { month: 'Jan', rogers: 148000, bell: 112000 },
  { month: 'Feb', rogers: 152000, bell: 115000 },
  { month: 'Mar', rogers: 155000, bell: 118000 },
  { month: 'Apr', rogers: 158000, bell: 120000 },
  { month: 'May', rogers: 162000, bell: 122000 },
  { month: 'Jun', rogers: 165000, bell: 125000 },
  { month: 'Jul', rogers: 168000, bell: 128000 },
  { month: 'Aug', rogers: 172000, bell: 130000 },
  { month: 'Sep', rogers: 175000, bell: 132000 },
  { month: 'Oct', rogers: 178000, bell: 135000 },
  { month: 'Nov', rogers: 182000, bell: 138000 },
  { month: 'Dec', rogers: 185000, bell: 140000 },
]

export const circuitInventory: CircuitData[] = [
  { circuitId: 'CKT-001', vendor: 'Bell', type: 'Fiber', monthlyCost: 2500, location: 'Toronto HQ', status: 'active' },
  { circuitId: 'CKT-002', vendor: 'Rogers', type: 'MPLS', monthlyCost: 3200, location: 'Vancouver DC', status: 'active' },
  { circuitId: 'CKT-003', vendor: 'Telus', type: 'Internet', monthlyCost: 1800, location: 'Calgary Office', status: 'active' },
  { circuitId: 'CKT-004', vendor: 'Bell', type: 'DIA', monthlyCost: 4500, location: 'Montreal Branch', status: 'active' },
  { circuitId: 'CKT-005', vendor: 'Shaw', type: 'Fiber', monthlyCost: 2100, location: 'Edmonton Site', status: 'inactive' },
]

export const suggestedQueries = [
  'Top 10 vendors cost',
  'Monthly fiber cost',
  'Rogers vs Bell spending',
  'Bell circuit inventory',
  'Total telecom spend YTD',
  'Inactive circuits count',
]

// Format currency for table display
const formatCurrency = (value: unknown) => `$${Number(value).toLocaleString()}`

// Simulate AI response based on query
export function getAIResponse(query: string): AIResponse {
  const lowerQuery = query.toLowerCase()

  // --- Clarification triggers (ambiguous queries) ---

  // Vague "cost" query triggers clarification
  if (
    (lowerQuery === 'cost' || lowerQuery === 'costs' || lowerQuery === 'show me costs' || lowerQuery === '费用') &&
    !lowerQuery.includes('vendor') && !lowerQuery.includes('fiber') && !lowerQuery.includes('total')
  ) {
    return {
      message: 'I\'d like to help you with cost data. Could you specify what you\'re looking for?',
      clarification: {
        question: 'What type of cost data would you like to see?',
        options: [
          { label: 'Top 10 Vendors by Cost', query: 'Top 10 vendors cost' },
          { label: 'Monthly Fiber Cost Trend', query: 'Monthly fiber cost' },
          { label: 'Total Telecom Spend YTD', query: 'Total telecom spend YTD' },
        ],
      },
    }
  }

  // Vague "circuit" query
  if (
    (lowerQuery === 'circuit' || lowerQuery === 'circuits' || lowerQuery === 'show circuits') &&
    !lowerQuery.includes('bell') && !lowerQuery.includes('inactive') && !lowerQuery.includes('inventory')
  ) {
    return {
      message: 'I can help you look up circuit information. What specifically would you like to know?',
      clarification: {
        question: 'What circuit information are you interested in?',
        options: [
          { label: 'Bell Circuit Inventory', query: 'Bell circuit inventory' },
          { label: 'Inactive Circuits', query: 'Inactive circuits count' },
          { label: 'All Circuit Inventory', query: 'Total telecom spend YTD' },
        ],
      },
    }
  }

  // Vague vendor query
  if (
    (lowerQuery === 'vendor' || lowerQuery === 'vendors' || lowerQuery === 'show vendors') &&
    !lowerQuery.includes('top') && !lowerQuery.includes('cost')
  ) {
    return {
      message: 'Sure! What vendor information would you like to see?',
      clarification: {
        question: 'What vendor data are you looking for?',
        options: [
          { label: 'Top 10 Vendors by Cost', query: 'Top 10 vendors cost' },
          { label: 'Rogers vs Bell Comparison', query: 'Rogers vs Bell spending' },
        ],
      },
    }
  }

  // --- Normal queries with results ---

  // Rogers Bell cost query
  if (lowerQuery.includes('rogers') && lowerQuery.includes('bell') && lowerQuery.includes('cost')) {
    const rogersTotal = vendorData.find(v => v.vendor === 'Rogers')?.totalCost || 0
    const bellTotal = vendorData.find(v => v.vendor === 'Bell')?.totalCost || 0
    return {
      message: 'I found the combined cost data for Rogers and Bell from your TEMS system.',
      result: {
        title: 'Rogers + Bell Total Cost',
        value: `$${(rogersTotal + bellTotal).toLocaleString()} CAD`,
        source: 'TEMS Cost Rate Inventory',
        calculation: 'SUM(invoice_item.amount) WHERE vendor IN ("Rogers", "Bell")',
        sql: 'SELECT SUM(amount) FROM invoice_items WHERE vendor_name IN (\'Rogers\', \'Bell\') AND invoice_date >= DATE_TRUNC(\'year\', CURRENT_DATE)',
      },
      suggestedFollowUps: [
        'Rogers vs Bell spending',
        'Top 10 vendors cost',
        'Monthly fiber cost',
      ],
    }
  }

  // Top vendors query
  if (lowerQuery.includes('top') && (lowerQuery.includes('vendor') || lowerQuery.includes('cost'))) {
    const top10 = vendorData.slice(0, 10)
    const total = top10.reduce((sum, v) => sum + v.totalCost, 0)
    return {
      message: 'Here are the top 10 vendors by total cost from your telecom expense data.',
      result: {
        title: 'Top 10 Vendors by Cost',
        value: `$${total.toLocaleString()} CAD`,
        source: 'TEMS Vendor Analytics',
        calculation: 'SUM(invoice_item.amount) GROUP BY vendor ORDER BY total DESC LIMIT 10',
        sql: 'SELECT vendor_name, SUM(amount) as total FROM invoice_items GROUP BY vendor_name ORDER BY total DESC LIMIT 10',
        chartData: top10.map(v => ({ month: v.vendor, cost: v.totalCost })),
        chartTitle: 'Vendor Cost Distribution',
        tableData: top10.map(v => ({ vendor: v.vendor, totalCost: v.totalCost, circuits: v.circuits })),
        tableColumns: [
          { key: 'vendor', label: 'Vendor', align: 'left' },
          { key: 'totalCost', label: 'Total Cost', align: 'right', format: formatCurrency },
          { key: 'circuits', label: 'Circuits', align: 'right' },
        ],
      },
      suggestedFollowUps: [
        'Rogers vs Bell spending',
        'Monthly fiber cost',
        'Inactive circuits count',
      ],
    }
  }

  // Monthly fiber cost
  if (lowerQuery.includes('monthly') && lowerQuery.includes('fiber')) {
    const total = monthlyFiberCost.reduce((sum, m) => sum + m.cost, 0)
    return {
      message: 'Here is the monthly fiber cost trend for the current year.',
      result: {
        title: 'Monthly Fiber Cost Trend',
        value: `$${total.toLocaleString()} CAD (YTD)`,
        source: 'TEMS Circuit Cost Analysis',
        calculation: 'SUM(invoice_item.amount) WHERE circuit_type = "Fiber" GROUP BY month',
        sql: 'SELECT DATE_TRUNC(\'month\', invoice_date) as month, SUM(amount) FROM invoice_items WHERE circuit_type = \'Fiber\' GROUP BY month ORDER BY month',
        chartData: monthlyFiberCost,
        chartTitle: 'Monthly Fiber Cost',
        tableData: monthlyFiberCost.map(m => ({ month: m.month, cost: m.cost })),
        tableColumns: [
          { key: 'month', label: 'Month', align: 'left' },
          { key: 'cost', label: 'Cost', align: 'right', format: formatCurrency },
        ],
      },
      suggestedFollowUps: [
        'Top 10 vendors cost',
        'Rogers vs Bell spending',
        'Total telecom spend YTD',
      ],
    }
  }

  // Rogers vs Bell
  if (lowerQuery.includes('rogers') && lowerQuery.includes('bell') && (lowerQuery.includes('vs') || lowerQuery.includes('spending') || lowerQuery.includes('compare'))) {
    return {
      message: 'Here is the spending comparison between Rogers and Bell over the past 12 months.',
      result: {
        title: 'Rogers vs Bell Spending',
        value: 'Rogers: $1.85M | Bell: $1.39M',
        source: 'TEMS Vendor Comparison Report',
        calculation: 'SUM(invoice_item.amount) GROUP BY vendor, month WHERE vendor IN ("Rogers", "Bell")',
        sql: 'SELECT vendor_name, DATE_TRUNC(\'month\', invoice_date) as month, SUM(amount) FROM invoice_items WHERE vendor_name IN (\'Rogers\', \'Bell\') GROUP BY vendor_name, month',
        chartData: rogersVsBellMonthly.map(r => ({ month: r.month, cost: r.rogers + r.bell })),
        chartTitle: 'Rogers vs Bell Monthly Trend',
        tableData: rogersVsBellMonthly.map(r => ({ month: r.month, rogers: r.rogers, bell: r.bell })),
        tableColumns: [
          { key: 'month', label: 'Month', align: 'left' },
          { key: 'rogers', label: 'Rogers', align: 'right', format: formatCurrency },
          { key: 'bell', label: 'Bell', align: 'right', format: formatCurrency },
        ],
      },
      suggestedFollowUps: [
        'Top 10 vendors cost',
        'Monthly fiber cost',
        'Bell circuit inventory',
      ],
    }
  }

  // Bell inventory
  if (lowerQuery.includes('bell') && lowerQuery.includes('inventory')) {
    const bellCircuits = circuitInventory.filter(c => c.vendor === 'Bell')
    return {
      message: `Found ${bellCircuits.length} Bell circuits in your inventory. Here are the details.`,
      result: {
        title: 'Bell Circuit Inventory',
        value: `${bellCircuits.length} circuits | $${bellCircuits.reduce((s, c) => s + c.monthlyCost, 0).toLocaleString()}/month`,
        source: 'TEMS Circuit Inventory',
        calculation: 'COUNT(*), SUM(monthly_cost) WHERE vendor = "Bell"',
        sql: 'SELECT circuit_id, type, monthly_cost, location, status FROM circuits WHERE vendor_name = \'Bell\'',
        tableData: bellCircuits.map(c => ({ circuitId: c.circuitId, type: c.type, monthlyCost: c.monthlyCost, location: c.location, status: c.status })),
        tableColumns: [
          { key: 'circuitId', label: 'Circuit ID', align: 'left' },
          { key: 'type', label: 'Type', align: 'left' },
          { key: 'monthlyCost', label: 'Monthly Cost', align: 'right', format: formatCurrency },
          { key: 'location', label: 'Location', align: 'left' },
          { key: 'status', label: 'Status', align: 'left' },
        ],
      },
      suggestedFollowUps: [
        'Inactive circuits count',
        'Top 10 vendors cost',
        'Rogers vs Bell spending',
      ],
    }
  }

  // Bell circuit cost this month
  if (
    lowerQuery.includes('bell') &&
    lowerQuery.includes('circuit') &&
    lowerQuery.includes('cost') &&
    (lowerQuery.includes('this month') || lowerQuery.includes('month'))
  ) {
    return {
      message: 'Here is the Bell circuit cost for this month from your TEMS data.',
      result: {
        title: 'Bell Circuit Cost This Month',
        value: '$12,500',
        source: 'Bell Invoice',
        calculation: 'sum of MRC for this month',
      },
      suggestedFollowUps: [
        'Bell circuit inventory',
        'Rogers vs Bell spending',
        'Monthly fiber cost',
      ],
    }
  }

  // Total spend
  if (lowerQuery.includes('total') && (lowerQuery.includes('spend') || lowerQuery.includes('cost'))) {
    const total = vendorData.reduce((sum, v) => sum + v.totalCost, 0)
    return {
      message: 'Here is your total telecom spend year-to-date across all vendors.',
      result: {
        title: 'Total Telecom Spend YTD',
        value: `$${total.toLocaleString()} CAD`,
        source: 'TEMS Financial Summary',
        calculation: 'SUM(invoice_item.amount) WHERE invoice_date >= YEAR_START',
        sql: 'SELECT SUM(amount) FROM invoice_items WHERE invoice_date >= DATE_TRUNC(\'year\', CURRENT_DATE)',
      },
      suggestedFollowUps: [
        'Top 10 vendors cost',
        'Monthly fiber cost',
        'Inactive circuits count',
      ],
    }
  }

  // Inactive circuits
  if (lowerQuery.includes('inactive') && lowerQuery.includes('circuit')) {
    const inactive = circuitInventory.filter(c => c.status === 'inactive')
    return {
      message: `Found ${inactive.length} inactive circuit(s) that may need attention.`,
      result: {
        title: 'Inactive Circuits',
        value: `${inactive.length} circuit(s) | $${inactive.reduce((s, c) => s + c.monthlyCost, 0).toLocaleString()}/month potential savings`,
        source: 'TEMS Circuit Status Report',
        calculation: 'COUNT(*), SUM(monthly_cost) WHERE status = "inactive"',
        sql: 'SELECT circuit_id, vendor_name, monthly_cost FROM circuits WHERE status = \'inactive\'',
        tableData: inactive.map(c => ({ circuitId: c.circuitId, vendor: c.vendor, type: c.type, monthlyCost: c.monthlyCost, location: c.location })),
        tableColumns: [
          { key: 'circuitId', label: 'Circuit ID', align: 'left' },
          { key: 'vendor', label: 'Vendor', align: 'left' },
          { key: 'type', label: 'Type', align: 'left' },
          { key: 'monthlyCost', label: 'Monthly Cost', align: 'right', format: formatCurrency },
          { key: 'location', label: 'Location', align: 'left' },
        ],
      },
      suggestedFollowUps: [
        'Bell circuit inventory',
        'Total telecom spend YTD',
        'Top 10 vendors cost',
      ],
    }
  }

  // --- Default: unrecognized query ---
  return {
    message: 'I couldn\'t find relevant data matching your query. Here are some things I can help you with:',
    clarification: {
      question: 'Try one of these common queries:',
      options: [
        { label: 'Top 10 Vendors by Cost', query: 'Top 10 vendors cost' },
        { label: 'Monthly Fiber Cost Trend', query: 'Monthly fiber cost' },
        { label: 'Bell Circuit Inventory', query: 'Bell circuit inventory' },
      ],
    },
  }
}
