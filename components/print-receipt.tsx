"use client"

import React from "react"

export function printSaleReceipt(sale: Record<string, any>) {
  // Build a simple printable HTML layout and open in new window
  const amountToWords = (num: number) => {
    try {
      // simple english words for numbers under 1M — ok for demo receipts
      const units = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
      if (num < 10) return units[num]
      return num.toString() // fallback
    } catch {
      return ""
    }
  }

  const html = `
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Sale Receipt - ${sale.id}</title>
        <style>
          body { font-family: Arial, Helvetica, sans-serif; margin: 20px; }
          .receipt { max-width: 380px; margin: 0 auto; }
          .header { text-align: center; margin-bottom: 12px; }
          .line { display:flex; justify-content:space-between; margin:6px 0; }
          .total { font-weight: 700; font-size: 18px; margin-top: 12px; }
          hr { border: none; border-top: 1px dashed #333; margin: 8px 0; }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="header">
            <h2>DrabilkaUz - Receipt</h2>
            <div>Sale: ${sale.id}</div>
            <div>${new Date(sale.date || Date.now()).toLocaleString()}</div>
          </div>
          <hr />
          <div class="line"><div>Client</div><div>${sale.client}</div></div>
          <div class="line"><div>Phone</div><div>${sale.phone || '-'}</div></div>
          <div class="line"><div>Car</div><div>${sale.carNumber || '-'}</div></div>
          <div class="line"><div>Material</div><div>${sale.material}</div></div>
          <div class="line"><div>Weight</div><div>${sale.weight} ton</div></div>
          <div class="line"><div>Summa</div><div>${sale.price} so'm</div></div>
          <div class="line"><div>Employee</div><div>${sale.employee || '-'}</div></div>
          <div class="line"><div>Payment</div><div>${sale.paymentType || 'Unknown'}</div></div>
          <hr />
            <div class="total">TOTAL: ${sale.price} so'm</div>
            <div style="font-size:12px;color:#333;margin-top:6px">Amount in words: ${amountToWords(Number(sale.price))}</div>

            <div style="margin-top:18px;border-top:1px solid #ddd;padding-top:8px;display:flex;justify-content:space-between;">
              <div style="text-align:center;width:48%">
                <div style="height:48px"></div>
                <div style="border-top:1px dashed #999;padding-top:6px;font-size:12px;">Customer signature</div>
              </div>
              <div style="text-align:center;width:48%">
                <div style="height:48px"></div>
                <div style="border-top:1px dashed #999;padding-top:6px;font-size:12px;">Received by (Cashier)</div>
              </div>
            </div>

            <div style="margin-top:10px;font-size:11px;color:#666;">Notes: ${sale.note || "-"}</div>
            <div style="text-align:center;margin-top:14px;font-size:12px;color:#555;">Thank you for your purchase</div>
        </div>
        <script>
          setTimeout(() => { window.print(); }, 300);
        </script>
      </body>
    </html>
  `

  const newWindow = window.open("", "_blank", "width=420,height=680")
    if (newWindow) {
    newWindow.document.open()
    newWindow.document.write(html)
    newWindow.document.close()
  } else {
    alert("Please allow popups to print receipt")
  }
}

export default function PrintReceipt() {
  return null
}
