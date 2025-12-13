"use client"

import React from "react"

export function printSaleReceipt(sale: Record<string, any>) {
  // Build a simple printable HTML layout and open in new window
  const amountToWords = (num: number) => {
    try {
      // simple english words for numbers under 1M — ok for demo receipts
      const units = ["nol", "bir", "ikki", "uch", "to'rt", "besh", "olti", "yetti", "sakkiz", "to'qqiz"]
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
        <title>Savdo cheki - ${sale.id}</title>
        <style>
          html, body { margin: 0; padding: 0; }
          body { font-family: Arial, Helvetica, sans-serif; font-size: 12px; }
          .receipt { width: 100%; max-width: 80mm; margin: 0; }
          .header { text-align: center; margin-bottom: 6px; }
          .header h2 { margin: 0; font-size: 16px; }
          .header div { font-size: 11px; }
          .line { display:flex; justify-content:space-between; margin:3px 0; font-size: 11px; }
          .total { font-weight: 700; font-size: 14px; margin-top: 8px; }
          hr { border: none; border-top: 1px dashed #333; margin: 4px 0; }
          @page { margin: 0; size: 80mm auto; }
          @media print {
            html, body { width: 80mm; }
            .receipt { width: 80mm; max-width: none; margin: 0; }
          }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="header">
            <h2>DrabilkaUz - Chek</h2>
            <div>Savdo: ${sale.id}</div>
            <div>${new Date(sale.date || Date.now()).toLocaleString()}</div>
          </div>
          <hr />
          <div class="line"><div>Mijoz</div><div>${sale.client}</div></div>
          <div class="line"><div>Telefon</div><div>${sale.phone || '-'}</div></div>
          <div class="line" style="font-size: 15px;"><div>Avto raqami</div><div>${sale.carNumber || '-'}</div></div>
          <div class="line" style="font-size: 15px;"><div>Mahsulot</div><div>${sale.material}</div></div>
          <div class="line"><div>Hajm</div><div>${sale.weight} m³</div></div>
          <div class="line"><div>Summa</div><div>${sale.price} so'm</div></div>
          <div class="line"><div>Mas'ul xodim</div><div>${sale.employee || '-'}</div></div>
          <div class="line"><div>To'lov turi</div><div>${sale.paymentType || 'Unknown'}</div></div>
          <hr />
            <div class="total">Jami: ${sale.price} so'm</div>
            <div style="font-size:12px;color:#333;margin-top:6px">Yozuv bilan summa: ${amountToWords(Number(sale.price))}</div>

            <div style="margin-top:8px;border-top:1px solid #ddd;padding-top:4px;display:flex;justify-content:space-between;">
              <div style="text-align:center;width:48%">
                <div style="height:24px"></div>
                <div style="border-top:1px dashed #999;padding-top:6px;font-size:12px;">Mijoz imzosi</div>
              </div>
              <div style="text-align:center;width:48%">
                <div style="height:24px"></div>
                <div style="border-top:1px dashed #999;padding-top:6px;font-size:12px;">Qabul qildi (Kassir)</div>
              </div>
            </div>

            <div style="margin-top:4px;font-size:11px;color:#666;">Izoh: ${sale.note || "-"}</div>
            <div style="text-align:center;margin-top:6px;font-size:12px;color:#555;">Xaridingiz uchun rahmat</div>
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
