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
}

export interface CircuitData {
  circuitId: string
  vendor: string
  type: string
  monthlyCost: number
  location: string
  status: 'active' | 'inactive'
}

export interface QueryResult {
  title: string
  value: string
  source: string
  calculation: string
  sql?: string
  chartData?: MonthlyTrend[]
  chartTitle?: string
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

// Simulate AI response based on query
export function getAIResponse(query: string): { message: string; result?: QueryResult } {
  const lowerQuery = query.toLowerCase()
  console.log("[v0] getAIResponse called with query:", query)
  console.log("[v0] lowerQuery:", lowerQuery)
  
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
      }
    }
  }
  
  // Top vendors query
  console.log("[v0] Checking top vendors:", lowerQuery.includes('top'), lowerQuery.includes('vendor'), lowerQuery.includes('cost'))
  if (lowerQuery.includes('top') && (lowerQuery.includes('vendor') || lowerQuery.includes('cost'))) {
    console.log("[v0] Matched top vendors query!")
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
      }
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
      }
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
      }
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
      }
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
      }
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
      }
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
      }
    }
  }
  
  // Default response
  return {
    message: 'I can help you query telecom expense data. Try asking about vendor costs, circuit inventory, or monthly spending trends. You can also click on the suggested queries below to get started.',
  }
}
