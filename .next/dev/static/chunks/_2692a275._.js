(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
"[project]/components/modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Modal",
    ()=>Modal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
"use client";
;
;
const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg"
};
function Modal({ isOpen, title, onClose, children, size = "md" }) {
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-slate-950/60 backdrop-blur-sm sm-animate-overlay-in",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `w-full ${sizeClasses[size]} bg-white rounded-2xl border border-slate-200/80 card-shadow-lg overflow-hidden max-h-[90vh] flex flex-col sm-animate-modal-in`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between px-6 py-4 border-b border-slate-200/80",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-base md:text-lg font-semibold text-slate-900",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/components/modal.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/components/modal.tsx",
                                lineNumber: 34,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/modal.tsx",
                            lineNumber: 30,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/modal.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-6 py-5 overflow-y-auto",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/components/modal.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/modal.tsx",
            lineNumber: 25,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/modal.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_c = Modal;
var _c;
__turbopack_context__.k.register(_c, "Modal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/select-field.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SelectField",
    ()=>SelectField
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function SelectField({ value, onChange, options, placeholder, className }) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const buttonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const listRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SelectField.useEffect": ()=>{
            if (!open) return;
            const handleClickOutside = {
                "SelectField.useEffect.handleClickOutside": (event)=>{
                    const target = event.target;
                    if (!buttonRef.current && !listRef.current) return;
                    if (buttonRef.current?.contains(target) || listRef.current?.contains(target)) return;
                    setOpen(false);
                }
            }["SelectField.useEffect.handleClickOutside"];
            document.addEventListener("mousedown", handleClickOutside);
            return ({
                "SelectField.useEffect": ()=>document.removeEventListener("mousedown", handleClickOutside)
            })["SelectField.useEffect"];
        }
    }["SelectField.useEffect"], [
        open
    ]);
    const selected = options.find((o)=>o.value === value);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative ${className ?? ""}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                ref: buttonRef,
                type: "button",
                onClick: ()=>setOpen((prev)=>!prev),
                className: "w-full sm-select flex items-center justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: selected ? "text-slate-900" : "text-slate-400",
                        children: selected?.label ?? placeholder ?? "Tanlang"
                    }, void 0, false, {
                        fileName: "[project]/components/select-field.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                        className: `w-4 h-4 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`
                    }, void 0, false, {
                        fileName: "[project]/components/select-field.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/select-field.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: listRef,
                className: "absolute z-50 mt-1 w-full rounded-xl border border-slate-200 bg-white shadow-lg max-h-60 overflow-auto sm-animate-submenu-in",
                children: options.map((option)=>{
                    const isActive = option.value === value;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>{
                            onChange(option.value);
                            setOpen(false);
                        },
                        className: `w-full px-3 py-2 text-left text-sm transition-colors ${isActive ? "bg-[#2563EB] text-white" : "text-slate-700 hover:bg-slate-50"}`,
                        children: option.label
                    }, option.value, false, {
                        fileName: "[project]/components/select-field.tsx",
                        lineNumber: 62,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/select-field.tsx",
                lineNumber: 55,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/select-field.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_s(SelectField, "r6W03rr+8Vz3c3BLVIGxCIEvB+c=");
_c = SelectField;
var _c;
__turbopack_context__.k.register(_c, "SelectField");
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
"[project]/app/owner-dashboard/payroll/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OwnerPayrollPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$data$2d$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/data-table.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$select$2d$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/select-field.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/styles/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function mapPayrollDtoToRecord(item) {
    const id = item.id ?? item.payrollId ?? "";
    const employeeName = item.employee ?? item.employeeName ?? item.fullName ?? item.name ?? (item.employeeCode ? String(item.employeeCode) : "UNKNOWN");
    const department = item.department ?? item.departmentName ?? "-";
    const role = item.role ?? item.position ?? "";
    const month = item.month ?? item.monthLabel ?? (item.year != null && item.monthNumber != null ? `${item.year} M${String(item.monthNumber).padStart(2, "0")}` : "");
    const baseSalary = item.baseSalary ?? item.salary ?? 0;
    const overtime = item.overtime ?? 0;
    const deductions = item.deductions ?? 0;
    const total = item.total ?? item.totalSalary ?? baseSalary;
    const advance = item.advance ?? 0;
    const remaining = item.remaining ?? total - advance;
    const status = item.status ?? "";
    const payoutDate = item.payoutDate ?? item.date ?? item.loggedAt ?? item.createdAt ?? "";
    return {
        id: String(id),
        employee: employeeName,
        department,
        role,
        month,
        baseSalary,
        overtime,
        deductions,
        total,
        advance,
        remaining,
        status,
        payoutDate
    };
}
const columns = [
    {
        key: "id",
        label: "ID",
        sortable: true
    },
    {
        key: "employee",
        label: "Xodim",
        sortable: true
    },
    {
        key: "role",
        label: "Lavozim",
        sortable: false
    },
    {
        key: "month",
        label: "Oyi",
        sortable: true
    },
    {
        key: "total",
        label: "Umumiy oyligi ($)",
        sortable: true
    },
    {
        key: "advance",
        label: "Olgan avansi ($)",
        sortable: true
    },
    {
        key: "remaining",
        label: "Qoldiq ($)",
        sortable: true
    },
    {
        key: "status",
        label: "Status",
        sortable: true
    },
    {
        key: "payoutDate",
        label: "To'lov sanasi",
        sortable: true
    }
];
const currencyFormatter = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
});
const getCurrentMonthLabel = ()=>{
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    return `${year} M${String(month).padStart(2, "0")}`;
};
const today = new Date();
const currentYear = today.getFullYear();
const defaultDateFrom = `${currentYear}-01-01`;
const defaultDateTo = today.toISOString().slice(0, 10);
function OwnerPayrollPage() {
    _s();
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        dateFrom: defaultDateFrom,
        dateTo: defaultDateTo,
        status: "all"
    });
    const [records, setRecords] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isPaySalaryModalOpen, setIsPaySalaryModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedEmployee, setSelectedEmployee] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [paymentData, setPaymentData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        amount: "",
        paymentDate: new Date().toISOString().split("T")[0],
        notes: ""
    });
    const [newEmployee, setNewEmployee] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        employee: "",
        role: "",
        month: getCurrentMonthLabel(),
        baseSalary: ""
    });
    const [payError, setPayError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isPaying, setIsPaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [addEmployeeError, setAddEmployeeError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isAddingEmployee, setIsAddingEmployee] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [employees, setEmployees] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [payrollDepartments, setPayrollDepartments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [payrollStatuses, setPayrollStatuses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [employeeRoles, setEmployeeRoles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OwnerPayrollPage.useEffect": ()=>{
            let cancelled = false;
            const fetchPayroll = {
                "OwnerPayrollPage.useEffect.fetchPayroll": async ()=>{
                    setIsLoading(true);
                    setError(null);
                    try {
                        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["get"])("/payroll", {
                            params: {
                                dateFrom: filters.dateFrom || undefined,
                                dateTo: filters.dateTo || undefined,
                                status: filters.status === "all" ? undefined : filters.status
                            }
                        });
                        if (cancelled) return;
                        const items = Array.isArray(response) ? response : response.items ?? [];
                        setRecords(items.map({
                            "OwnerPayrollPage.useEffect.fetchPayroll": (item)=>mapPayrollDtoToRecord(item)
                        }["OwnerPayrollPage.useEffect.fetchPayroll"]));
                    } catch (err) {
                        if (cancelled) return;
                        if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"]) {
                            const backendMessage = err.data && err.data.message || err.message || "Oylik yozuvlarini yuklashda xatolik yuz berdi";
                            setError(backendMessage);
                        } else {
                            setError("Oylik yozuvlarini yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
                        }
                    } finally{
                        if (!cancelled) {
                            setIsLoading(false);
                        }
                    }
                }
            }["OwnerPayrollPage.useEffect.fetchPayroll"];
            fetchPayroll();
            return ({
                "OwnerPayrollPage.useEffect": ()=>{
                    cancelled = true;
                }
            })["OwnerPayrollPage.useEffect"];
        }
    }["OwnerPayrollPage.useEffect"], [
        filters.dateFrom,
        filters.dateTo,
        filters.status
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OwnerPayrollPage.useEffect": ()=>{
            let cancelled = false;
            const fetchMeta = {
                "OwnerPayrollPage.useEffect.fetchMeta": async ()=>{
                    try {
                        const [filtersResponse, employeesResponse, employeesFiltersResponse] = await Promise.all([
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["get"])("/payroll/filters"),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["get"])("/employees", {
                                params: {
                                    department: "",
                                    role: "",
                                    active: true
                                }
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["get"])("/employees/filters")
                        ]);
                        if (cancelled) return;
                        const payrollDeps = filtersResponse.departments ?? [];
                        const payrollStats = filtersResponse.statuses ?? [];
                        setPayrollDepartments(payrollDeps);
                        setPayrollStatuses(payrollStats);
                        const employeeItems = Array.isArray(employeesResponse) ? employeesResponse : employeesResponse.items ?? [];
                        setEmployees(employeeItems);
                        const rolesFromFilters = employeesFiltersResponse.roles ?? [];
                        setEmployeeRoles(rolesFromFilters);
                        setNewEmployee({
                            "OwnerPayrollPage.useEffect.fetchMeta": (prev)=>({
                                    ...prev,
                                    role: prev.role || rolesFromFilters[0] || ""
                                })
                        }["OwnerPayrollPage.useEffect.fetchMeta"]);
                    } catch  {}
                }
            }["OwnerPayrollPage.useEffect.fetchMeta"];
            fetchMeta();
            return ({
                "OwnerPayrollPage.useEffect": ()=>{
                    cancelled = true;
                }
            })["OwnerPayrollPage.useEffect"];
        }
    }["OwnerPayrollPage.useEffect"], []);
    const withinRange = (dateStr)=>{
        const current = new Date(dateStr).getTime();
        const from = filters.dateFrom ? new Date(filters.dateFrom).getTime() : undefined;
        const to = filters.dateTo ? new Date(filters.dateTo).getTime() : undefined;
        const afterFrom = typeof from === "number" ? current >= from : true;
        const beforeTo = typeof to === "number" ? current <= to : true;
        return afterFrom && beforeTo;
    };
    const filteredRecords = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "OwnerPayrollPage.useMemo[filteredRecords]": ()=>records.filter({
                "OwnerPayrollPage.useMemo[filteredRecords]": (record)=>{
                    const matchesStatus = filters.status === "all" || record.status === filters.status;
                    return matchesStatus && withinRange(record.payoutDate);
                }
            }["OwnerPayrollPage.useMemo[filteredRecords]"])
    }["OwnerPayrollPage.useMemo[filteredRecords]"], [
        records,
        filters.status,
        filters.dateFrom,
        filters.dateTo
    ]);
    const totals = filteredRecords.reduce((acc, record)=>{
        acc.total += record.total;
        acc.count += 1;
        return acc;
    }, {
        total: 0,
        count: 0
    });
    const avgSalary = totals.count ? totals.total / totals.count : 0;
    const roleOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "OwnerPayrollPage.useMemo[roleOptions]": ()=>employeeRoles.map({
                "OwnerPayrollPage.useMemo[roleOptions]": (role)=>({
                        value: role,
                        label: role
                    })
            }["OwnerPayrollPage.useMemo[roleOptions]"])
    }["OwnerPayrollPage.useMemo[roleOptions]"], [
        employeeRoles
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold text-[#0F172A]",
                        children: "Ishchilar oyligi"
                    }, void 0, false, {
                        fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                        lineNumber: 268,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[#64748B] mt-1",
                        children: "Bo'limlar kesimidagi to'lovlar holati"
                    }, void 0, false, {
                        fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                        lineNumber: 269,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                lineNumber: 267,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-lg p-6 card-shadow space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-semibold text-[#0F172A] mb-2 block",
                                        children: "Boshlanish sanasi"
                                    }, void 0, false, {
                                        fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                        lineNumber: 275,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "date",
                                        value: filters.dateFrom,
                                        onChange: (e)=>setFilters((prev)=>({
                                                    ...prev,
                                                    dateFrom: e.target.value
                                                })),
                                        className: "w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                                    }, void 0, false, {
                                        fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                        lineNumber: 276,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                lineNumber: 274,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-semibold text-[#0F172A] mb-2 block",
                                        children: "Tugash sanasi"
                                    }, void 0, false, {
                                        fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                        lineNumber: 284,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "date",
                                        value: filters.dateTo,
                                        onChange: (e)=>setFilters((prev)=>({
                                                    ...prev,
                                                    dateTo: e.target.value
                                                })),
                                        className: "w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                                    }, void 0, false, {
                                        fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                        lineNumber: 285,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                lineNumber: 283,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-semibold text-[#0F172A] mb-2 block",
                                        children: "Status"
                                    }, void 0, false, {
                                        fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                        lineNumber: 293,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$select$2d$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectField"], {
                                        value: filters.status,
                                        onChange: (status)=>setFilters((prev)=>({
                                                    ...prev,
                                                    status
                                                })),
                                        options: [
                                            {
                                                value: "all",
                                                label: "Barchasi"
                                            },
                                            ...payrollStatuses.map((s)=>({
                                                    value: s,
                                                    label: s
                                                }))
                                        ]
                                    }, void 0, false, {
                                        fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                        lineNumber: 294,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                lineNumber: 292,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                        lineNumber: 273,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-end",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setFilters({
                                    dateFrom: "",
                                    dateTo: "",
                                    status: "all"
                                }),
                            className: "px-4 py-2 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] hover:bg-[#F1F5F9] mt-2",
                            children: "Filtrlarni tozalash"
                        }, void 0, false, {
                            fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                            lineNumber: 305,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                        lineNumber: 304,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                lineNumber: 272,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-lg p-6 card-shadow",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-semibold text-[#0F172A]",
                                children: "Ish haqi ro'yxati"
                            }, void 0, false, {
                                fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                lineNumber: 325,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsAddEmployeeModalOpen(true),
                                className: "px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors font-semibold flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "+"
                                    }, void 0, false, {
                                        fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                        lineNumber: 330,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Yangi ishchini ishga olish"
                                    }, void 0, false, {
                                        fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                        lineNumber: 331,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                lineNumber: 326,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                        lineNumber: 324,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-4 text-sm text-red-600",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                        lineNumber: 334,
                        columnNumber: 19
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$data$2d$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DataTable"], {
                        columns: columns,
                        data: filteredRecords,
                        searchableFields: [
                            "id",
                            "employee",
                            "department",
                            "role",
                            "status"
                        ],
                        renderCell: (row, col)=>{
                            if (col.key === "total" || col.key === "advance") {
                                return currencyFormatter.format(row[col.key]);
                            }
                            if (col.key === "remaining") {
                                const remaining = row[col.key];
                                const isNegative = remaining < 0;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: isNegative ? "text-red-600 font-semibold" : "",
                                    children: [
                                        isNegative ? "-" : "",
                                        currencyFormatter.format(Math.abs(remaining))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                    lineNumber: 347,
                                    columnNumber: 17
                                }, void 0);
                            }
                            return row[col.key];
                        },
                        actions: (row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setPayError(null);
                                    setSelectedEmployee(row);
                                    setPaymentData({
                                        amount: row.remaining > 0 ? row.remaining.toString() : "",
                                        paymentDate: new Date().toISOString().split("T")[0],
                                        notes: ""
                                    });
                                    setIsPaySalaryModalOpen(true);
                                },
                                className: "px-3 py-1 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-colors text-sm font-semibold",
                                children: "Oylik berish"
                            }, void 0, false, {
                                fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                lineNumber: 356,
                                columnNumber: 13
                            }, void 0),
                        footerTotals: filteredRecords.reduce((acc, record)=>{
                            acc.total += record.total;
                            acc.advance += record.advance;
                            acc.remaining += record.remaining;
                            acc.count += 1;
                            return acc;
                        }, {
                            total: 0,
                            advance: 0,
                            remaining: 0,
                            count: 0
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                        lineNumber: 335,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                lineNumber: 323,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
                isOpen: isPaySalaryModalOpen,
                title: selectedEmployee ? `${selectedEmployee.employee} uchun oylik berish` : "Oylik berish",
                onClose: ()=>{
                    setIsPaySalaryModalOpen(false);
                    setSelectedEmployee(null);
                    setPaymentData({
                        amount: "",
                        paymentDate: new Date().toISOString().split("T")[0],
                        notes: ""
                    });
                    setPayError(null);
                    setIsPaying(false);
                },
                size: "lg",
                children: selectedEmployee && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: async (e)=>{
                        e.preventDefault();
                        if (!selectedEmployee) return;
                        const amount = Number(paymentData.amount);
                        setIsPaying(true);
                        setPayError(null);
                        try {
                            const body = {
                                amount,
                                paymentDate: paymentData.paymentDate,
                                notes: paymentData.notes || undefined
                            };
                            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["post"])(`/payroll/${selectedEmployee.id}/pay`, body);
                            const updated = response.record ?? response;
                            setRecords((prev)=>prev.map((r)=>r.id === updated.id ? updated : r));
                            setIsPaySalaryModalOpen(false);
                            setSelectedEmployee(null);
                            setPaymentData({
                                amount: "",
                                paymentDate: new Date().toISOString().split("T")[0],
                                notes: ""
                            });
                        } catch (err) {
                            if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"]) {
                                const backendMessage = err.data && err.data.message || err.message || "Oylik to'lovini saqlashda xatolik yuz berdi";
                                setPayError(backendMessage);
                            } else {
                                setPayError("Oylik to'lovini saqlashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
                            }
                        } finally{
                            setIsPaying(false);
                        }
                    },
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-[#F8FAFC] p-4 rounded-lg space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-[#64748B]",
                                            children: "Xodim:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                            lineNumber: 450,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-semibold text-[#0F172A]",
                                            children: selectedEmployee.employee
                                        }, void 0, false, {
                                            fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                            lineNumber: 451,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                    lineNumber: 449,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-[#64748B]",
                                            children: "Bo'lim:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                            lineNumber: 454,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-semibold text-[#0F172A]",
                                            children: selectedEmployee.department
                                        }, void 0, false, {
                                            fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                            lineNumber: 455,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                    lineNumber: 453,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-[#64748B]",
                                            children: "Umumiy oyligi:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                            lineNumber: 458,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-semibold text-[#0F172A]",
                                            children: currencyFormatter.format(selectedEmployee.total)
                                        }, void 0, false, {
                                            fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                            lineNumber: 459,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                    lineNumber: 457,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-[#64748B]",
                                            children: "Olgan avansi:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                            lineNumber: 462,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-semibold text-[#0F172A]",
                                            children: currencyFormatter.format(selectedEmployee.advance)
                                        }, void 0, false, {
                                            fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                            lineNumber: 463,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                    lineNumber: 461,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between border-t border-[#E2E8F0] pt-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-semibold text-[#0F172A]",
                                            children: "Qoldiq:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                            lineNumber: 466,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-semibold text-[#10B981]",
                                            children: currencyFormatter.format(selectedEmployee.remaining)
                                        }, void 0, false, {
                                            fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                            lineNumber: 467,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                    lineNumber: 465,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                            lineNumber: 448,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-semibold text-[#0F172A] mb-2 block",
                                    children: "To'lov miqdori ($)"
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                    lineNumber: 472,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    value: paymentData.amount,
                                    onChange: (e)=>setPaymentData((prev)=>({
                                                ...prev,
                                                amount: e.target.value
                                            })),
                                    className: "w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]",
                                    placeholder: "0",
                                    min: "0",
                                    step: "0.01",
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                    lineNumber: 473,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-[#64748B] mt-1",
                                    children: [
                                        "Qoldiq: ",
                                        currencyFormatter.format(selectedEmployee.remaining),
                                        selectedEmployee.remaining < 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-red-600 ml-2",
                                            children: [
                                                "(Qoldiqdan ko'p berilgan: ",
                                                currencyFormatter.format(Math.abs(selectedEmployee.remaining)),
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                            lineNumber: 486,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                    lineNumber: 483,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                            lineNumber: 471,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-semibold text-[#0F172A] mb-2 block",
                                    children: "To'lov sanasi"
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                    lineNumber: 492,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "date",
                                    value: paymentData.paymentDate,
                                    onChange: (e)=>setPaymentData((prev)=>({
                                                ...prev,
                                                paymentDate: e.target.value
                                            })),
                                    className: "w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]",
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                    lineNumber: 493,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                            lineNumber: 491,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-semibold text-[#0F172A] mb-2 block",
                                    children: "Izoh (ixtiyoriy)"
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                    lineNumber: 503,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: paymentData.notes,
                                    onChange: (e)=>setPaymentData((prev)=>({
                                                ...prev,
                                                notes: e.target.value
                                            })),
                                    className: "w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]",
                                    rows: 3,
                                    placeholder: "Qo'shimcha ma'lumotlar..."
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                    lineNumber: 504,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                            lineNumber: 502,
                            columnNumber: 13
                        }, this),
                        payError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-red-600",
                            children: payError
                        }, void 0, false, {
                            fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                            lineNumber: 513,
                            columnNumber: 26
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3 pt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    className: "flex-1 px-4 py-2 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed",
                                    disabled: isPaying,
                                    children: "Oylik berish"
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                    lineNumber: 516,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        setIsPaySalaryModalOpen(false);
                                        setSelectedEmployee(null);
                                        setPaymentData({
                                            amount: "",
                                            paymentDate: new Date().toISOString().split("T")[0],
                                            notes: ""
                                        });
                                    },
                                    className: "flex-1 px-4 py-2 bg-gray-200 text-[#0F172A] rounded-lg hover:bg-gray-300 transition-colors font-semibold",
                                    children: "Bekor qilish"
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                    lineNumber: 523,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                            lineNumber: 515,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                    lineNumber: 402,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                lineNumber: 385,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
                isOpen: isAddEmployeeModalOpen,
                title: "Yangi ishchini ishga olish",
                onClose: ()=>{
                    setIsAddEmployeeModalOpen(false);
                    setNewEmployee({
                        employee: "",
                        role: "",
                        month: getCurrentMonthLabel(),
                        baseSalary: ""
                    });
                    setAddEmployeeError(null);
                    setIsAddingEmployee(false);
                },
                size: "lg",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: async (e)=>{
                        e.preventDefault();
                        setIsAddingEmployee(true);
                        setAddEmployeeError(null);
                        try {
                            const name = newEmployee.employee.trim();
                            if (!name) {
                                setAddEmployeeError("Xodim ismi kiritilmagan");
                                setIsAddingEmployee(false);
                                return;
                            }
                            const monthInput = newEmployee.month.trim();
                            const match = monthInput.match(/^(\d{4})\s*M(\d{1,2})$/);
                            if (!match) {
                                setAddEmployeeError("Oyi noto'g'ri formatda. Masalan: 2025 M12");
                                setIsAddingEmployee(false);
                                return;
                            }
                            const year = Number(match[1]);
                            const month = Number(match[2]);
                            const monthLabel = monthInput;
                            const payload = {
                                // ВРЕМЕННАЯ СХЕМА: backend будет обновлён, чтобы обрабатывать новый сотрудник по имени/роли
                                employeeId: 0,
                                employeeName: name,
                                employeeRole: newEmployee.role || null,
                                year,
                                month,
                                monthLabel,
                                baseSalary: newEmployee.baseSalary !== "" ? Number(newEmployee.baseSalary) || 0 : 0,
                                overtime: 0,
                                deductions: 0,
                                advance: 0
                            };
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["post"])("/payroll", payload);
                            try {
                                const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["get"])("/payroll", {
                                    params: {
                                        dateFrom: filters.dateFrom,
                                        dateTo: filters.dateTo,
                                        status: filters.status === "all" ? undefined : filters.status
                                    }
                                });
                                const items = Array.isArray(response) ? response : response.items ?? [];
                                setRecords(items.map((item)=>mapPayrollDtoToRecord(item)));
                            } catch  {}
                            setIsAddEmployeeModalOpen(false);
                            setNewEmployee({
                                employee: "",
                                role: "",
                                month: getCurrentMonthLabel(),
                                baseSalary: ""
                            });
                        } catch (err) {
                            if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"]) {
                                const backendMessage = err.data && err.data.message || err.message || "Yangi ishchini saqlashda xatolik yuz berdi";
                                setAddEmployeeError(backendMessage);
                            } else {
                                setAddEmployeeError("Yangi ishchini saqlashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
                            }
                        } finally{
                            setIsAddingEmployee(false);
                        }
                    },
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-semibold text-[#0F172A] mb-2 block",
                                    children: "Xodim ismi"
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                    lineNumber: 636,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: newEmployee.employee,
                                    onChange: (e)=>setNewEmployee((prev)=>({
                                                ...prev,
                                                employee: e.target.value
                                            })),
                                    className: "w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]",
                                    placeholder: "Xodim ismini kiriting",
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                    lineNumber: 637,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                            lineNumber: 635,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-semibold text-[#0F172A] mb-2 block",
                                    children: "Lavozim"
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                    lineNumber: 652,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$select$2d$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectField"], {
                                    value: newEmployee.role,
                                    onChange: (role)=>setNewEmployee((prev)=>({
                                                ...prev,
                                                role
                                            })),
                                    options: roleOptions
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                    lineNumber: 653,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                            lineNumber: 651,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-semibold text-[#0F172A] mb-2 block",
                                    children: "Oyi"
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                    lineNumber: 665,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: newEmployee.month,
                                    onChange: (e)=>setNewEmployee((prev)=>({
                                                ...prev,
                                                month: e.target.value
                                            })),
                                    className: "w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]",
                                    placeholder: "Masalan: 2025 M12",
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                    lineNumber: 666,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                            lineNumber: 664,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-semibold text-[#0F172A] mb-2 block",
                                    children: "Asosiy oylik ($)"
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                    lineNumber: 676,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    value: newEmployee.baseSalary,
                                    onChange: (e)=>setNewEmployee((prev)=>({
                                                ...prev,
                                                baseSalary: e.target.value
                                            })),
                                    className: "w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]",
                                    placeholder: "0",
                                    min: "0",
                                    step: "0.01",
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                    lineNumber: 677,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                            lineNumber: 675,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3 pt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    className: "flex-1 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed",
                                    disabled: isAddingEmployee,
                                    children: "Saqlash"
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                    lineNumber: 689,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        setIsAddEmployeeModalOpen(false);
                                        setNewEmployee({
                                            employee: "",
                                            role: "",
                                            month: getCurrentMonthLabel(),
                                            baseSalary: ""
                                        });
                                        setAddEmployeeError(null);
                                    },
                                    className: "flex-1 px-4 py-2 bg-gray-200 text-[#0F172A] rounded-lg hover:bg-gray-300 transition-colors font-semibold",
                                    children: "Bekor qilish"
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                                    lineNumber: 696,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                            lineNumber: 688,
                            columnNumber: 11
                        }, this),
                        addEmployeeError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-red-600",
                            children: addEmployeeError
                        }, void 0, false, {
                            fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                            lineNumber: 713,
                            columnNumber: 32
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                    lineNumber: 559,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
                lineNumber: 543,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/owner-dashboard/payroll/page.tsx",
        lineNumber: 266,
        columnNumber: 5
    }, this);
}
_s(OwnerPayrollPage, "SU/YALjBdYpUTOnywlEklbK3R8A=");
_c = OwnerPayrollPage;
var _c;
__turbopack_context__.k.register(_c, "OwnerPayrollPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_2692a275._.js.map