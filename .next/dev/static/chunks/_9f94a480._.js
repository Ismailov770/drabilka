(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/stat-card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StatCard",
    ()=>StatCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const colorMap = {
    blue: "from-[#2563EB] to-[#4F46E5] text-white",
    green: "from-[#22C55E] to-[#16A34A] text-white",
    orange: "from-[#FDBA74] to-[#FB923C] text-[#7C2D12]",
    red: "from-[#FCA5A5] to-[#F97373] text-[#7F1D1D]",
    purple: "from-[#C4B5FD] to-[#A855F7] text-white"
};
function StatCard({ label, value, icon, trend, color = "blue" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-2xl p-6 card-shadow-lg border border-slate-100 flex flex-col justify-between",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-start justify-between gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs font-medium uppercase tracking-wide text-slate-500",
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/components/stat-card.tsx",
                            lineNumber: 24,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-3xl md:text-4xl font-semibold text-slate-900",
                            children: value
                        }, void 0, false, {
                            fileName: "[project]/components/stat-card.tsx",
                            lineNumber: 25,
                            columnNumber: 11
                        }, this),
                        trend && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: `text-xs mt-1 md:text-sm ${trend.isPositive ? "text-emerald-500" : "text-rose-500"}`,
                            children: [
                                trend.isPositive ? "▲" : "▼",
                                " ",
                                Math.abs(trend.value),
                                "% from last month"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/stat-card.tsx",
                            lineNumber: 27,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/stat-card.tsx",
                    lineNumber: 23,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${colorMap[color]} shadow-md`,
                    children: icon
                }, void 0, false, {
                    fileName: "[project]/components/stat-card.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/stat-card.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/stat-card.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = StatCard;
var _c;
__turbopack_context__.k.register(_c, "StatCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/data-table.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DataTable",
    ()=>DataTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function DataTable({ columns, data, searchableFields = [], actions, renderCell, footerTotals }) {
    _s();
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [sortConfig, setSortConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    let filteredData = data;
    if (searchableFields.length > 0) {
        filteredData = data.filter((row)=>searchableFields.some((field)=>String(row[field]).toLowerCase().includes(searchTerm.toLowerCase())));
    }
    if (sortConfig) {
        filteredData = [
            ...filteredData
        ].sort((a, b)=>{
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];
            const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
            return sortConfig.direction === "asc" ? comparison : -comparison;
        });
    }
    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const displayData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    // Calculate totals from filtered data (including search filter)
    const calculatedTotals = footerTotals ? filteredData.reduce((acc, row)=>{
        if (row.quantity !== undefined) acc.quantity += row.quantity;
        if (row.totalSum !== undefined) acc.totalSum += row.totalSum;
        if (row.amount !== undefined) acc.amount += row.amount;
        if (row.total !== undefined) acc.total += row.total;
        if (row.advance !== undefined) acc.advance += row.advance;
        if (row.remaining !== undefined) acc.remaining += row.remaining;
        if (row.cost !== undefined) acc.cost += row.cost;
        if (row.count !== undefined) acc.count += row.count;
        return acc;
    }, {
        quantity: 0,
        totalSum: 0,
        amount: 0,
        total: 0,
        advance: 0,
        remaining: 0,
        cost: 0,
        count: filteredData.length
    }) : null;
    const handleSort = (key)=>{
        setSortConfig((prev)=>prev?.key === key && prev.direction === "asc" ? {
                key,
                direction: "desc"
            } : {
                key,
                direction: "asc"
            });
        setCurrentPage(1);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            searchableFields.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "text",
                    placeholder: "Search...",
                    value: searchTerm,
                    onChange: (e)=>{
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    },
                    className: "flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                }, void 0, false, {
                    fileName: "[project]/components/data-table.tsx",
                    lineNumber: 77,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/data-table.tsx",
                lineNumber: 76,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-x-auto rounded-2xl border border-slate-100",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "bg-slate-50 border-b border-slate-200",
                                children: [
                                    columns.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-3 text-left",
                                            children: col.sortable ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleSort(col.key),
                                                className: "flex items-center gap-2 font-semibold text-slate-700 hover:text-[#2563EB] transition-colors",
                                                children: [
                                                    col.label,
                                                    sortConfig?.key === col.key && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: sortConfig.direction === "asc" ? "↑" : "↓"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/data-table.tsx",
                                                        lineNumber: 102,
                                                        columnNumber: 55
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/data-table.tsx",
                                                lineNumber: 97,
                                                columnNumber: 21
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-slate-700",
                                                children: col.label
                                            }, void 0, false, {
                                                fileName: "[project]/components/data-table.tsx",
                                                lineNumber: 105,
                                                columnNumber: 21
                                            }, this)
                                        }, col.key, false, {
                                            fileName: "[project]/components/data-table.tsx",
                                            lineNumber: 95,
                                            columnNumber: 17
                                        }, this)),
                                    actions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-6 py-3 text-left font-semibold text-slate-700",
                                        children: "Actions"
                                    }, void 0, false, {
                                        fileName: "[project]/components/data-table.tsx",
                                        lineNumber: 109,
                                        columnNumber: 27
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/data-table.tsx",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/data-table.tsx",
                            lineNumber: 92,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: displayData.map((row, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "border-b border-slate-100 hover:bg-slate-50 transition-colors",
                                    children: [
                                        columns.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4 text-slate-900 text-sm",
                                                children: renderCell ? renderCell(row, col) : row[col.key]
                                            }, col.key, false, {
                                                fileName: "[project]/components/data-table.tsx",
                                                lineNumber: 116,
                                                columnNumber: 19
                                            }, this)),
                                        actions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4",
                                            children: actions(row)
                                        }, void 0, false, {
                                            fileName: "[project]/components/data-table.tsx",
                                            lineNumber: 120,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, idx, true, {
                                    fileName: "[project]/components/data-table.tsx",
                                    lineNumber: 114,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/data-table.tsx",
                            lineNumber: 112,
                            columnNumber: 11
                        }, this),
                        calculatedTotals && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tfoot", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "bg-slate-50 border-t border-slate-200 font-semibold",
                                children: [
                                    columns.map((col)=>{
                                        if (col.key === "quantity" && calculatedTotals.quantity !== undefined) {
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4 text-slate-900 text-sm",
                                                children: [
                                                    new Intl.NumberFormat("ru-RU", {
                                                        maximumFractionDigits: 0
                                                    }).format(calculatedTotals.quantity),
                                                    " tonna"
                                                ]
                                            }, col.key, true, {
                                                fileName: "[project]/components/data-table.tsx",
                                                lineNumber: 130,
                                                columnNumber: 23
                                            }, this);
                                        }
                                        if (col.key === "cost" && calculatedTotals.cost !== undefined) {
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4 text-slate-900 text-sm",
                                                children: new Intl.NumberFormat("ru-RU", {
                                                    style: "currency",
                                                    currency: "USD",
                                                    maximumFractionDigits: 0
                                                }).format(calculatedTotals.cost)
                                            }, col.key, false, {
                                                fileName: "[project]/components/data-table.tsx",
                                                lineNumber: 137,
                                                columnNumber: 23
                                            }, this);
                                        }
                                        if (col.key === "totalSum" && calculatedTotals.totalSum !== undefined) {
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4 text-slate-900 text-sm",
                                                children: [
                                                    new Intl.NumberFormat("ru-RU", {
                                                        maximumFractionDigits: 0
                                                    }).format(calculatedTotals.totalSum),
                                                    " so'm"
                                                ]
                                            }, col.key, true, {
                                                fileName: "[project]/components/data-table.tsx",
                                                lineNumber: 146,
                                                columnNumber: 23
                                            }, this);
                                        }
                                        if (col.key === "amount" && calculatedTotals.amount !== undefined) {
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4 text-slate-900 text-sm",
                                                children: new Intl.NumberFormat("ru-RU", {
                                                    style: "currency",
                                                    currency: "USD",
                                                    maximumFractionDigits: 0
                                                }).format(calculatedTotals.amount)
                                            }, col.key, false, {
                                                fileName: "[project]/components/data-table.tsx",
                                                lineNumber: 153,
                                                columnNumber: 23
                                            }, this);
                                        }
                                        if (col.key === "total" && calculatedTotals.total !== undefined) {
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4 text-slate-900 text-sm",
                                                children: new Intl.NumberFormat("ru-RU", {
                                                    style: "currency",
                                                    currency: "USD",
                                                    maximumFractionDigits: 0
                                                }).format(calculatedTotals.total)
                                            }, col.key, false, {
                                                fileName: "[project]/components/data-table.tsx",
                                                lineNumber: 162,
                                                columnNumber: 23
                                            }, this);
                                        }
                                        if (col.key === "advance" && calculatedTotals.advance !== undefined) {
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4 text-slate-900 text-sm",
                                                children: new Intl.NumberFormat("ru-RU", {
                                                    style: "currency",
                                                    currency: "USD",
                                                    maximumFractionDigits: 0
                                                }).format(calculatedTotals.advance)
                                            }, col.key, false, {
                                                fileName: "[project]/components/data-table.tsx",
                                                lineNumber: 171,
                                                columnNumber: 23
                                            }, this);
                                        }
                                        if (col.key === "remaining" && calculatedTotals.remaining !== undefined) {
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4 text-slate-900 text-sm",
                                                children: new Intl.NumberFormat("ru-RU", {
                                                    style: "currency",
                                                    currency: "USD",
                                                    maximumFractionDigits: 0
                                                }).format(calculatedTotals.remaining)
                                            }, col.key, false, {
                                                fileName: "[project]/components/data-table.tsx",
                                                lineNumber: 180,
                                                columnNumber: 23
                                            }, this);
                                        }
                                        if (col.key === "batchId" || col.key === "id") {
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4 text-slate-900 text-right font-semibold text-sm",
                                                children: "Jami:"
                                            }, col.key, false, {
                                                fileName: "[project]/components/data-table.tsx",
                                                lineNumber: 189,
                                                columnNumber: 23
                                            }, this);
                                        }
                                        // Show count in operator column if count is available
                                        if (col.key === "operator" && calculatedTotals.count !== undefined && calculatedTotals.count > 0) {
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4 text-slate-900 font-semibold text-sm",
                                                children: [
                                                    new Intl.NumberFormat("ru-RU", {
                                                        maximumFractionDigits: 0
                                                    }).format(calculatedTotals.count),
                                                    " ta"
                                                ]
                                            }, col.key, true, {
                                                fileName: "[project]/components/data-table.tsx",
                                                lineNumber: 197,
                                                columnNumber: 23
                                            }, this);
                                        }
                                        // Show count in loggedAt, producedAt, or payoutDate column if operator column doesn't exist
                                        if ((col.key === "producedAt" || col.key === "loggedAt" || col.key === "payoutDate" || col.key === "date") && calculatedTotals.count !== undefined && calculatedTotals.count > 0 && !columns.find((c)=>c.key === "operator")) {
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4 text-slate-900 font-semibold text-sm",
                                                children: [
                                                    new Intl.NumberFormat("ru-RU", {
                                                        maximumFractionDigits: 0
                                                    }).format(calculatedTotals.count),
                                                    " ta"
                                                ]
                                            }, col.key, true, {
                                                fileName: "[project]/components/data-table.tsx",
                                                lineNumber: 210,
                                                columnNumber: 23
                                            }, this);
                                        }
                                        // Show count in status column if no operator or date column
                                        if (col.key === "status" && calculatedTotals.count !== undefined && calculatedTotals.count > 0 && !columns.find((c)=>c.key === "operator") && !columns.find((c)=>c.key === "producedAt" || c.key === "loggedAt" || c.key === "payoutDate" || c.key === "date")) {
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4 text-slate-900 font-semibold text-sm",
                                                children: [
                                                    new Intl.NumberFormat("ru-RU", {
                                                        maximumFractionDigits: 0
                                                    }).format(calculatedTotals.count),
                                                    " ta"
                                                ]
                                            }, col.key, true, {
                                                fileName: "[project]/components/data-table.tsx",
                                                lineNumber: 224,
                                                columnNumber: 23
                                            }, this);
                                        }
                                        // Show count in transport column if no operator, date, or status column
                                        if (col.key === "transport" && calculatedTotals.count !== undefined && calculatedTotals.count > 0 && !columns.find((c)=>c.key === "operator") && !columns.find((c)=>c.key === "producedAt" || c.key === "loggedAt" || c.key === "payoutDate" || c.key === "date") && !columns.find((c)=>c.key === "status")) {
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4 text-slate-900 font-semibold text-sm",
                                                children: [
                                                    new Intl.NumberFormat("ru-RU", {
                                                        maximumFractionDigits: 0
                                                    }).format(calculatedTotals.count),
                                                    " ta"
                                                ]
                                            }, col.key, true, {
                                                fileName: "[project]/components/data-table.tsx",
                                                lineNumber: 239,
                                                columnNumber: 23
                                            }, this);
                                        }
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 text-slate-400 text-sm",
                                            children: "-"
                                        }, col.key, false, {
                                            fileName: "[project]/components/data-table.tsx",
                                            lineNumber: 245,
                                            columnNumber: 21
                                        }, this);
                                    }),
                                    actions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-6 py-4"
                                    }, void 0, false, {
                                        fileName: "[project]/components/data-table.tsx",
                                        lineNumber: 250,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/data-table.tsx",
                                lineNumber: 126,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/data-table.tsx",
                            lineNumber: 125,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/data-table.tsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/data-table.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            totalPages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm text-slate-500",
                        children: [
                            "Page ",
                            currentPage,
                            " of ",
                            totalPages
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/data-table.tsx",
                        lineNumber: 259,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setCurrentPage((prev)=>Math.max(1, prev - 1)),
                                disabled: currentPage === 1,
                                className: "px-3 py-1 border border-slate-200 rounded-full text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50",
                                children: "Previous"
                            }, void 0, false, {
                                fileName: "[project]/components/data-table.tsx",
                                lineNumber: 263,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setCurrentPage((prev)=>Math.min(totalPages, prev + 1)),
                                disabled: currentPage === totalPages,
                                className: "px-3 py-1 border border-slate-200 rounded-full text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50",
                                children: "Next"
                            }, void 0, false, {
                                fileName: "[project]/components/data-table.tsx",
                                lineNumber: 270,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/data-table.tsx",
                        lineNumber: 262,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/data-table.tsx",
                lineNumber: 258,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/data-table.tsx",
        lineNumber: 74,
        columnNumber: 5
    }, this);
}
_s(DataTable, "NvQRuQMndOYEXOyITKFDe/5bFjQ=");
_c = DataTable;
var _c;
__turbopack_context__.k.register(_c, "DataTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/styles/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_BASE_URL",
    ()=>API_BASE_URL,
    "ApiError",
    ()=>ApiError,
    "apiRequest",
    ()=>apiRequest,
    "del",
    ()=>del,
    "get",
    ()=>get,
    "patch",
    ()=>patch,
    "post",
    ()=>post,
    "put",
    ()=>put
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:8080/api") ?? "http://localhost:8080/api";
class ApiError extends Error {
    status;
    data;
    constructor(message, status, data = null){
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.data = data;
    }
}
function buildUrl(path, params) {
    const base = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
    if (!params) return base;
    const url = new URL(base);
    Object.entries(params).forEach(([key, value])=>{
        if (value === undefined || value === null) return;
        url.searchParams.append(key, String(value));
    });
    return url.toString();
}
async function apiRequest(path, options = {}) {
    const { method = "GET", params, body, headers, signal } = options;
    const url = buildUrl(path, params);
    let finalHeaders = {
        "Content-Type": "application/json",
        ...headers
    };
    if ("TURBOPACK compile-time truthy", 1) {
        try {
            const token = window.localStorage.getItem("authToken");
            if (token && !finalHeaders.Authorization) {
                finalHeaders = {
                    ...finalHeaders,
                    Authorization: `Bearer ${token}`
                };
            }
        } catch  {}
    }
    const init = {
        method,
        headers: finalHeaders,
        signal
    };
    if (body !== undefined && body !== null && method !== "GET") {
        if (body instanceof FormData) {
            const { ["Content-Type"]: _removed, ...rest } = finalHeaders;
            finalHeaders = rest;
            init.headers = finalHeaders;
            init.body = body;
        } else {
            init.body = JSON.stringify(body);
        }
    }
    const response = await fetch(url, init);
    const text = await response.text();
    let data = null;
    if (text) {
        try {
            data = JSON.parse(text);
        } catch  {
            data = text;
        }
    }
    if (!response.ok) {
        throw new ApiError(response.statusText || "Request failed", response.status, data);
    }
    return data;
}
function get(path, options) {
    return apiRequest(path, {
        ...options,
        method: "GET"
    });
}
function post(path, body, options) {
    return apiRequest(path, {
        ...options,
        method: "POST",
        body
    });
}
function put(path, body, options) {
    return apiRequest(path, {
        ...options,
        method: "PUT",
        body
    });
}
function patch(path, body, options) {
    return apiRequest(path, {
        ...options,
        method: "PATCH",
        body
    });
}
function del(path, body, options) {
    return apiRequest(path, {
        ...options,
        method: "DELETE",
        body
    });
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/owner-dashboard/debts/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OwnerDebtsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$stat$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/stat-card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$data$2d$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/data-table.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hourglass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hourglass$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hourglass.js [app-client] (ecmascript) <export default as Hourglass>");
var __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/styles/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function OwnerDebtsPage() {
    _s();
    const [debts, setDebts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OwnerDebtsPage.useEffect": ()=>{
            let cancelled = false;
            const fetchDebts = {
                "OwnerDebtsPage.useEffect.fetchDebts": async ()=>{
                    setIsLoading(true);
                    setError(null);
                    try {
                        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["get"])("/debts");
                        if (cancelled) return;
                        const items = Array.isArray(response) ? response : response.items ?? [];
                        setDebts(items);
                    } catch (err) {
                        if (cancelled) return;
                        if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"]) {
                            const backendMessage = err.data && err.data.message || err.message || "Qarzlarni yuklashda xatolik yuz berdi";
                            setError(backendMessage);
                        } else {
                            setError("Qarzlarni yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
                        }
                    } finally{
                        if (!cancelled) {
                            setIsLoading(false);
                        }
                    }
                }
            }["OwnerDebtsPage.useEffect.fetchDebts"];
            fetchDebts();
            return ({
                "OwnerDebtsPage.useEffect": ()=>{
                    cancelled = true;
                }
            })["OwnerDebtsPage.useEffect"];
        }
    }["OwnerDebtsPage.useEffect"], []);
    const grouping = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "OwnerDebtsPage.useMemo[grouping]": ()=>{
            const map = new Map();
            for (const d of debts){
                const cur = map.get(d.company) || {
                    totalDue: 0,
                    outstanding: 0,
                    count: 0
                };
                cur.totalDue += d.amountDue;
                cur.outstanding += d.outstanding;
                cur.count += 1;
                map.set(d.company, cur);
            }
            return Array.from(map.entries()).map({
                "OwnerDebtsPage.useMemo[grouping]": ([company, data])=>({
                        company,
                        ...data
                    })
            }["OwnerDebtsPage.useMemo[grouping]"]);
        }
    }["OwnerDebtsPage.useMemo[grouping]"], [
        debts
    ]);
    const totals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "OwnerDebtsPage.useMemo[totals]": ()=>{
            const totalAmount = debts.reduce({
                "OwnerDebtsPage.useMemo[totals].totalAmount": (sum, d)=>sum + d.amountDue
            }["OwnerDebtsPage.useMemo[totals].totalAmount"], 0);
            const totalOutstanding = debts.reduce({
                "OwnerDebtsPage.useMemo[totals].totalOutstanding": (sum, d)=>sum + d.outstanding
            }["OwnerDebtsPage.useMemo[totals].totalOutstanding"], 0);
            return {
                totalAmount,
                totalOutstanding
            };
        }
    }["OwnerDebtsPage.useMemo[totals]"], [
        debts
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-semibold text-slate-900",
                        children: "Owner — Debts Overview"
                    }, void 0, false, {
                        fileName: "[project]/app/owner-dashboard/debts/page.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-slate-500 mt-1",
                        children: "Aggregated view of credits and outstanding balances by company."
                    }, void 0, false, {
                        fileName: "[project]/app/owner-dashboard/debts/page.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/owner-dashboard/debts/page.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$stat$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatCard"], {
                        label: "Total owed",
                        value: `$${totals.totalAmount.toLocaleString()}`,
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/app/owner-dashboard/debts/page.tsx",
                            lineNumber: 94,
                            columnNumber: 17
                        }, void 0),
                        color: "orange"
                    }, void 0, false, {
                        fileName: "[project]/app/owner-dashboard/debts/page.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$stat$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatCard"], {
                        label: "Outstanding",
                        value: `$${totals.totalOutstanding.toLocaleString()}`,
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hourglass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hourglass$3e$__["Hourglass"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/app/owner-dashboard/debts/page.tsx",
                            lineNumber: 100,
                            columnNumber: 17
                        }, void 0),
                        color: "red"
                    }, void 0, false, {
                        fileName: "[project]/app/owner-dashboard/debts/page.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/owner-dashboard/debts/page.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-2xl p-6 card-shadow-lg border border-slate-100",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-1 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-semibold text-slate-900",
                                children: "By Company"
                            }, void 0, false, {
                                fileName: "[project]/app/owner-dashboard/debts/page.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-500",
                                children: "Grouped view of debts by client company."
                            }, void 0, false, {
                                fileName: "[project]/app/owner-dashboard/debts/page.tsx",
                                lineNumber: 108,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/owner-dashboard/debts/page.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$data$2d$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DataTable"], {
                        columns: [
                            {
                                key: "company",
                                label: "Company"
                            },
                            {
                                key: "count",
                                label: "Count"
                            },
                            {
                                key: "totalDue",
                                label: "Total Due"
                            },
                            {
                                key: "outstanding",
                                label: "Outstanding"
                            }
                        ],
                        data: grouping.map((g)=>({
                                company: g.company,
                                count: g.count,
                                totalDue: `$${g.totalDue.toLocaleString()}`,
                                outstanding: `$${g.outstanding.toLocaleString()}`
                            }))
                    }, void 0, false, {
                        fileName: "[project]/app/owner-dashboard/debts/page.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/owner-dashboard/debts/page.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/owner-dashboard/debts/page.tsx",
        lineNumber: 82,
        columnNumber: 5
    }, this);
}
_s(OwnerDebtsPage, "1mjJcqHESl1rn2LQVCX+NemYEyc=");
_c = OwnerDebtsPage;
var _c;
__turbopack_context__.k.register(_c, "OwnerDebtsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/hourglass.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Hourglass
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Hourglass = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Hourglass", [
    [
        "path",
        {
            d: "M5 22h14",
            key: "ehvnwv"
        }
    ],
    [
        "path",
        {
            d: "M5 2h14",
            key: "pdyrp9"
        }
    ],
    [
        "path",
        {
            d: "M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22",
            key: "1d314k"
        }
    ],
    [
        "path",
        {
            d: "M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2",
            key: "1vvvr6"
        }
    ]
]);
;
 //# sourceMappingURL=hourglass.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/hourglass.js [app-client] (ecmascript) <export default as Hourglass>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Hourglass",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hourglass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hourglass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hourglass.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_9f94a480._.js.map