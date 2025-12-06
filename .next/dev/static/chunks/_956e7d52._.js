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
"[project]/app/owner-dashboard/expenses/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OwnerExpensesPage
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
const expenseTrend = [
    {
        date: "2024-02-10",
        energy: 8600,
        logistics: 5200,
        payroll: 9400,
        technical: 4300
    },
    {
        date: "2024-02-12",
        energy: 8900,
        logistics: 5400,
        payroll: 9500,
        technical: 4500
    },
    {
        date: "2024-02-14",
        energy: 9100,
        logistics: 5600,
        payroll: 9600,
        technical: 4700
    },
    {
        date: "2024-02-16",
        energy: 9400,
        logistics: 5800,
        payroll: 9700,
        technical: 4800
    },
    {
        date: "2024-02-18",
        energy: 9700,
        logistics: 6000,
        payroll: 9900,
        technical: 5100
    },
    {
        date: "2024-02-19",
        energy: 9900,
        logistics: 6200,
        payroll: 10000,
        technical: 5200
    }
];
const columns = [
    {
        key: "id",
        label: "Hujjat",
        sortable: true
    },
    {
        key: "title",
        label: "Tavsif",
        sortable: false
    },
    {
        key: "category",
        label: "Kategoriya",
        sortable: true
    },
    {
        key: "department",
        label: "Bo'lim",
        sortable: true
    },
    {
        key: "amount",
        label: "Miqdor ($)",
        sortable: true
    },
    {
        key: "date",
        label: "Sana",
        sortable: true
    }
];
const currencyFormatter = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
});
const today = new Date();
const currentYear = today.getFullYear();
const defaultDateFrom = `${currentYear}-01-01`;
const defaultDateTo = today.toISOString().split("T")[0];
function OwnerExpensesPage() {
    _s();
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        dateFrom: defaultDateFrom,
        dateTo: defaultDateTo,
        category: "all",
        status: "all"
    });
    const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newExpense, setNewExpense] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        title: "",
        category: "Energiya",
        department: "Ishlab chiqarish",
        amount: "",
        status: "Tasdiq kutmoqda",
        date: new Date().toISOString().split("T")[0],
        employeeName: ""
    });
    const [expenses, setExpenses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [modalError, setModalError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [employees, setEmployees] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [employeesLoading, setEmployeesLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [employeesLoaded, setEmployeesLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [employeesError, setEmployeesError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [employeeError, setEmployeeError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const withinRange = (dateStr)=>{
        const current = new Date(dateStr).getTime();
        const from = filters.dateFrom ? new Date(filters.dateFrom).getTime() : undefined;
        const to = filters.dateTo ? new Date(filters.dateTo).getTime() : undefined;
        const afterFrom = typeof from === "number" ? current >= from : true;
        const beforeTo = typeof to === "number" ? current <= to : true;
        return afterFrom && beforeTo;
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OwnerExpensesPage.useEffect": ()=>{
            let cancelled = false;
            const fetchExpenses = {
                "OwnerExpensesPage.useEffect.fetchExpenses": async ()=>{
                    setIsLoading(true);
                    setError(null);
                    try {
                        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["get"])("/expenses", {
                            params: {
                                dateFrom: filters.dateFrom || undefined,
                                dateTo: filters.dateTo || undefined,
                                category: filters.category === "all" ? undefined : filters.category
                            }
                        });
                        if (cancelled) return;
                        const items = Array.isArray(response) ? response : response.items ?? [];
                        setExpenses(items);
                    } catch (err) {
                        if (cancelled) return;
                        if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"]) {
                            const backendMessage = err.data && err.data.message || err.message || "Rasxodlarni yuklashda xatolik yuz berdi";
                            setError(backendMessage);
                        } else {
                            setError("Rasxodlarni yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
                        }
                    } finally{
                        if (!cancelled) {
                            setIsLoading(false);
                        }
                    }
                }
            }["OwnerExpensesPage.useEffect.fetchExpenses"];
            fetchExpenses();
            return ({
                "OwnerExpensesPage.useEffect": ()=>{
                    cancelled = true;
                }
            })["OwnerExpensesPage.useEffect"];
        }
    }["OwnerExpensesPage.useEffect"], [
        filters.dateFrom,
        filters.dateTo,
        filters.category
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OwnerExpensesPage.useEffect": ()=>{
            if (!isAddExpenseModalOpen) return;
            if (newExpense.category !== "Ish haqi") return;
            if (employeesLoaded || employeesLoading) return;
            let cancelled = false;
            const fetchEmployees = {
                "OwnerExpensesPage.useEffect.fetchEmployees": async ()=>{
                    setEmployeesLoading(true);
                    setEmployeesError(null);
                    try {
                        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["get"])("/employees", {
                            params: {
                                department: "",
                                role: "",
                                active: true
                            }
                        });
                        if (cancelled) return;
                        const items = Array.isArray(response) ? response : response.items ?? [];
                        setEmployees(items);
                        setEmployeesLoaded(true);
                    } catch (err) {
                        if (cancelled) return;
                        if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"]) {
                            const backendMessage = err.data && err.data.message || err.message || "Xodimlar ro'yxatini yuklashda xatolik yuz berdi";
                            setEmployeesError(backendMessage);
                        } else {
                            setEmployeesError("Xodimlar ro'yxatini yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
                        }
                    } finally{
                        if (!cancelled) {
                            setEmployeesLoading(false);
                        }
                    }
                }
            }["OwnerExpensesPage.useEffect.fetchEmployees"];
            fetchEmployees();
            return ({
                "OwnerExpensesPage.useEffect": ()=>{
                    cancelled = true;
                }
            })["OwnerExpensesPage.useEffect"];
        }
    }["OwnerExpensesPage.useEffect"], [
        isAddExpenseModalOpen,
        newExpense.category,
        employeesLoaded,
        employeesLoading
    ]);
    const filteredRecords = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "OwnerExpensesPage.useMemo[filteredRecords]": ()=>expenses.filter({
                "OwnerExpensesPage.useMemo[filteredRecords]": (record)=>{
                    const matchesCategory = filters.category === "all" || record.category === filters.category;
                    const matchesStatus = filters.status === "all" || record.status === filters.status;
                    return matchesCategory && matchesStatus && withinRange(record.date);
                }
            }["OwnerExpensesPage.useMemo[filteredRecords]"])
    }["OwnerExpensesPage.useMemo[filteredRecords]"], [
        expenses,
        filters.category,
        filters.status,
        filters.dateFrom,
        filters.dateTo
    ]);
    const filteredTrend = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "OwnerExpensesPage.useMemo[filteredTrend]": ()=>expenseTrend.filter({
                "OwnerExpensesPage.useMemo[filteredTrend]": (point)=>withinRange(point.date)
            }["OwnerExpensesPage.useMemo[filteredTrend]"])
    }["OwnerExpensesPage.useMemo[filteredTrend]"], [
        filters.dateFrom,
        filters.dateTo
    ]);
    const totals = filteredRecords.reduce((acc, record)=>{
        acc.total += record.amount;
        acc.count += 1;
        if (!acc.byCategory[record.category]) acc.byCategory[record.category] = 0;
        acc.byCategory[record.category] += record.amount;
        return acc;
    }, {
        total: 0,
        count: 0,
        byCategory: {}
    });
    const topCategory = Object.entries(totals.byCategory).sort((a, b)=>b[1] - a[1])[0]?.[0] ?? "Ma'lumot yo'q";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold text-[#0F172A]",
                        children: "Umumiy rasxodlar"
                    }, void 0, false, {
                        fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[#64748B] mt-1",
                        children: "Energiya, logistika, texnik xizmat va ish haqi bo'yicha to'liq hisobot"
                    }, void 0, false, {
                        fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                        lineNumber: 208,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                lineNumber: 206,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-lg p-6 card-shadow space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-4 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-semibold text-[#0F172A] mb-2 block",
                                        children: "Boshlanish sanasi"
                                    }, void 0, false, {
                                        fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                        lineNumber: 214,
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
                                        fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                        lineNumber: 215,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                lineNumber: 213,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-semibold text-[#0F172A] mb-2 block",
                                        children: "Tugash sanasi"
                                    }, void 0, false, {
                                        fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                        lineNumber: 223,
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
                                        fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                        lineNumber: 224,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                lineNumber: 222,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-semibold text-[#0F172A] mb-2 block",
                                        children: "Kategoriya"
                                    }, void 0, false, {
                                        fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                        lineNumber: 232,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: filters.category,
                                        onChange: (e)=>setFilters((prev)=>({
                                                    ...prev,
                                                    category: e.target.value
                                                })),
                                        className: "w-full sm-select",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "all",
                                                children: "Barchasi"
                                            }, void 0, false, {
                                                fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                                lineNumber: 238,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Energiya",
                                                children: "Energiya"
                                            }, void 0, false, {
                                                fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                                lineNumber: 239,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Logistika",
                                                children: "Logistika"
                                            }, void 0, false, {
                                                fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                                lineNumber: 240,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Texnik",
                                                children: "Texnik"
                                            }, void 0, false, {
                                                fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                                lineNumber: 241,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Ish haqi",
                                                children: "Ish haqi"
                                            }, void 0, false, {
                                                fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                                lineNumber: 242,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                        lineNumber: 233,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                lineNumber: 231,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                        lineNumber: 212,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-end",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setFilters({
                                    dateFrom: "",
                                    dateTo: "",
                                    category: "all",
                                    status: "all"
                                }),
                            className: "px-4 py-2 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] hover:bg-[#F1F5F9] mt-2",
                            children: "Filtrlarni tozalash"
                        }, void 0, false, {
                            fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                            lineNumber: 247,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                        lineNumber: 246,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                lineNumber: 211,
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
                                children: "Rasxodlar jurnali"
                            }, void 0, false, {
                                fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                lineNumber: 266,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsAddExpenseModalOpen(true),
                                className: "px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors font-semibold flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "+"
                                    }, void 0, false, {
                                        fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                        lineNumber: 271,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Yangi rasxod"
                                    }, void 0, false, {
                                        fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                        lineNumber: 272,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                lineNumber: 267,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                        lineNumber: 265,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-4 text-sm text-red-600",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                        lineNumber: 276,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$data$2d$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DataTable"], {
                        columns: columns,
                        data: filteredRecords,
                        searchableFields: [
                            "id",
                            "title",
                            "category",
                            "department",
                            "status"
                        ],
                        renderCell: (row, col)=>{
                            if (col.key === "amount") {
                                return currencyFormatter.format(row[col.key]);
                            }
                            return row[col.key];
                        },
                        footerTotals: filteredRecords.reduce((acc, record)=>{
                            acc.amount += record.amount;
                            acc.count += 1;
                            return acc;
                        }, {
                            amount: 0,
                            count: 0
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                        lineNumber: 278,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                lineNumber: 264,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
                isOpen: isAddExpenseModalOpen,
                title: "Yangi rasxod kiritish",
                onClose: ()=>{
                    setIsAddExpenseModalOpen(false);
                    setNewExpense({
                        title: "",
                        category: "Energiya",
                        department: "Ishlab chiqarish",
                        amount: "",
                        status: "Tasdiq kutmoqda",
                        date: new Date().toISOString().split("T")[0],
                        employeeName: ""
                    });
                    setEmployeeError(null);
                    setModalError(null);
                    setIsSubmitting(false);
                },
                size: "lg",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: async (e)=>{
                        e.preventDefault();
                        setModalError(null);
                        setIsSubmitting(true);
                        setEmployeeError(null);
                        if (newExpense.category === "Ish haqi" && !newExpense.employeeName) {
                            setEmployeeError("Xodim majburiy");
                            setIsSubmitting(false);
                            return;
                        }
                        try {
                            const payload = {
                                title: newExpense.title,
                                category: newExpense.category,
                                department: newExpense.department,
                                employeeName: newExpense.category === "Ish haqi" ? newExpense.employeeName : undefined,
                                amount: Number(newExpense.amount) || 0,
                                currency: "USD",
                                date: newExpense.date,
                                status: newExpense.status
                            };
                            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["post"])("/expenses", payload);
                            const created = response.expense ?? response;
                            setExpenses((prev)=>[
                                    ...prev,
                                    created
                                ]);
                            // TODO: Add expense to records
                            alert(`Yangi rasxod qo'shildi: ${created.title} - ${currencyFormatter.format(created.amount)}`);
                            setIsAddExpenseModalOpen(false);
                            setNewExpense({
                                title: "",
                                category: "Energiya",
                                department: "Ishlab chiqarish",
                                amount: "",
                                status: "Tasdiq kutmoqda",
                                date: new Date().toISOString().split("T")[0],
                                employeeName: ""
                            });
                            setEmployeeError(null);
                        } catch (err) {
                            if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"]) {
                                const backendMessage = err.data && err.data.message || err.message || "Rasxodni saqlashda xatolik yuz berdi";
                                setModalError(backendMessage);
                            } else {
                                setModalError("Rasxodni saqlashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
                            }
                        } finally{
                            setIsSubmitting(false);
                        }
                    },
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-semibold text-[#0F172A] mb-2 block",
                                    children: "Tavsif"
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                    lineNumber: 375,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: newExpense.title,
                                    onChange: (e)=>setNewExpense((prev)=>({
                                                ...prev,
                                                title: e.target.value
                                            })),
                                    className: "w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]",
                                    placeholder: "Masalan: Elektr energiyasi",
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                    lineNumber: 376,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                            lineNumber: 374,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-semibold text-[#0F172A] mb-2 block",
                                    children: "Kategoriya"
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                    lineNumber: 386,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$select$2d$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectField"], {
                                    value: newExpense.category,
                                    onChange: (category)=>{
                                        setEmployeeError(null);
                                        setNewExpense((prev)=>({
                                                ...prev,
                                                category,
                                                employeeName: category === "Ish haqi" ? prev.employeeName : ""
                                            }));
                                    },
                                    options: [
                                        {
                                            value: "Energiya",
                                            label: "Energiya"
                                        },
                                        {
                                            value: "Logistika",
                                            label: "Logistika"
                                        },
                                        {
                                            value: "Texnik",
                                            label: "Texnik"
                                        },
                                        {
                                            value: "Ish haqi",
                                            label: "Ish haqi"
                                        },
                                        {
                                            value: "Boshqa",
                                            label: "Boshqa"
                                        }
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                    lineNumber: 387,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                            lineNumber: 385,
                            columnNumber: 11
                        }, this),
                        newExpense.category === "Ish haqi" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-semibold text-[#0F172A] mb-2 block",
                                    children: "Xodim"
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                    lineNumber: 408,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$select$2d$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectField"], {
                                    value: newExpense.employeeName,
                                    onChange: (employeeName)=>{
                                        setEmployeeError(null);
                                        const selected = employees.find((e)=>e.fullName === employeeName);
                                        setNewExpense((prev)=>({
                                                ...prev,
                                                employeeName,
                                                department: selected?.department || prev.department
                                            }));
                                    },
                                    options: employees.map((emp)=>({
                                            value: emp.fullName,
                                            label: emp.fullName
                                        }))
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                    lineNumber: 409,
                                    columnNumber: 15
                                }, this),
                                employeeError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-xs text-red-600",
                                    children: employeeError
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                    lineNumber: 422,
                                    columnNumber: 33
                                }, this),
                                employeesError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-xs text-red-600",
                                    children: employeesError
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                    lineNumber: 423,
                                    columnNumber: 34
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                            lineNumber: 407,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-semibold text-[#0F172A] mb-2 block",
                                    children: "Miqdor ($)"
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                    lineNumber: 427,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    value: newExpense.amount,
                                    onChange: (e)=>setNewExpense((prev)=>({
                                                ...prev,
                                                amount: e.target.value
                                            })),
                                    className: "w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]",
                                    placeholder: "0",
                                    min: "0",
                                    step: "0.01",
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                    lineNumber: 428,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                            lineNumber: 426,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-semibold text-[#0F172A] mb-2 block",
                                    children: "Sana"
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                    lineNumber: 440,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "date",
                                    value: newExpense.date,
                                    onChange: (e)=>setNewExpense((prev)=>({
                                                ...prev,
                                                date: e.target.value
                                            })),
                                    className: "w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]",
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                    lineNumber: 441,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                            lineNumber: 439,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3 pt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: isSubmitting,
                                    className: "flex-1 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors font-semibold",
                                    children: "Saqlash"
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                    lineNumber: 450,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        setIsAddExpenseModalOpen(false);
                                        setNewExpense({
                                            title: "",
                                            category: "Energiya",
                                            department: "Ishlab chiqarish",
                                            amount: "",
                                            status: "Tasdiq kutmoqda",
                                            date: new Date().toISOString().split("T")[0],
                                            employeeName: ""
                                        });
                                        setEmployeeError(null);
                                        setModalError(null);
                                        setIsSubmitting(false);
                                    },
                                    className: "flex-1 px-4 py-2 bg-gray-200 text-[#0F172A] rounded-lg hover:bg-gray-300 transition-colors font-semibold",
                                    children: "Bekor qilish"
                                }, void 0, false, {
                                    fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                                    lineNumber: 457,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                            lineNumber: 449,
                            columnNumber: 11
                        }, this),
                        modalError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-red-600",
                            children: modalError
                        }, void 0, false, {
                            fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                            lineNumber: 479,
                            columnNumber: 26
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                    lineNumber: 319,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
                lineNumber: 299,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/owner-dashboard/expenses/page.tsx",
        lineNumber: 205,
        columnNumber: 5
    }, this);
}
_s(OwnerExpensesPage, "O/UHh+XIuPQCm8I5ElJaYZTCFg8=");
_c = OwnerExpensesPage;
var _c;
__turbopack_context__.k.register(_c, "OwnerExpensesPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>X
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const X = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("X", [
    [
        "path",
        {
            d: "M18 6 6 18",
            key: "1bl5f8"
        }
    ],
    [
        "path",
        {
            d: "m6 6 12 12",
            key: "d8bk6v"
        }
    ]
]);
;
 //# sourceMappingURL=x.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "X",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_956e7d52._.js.map