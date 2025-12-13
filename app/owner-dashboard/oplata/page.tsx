"use client"

import { useEffect, useState } from "react"

import { DataTable } from "@/components/data-table"
import { Modal } from "@/components/modal"
import { ApiError, get, post } from "@/styles/lib/api"
import { useToast } from "@/hooks/use-toast"

type ContractSaleDetail = {
  id: string
  carNumber: string
  product: string
  quantity: number
  amount: number
  date: string
}

type OplataContract = {
  id: number
  company: string
  contractSalesCount: number
  remainingSales: number
  amount: number
  createdAt: string
  sales?: ContractSaleDetail[]
}

type OplataContractCreateRequest = {
  company: string
  contractSalesCount: number
  amount: number
}

function formatDateTime(iso: string): string {
  if (!iso) return ""
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  const hours = String(d.getHours()).padStart(2, "0")
  const minutes = String(d.getMinutes()).padStart(2, "0")
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

const columns = [
  { key: "id", label: "ID", sortable: true },
  { key: "company", label: "Kompaniya nomi", sortable: true },
  { key: "contractSalesCount", label: "Umumiy sotuvlar soni", sortable: true },
  { key: "remainingSales", label: "Qolgan sotuvlar soni", sortable: true },
  { key: "amount", label: "Summa (so'm)", sortable: true },
  { key: "createdAt", label: "Vaqt", sortable: true },
]

export default function OwnerContractPaymentsPage() {
  const [payments, setPayments] = useState<OplataContract[]>([])
  const [company, setCompany] = useState("")
  const [contractSalesCount, setContractSalesCount] = useState<number | "">("")
  const [amount, setAmount] = useState<number | "">("")
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [selectedContract, setSelectedContract] = useState<OplataContract | null>(null)

  const { toast } = useToast()

  useEffect(() => {
    let cancelled = false

    const loadContracts = async () => {
      try {
        const data = await get<OplataContract[]>("/oplata-contracts")
        if (cancelled) return
        setPayments(data)
      } catch (err: any) {
        if (cancelled) return
        if (err instanceof ApiError) {
          const backendMessage =
            (err.data && (err.data as any).message) ||
            err.message ||
            "OPLATA shartnomalarini yuklashda xatolik yuz berdi"
          toast({
            title: "Xatolik",
            description: backendMessage,
            variant: "destructive",
          })
        } else {
          toast({
            title: "Xatolik",
            description:
              "OPLATA shartnomalarini yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
            variant: "destructive",
          })
        }
      }
    }

    loadContracts()

    return () => {
      cancelled = true
    }
  }, [toast])

  const resetForm = () => {
    setCompany("")
    setContractSalesCount("")
    setAmount("")
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!company.trim()) {
      setError("Kompaniya nomini kiriting")
      return
    }

    if (contractSalesCount === "" || Number(contractSalesCount) <= 0) {
      setError("Shartnoma bo'yicha sotuvlar sonini to'g'ri kiriting")
      return
    }

    if (amount === "" || Number(amount) <= 0) {
      setError("Summani to'g'ri kiriting")
      return
    }

    const payload: OplataContractCreateRequest = {
      company: company.trim(),
      contractSalesCount: Number(contractSalesCount),
      amount: Number(amount),
    }

    try {
      const created = await post<OplataContract, OplataContractCreateRequest>("/oplata-contracts", payload)
      setPayments((prev) => [...prev, created])
      resetForm()
      setIsModalOpen(false)
    } catch (err: any) {
      if (err instanceof ApiError) {
        const backendMessage =
          (err.data && (err.data as any).message) ||
          err.message ||
          "Shartnomani saqlashda xatolik yuz berdi"
        setError(backendMessage)
        toast({
          title: "Xatolik",
          description: backendMessage,
          variant: "destructive",
        })
      } else {
        const fallbackMessage =
          "Shartnomani saqlashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
        setError(fallbackMessage)
        toast({
          title: "Xatolik",
          description: fallbackMessage,
          variant: "destructive",
        })
      }
    }
  }

  const tableData = payments.map((p) => ({
    ...p,
    amount: `${p.amount.toLocaleString()} so'm`,
    createdAt: formatDateTime(p.createdAt),
  }))

  const openDetails = (contract: OplataContract) => {
    setSelectedContract(contract)
    setIsDetailsOpen(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0F172A]">OPLATA</h1>
        <p className="text-[#64748B] mt-1">
          Shartnoma mavjud bo'lgan kompaniyalar bo'yicha to'lovlarni kiritish va ko'rish.
        </p>
      </div>

      <div className="bg-white rounded-lg p-6 card-shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-[#0F172A]">Yangi shartnoma bo'yicha OPLATA</h2>
          <p className="text-sm text-[#64748B] mt-1">Yangi shartnomani faqat tugma orqali kiritish mumkin.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            resetForm()
            setIsModalOpen(true)
          }}
          className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors font-medium"
        >
          Yangi shartnoma qo'shish
        </button>
      </div>

      <div className="bg-white rounded-lg p-6 card-shadow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-[#0F172A]">Kiritilgan OPLATA yozuvlari</h2>
            <p className="text-sm text-[#64748B]">Shartnoma bo'yicha barcha to'lovlar ro'yxati.</p>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={tableData}
          searchableFields={["company"]}
          actions={(row: any) => (
            <button
              type="button"
              onClick={() => openDetails(row as OplataContract)}
              className="px-3 py-1 text-sm border border-[#CBD5E1] text-[#0F172A] rounded-lg hover:bg-slate-50 transition-colors"
            >
              Qo'shimcha ma'lumotlar
            </button>
          )}
        />
      </div>

      <Modal
        title="Yangi shartnoma qo'shish"
        isOpen={isModalOpen}
        onClose={() => {
          resetForm()
          setIsModalOpen(false)
        }}
        size="md"
      >
        <form
          className=" gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(e)
          }}
        >
          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Kompaniya nomi</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              placeholder="Masalan: BuildCo LLC"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Shartnoma bo'yicha sotuvlar soni</label>
            <input
              type="number"
              value={contractSalesCount}
              onChange={(e) => {
                const value = e.target.value
                if (value === "") {
                  setContractSalesCount("")
                  return
                }
                const parsed = parseInt(value, 10)
                setContractSalesCount(Number.isNaN(parsed) ? "" : parsed)
              }}
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              min={1}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Summa (so'm)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                const value = e.target.value
                if (value === "") {
                  setAmount("")
                  return
                }
                const parsed = parseFloat(value)
                setAmount(Number.isNaN(parsed) ? "" : parsed)
              }}
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              min={0}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 mt-2 md:col-span-3">
              {error}
            </p>
          )}

          <div className="md:col-span-3 flex justify-end items-end gap-2 mt-2">
            <button
              type="button"
              onClick={() => {
                resetForm()
                setIsModalOpen(false)
              }}
              className="px-4 py-2 border border-[#CBD5E1] text-[#0F172A] rounded-lg hover:bg-slate-50 transition-colors font-medium"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors font-medium"
            >
              Saqlash
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        title="Shartnoma bo'yicha qo'shimcha ma'lumotlar"
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false)
          setSelectedContract(null)
        }}
        size="lg"
      >
        {selectedContract && (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <p className="text-xs text-[#64748B]">Kompaniya</p>
                <p className="text-base font-semibold text-[#0F172A]">{selectedContract.company}</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-xs text-[#64748B]">Umumiy sotuvlar soni</p>
                  <p className="font-semibold text-[#0F172A]">{selectedContract.contractSalesCount}</p>
                </div>
                <div>
                  <p className="text-xs text-[#64748B]">Qolgan sotuvlar soni</p>
                  <p className="font-semibold text-[#0F172A]">{selectedContract.remainingSales}</p>
                </div>
                <div>
                  <p className="text-xs text-[#64748B]">Shartnoma summasi</p>
                  <p className="font-semibold text-[#0F172A]">
                    {selectedContract.amount.toLocaleString()} so'm
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-[#0F172A]">Mashinalar va sotuvlar ro'yxati</h3>
              {(!selectedContract.sales || selectedContract.sales.length === 0) && (
                <p className="text-sm text-[#64748B]">
                  Hozircha ushbu shartnoma bo'yicha kassir interfeysida sotuvlar kiritilmagan.
                </p>
              )}

              {selectedContract.sales && selectedContract.sales.length > 0 && (
                <div className="overflow-x-auto rounded-lg border border-[#E2E8F0] bg-white">
                  <table className="min-w-full text-xs">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-3 py-2 text-left font-medium text-[#64748B]">#</th>
                        <th className="px-3 py-2 text-left font-medium text-[#64748B]">Sana</th>
                        <th className="px-3 py-2 text-left font-medium text-[#64748B]">Avto raqami</th>
                        <th className="px-3 py-2 text-left font-medium text-[#64748B]">Mahsulot</th>
                        <th className="px-3 py-2 text-left font-medium text-[#64748B]">Hajm</th>
                        <th className="px-3 py-2 text-left font-medium text-[#64748B]">Summa (so'm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedContract.sales.map((sale, index) => (
                        <tr key={sale.id} className="border-t border-[#E2E8F0]">
                          <td className="px-3 py-2 text-[#0F172A]">{index + 1}</td>
                          <td className="px-3 py-2 text-[#0F172A]">{sale.date}</td>
                          <td className="px-3 py-2 text-[#0F172A]">{sale.carNumber}</td>
                          <td className="px-3 py-2 text-[#0F172A]">{sale.product}</td>
                          <td className="px-3 py-2 text-[#0F172A]">{sale.quantity}</td>
                          <td className="px-3 py-2 text-[#0F172A]">{sale.amount.toLocaleString()} so'm</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
