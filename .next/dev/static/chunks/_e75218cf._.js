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
"[project]/app/owner-dashboard/product-flow/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OwnerProductFlowPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$data$2d$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/data-table.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/styles/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const columns = [
    {
        key: "id",
        label: "Hujjat ID",
        sortable: true
    },
    {
        key: "product",
        label: "Mahsulot",
        sortable: true
    },
    {
        key: "direction",
        label: "Yo'nalish",
        sortable: true
    },
    {
        key: "quantity",
        label: "Hajm",
        sortable: true
    },
    {
        key: "from",
        label: "Qayerdan",
        sortable: false
    },
    {
        key: "to",
        label: "Qayerga",
        sortable: false
    },
    {
        key: "transport",
        label: "Transport",
        sortable: true
    },
    {
        key: "loggedAt",
        label: "Sana",
        sortable: true
    }
];
const numberFormatter = new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: 0
});
function OwnerProductFlowPage() {
    _s();
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        dateFrom: new Date(new Date().getFullYear(), 0, 1).toISOString().slice(0, 10),
        dateTo: new Date().toISOString().slice(0, 10),
        direction: "all",
        product: "all"
    });
    const [flows, setFlows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OwnerProductFlowPage.useEffect": ()=>{
            let cancelled = false;
            const fetchFlows = {
                "OwnerProductFlowPage.useEffect.fetchFlows": async ()=>{
                    setIsLoading(true);
                    setError(null);
                    try {
                        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["get"])("/inventory/flows", {
                            params: {
                                dateFrom: filters.dateFrom || undefined,
                                dateTo: filters.dateTo || undefined,
                                direction: filters.direction === "all" ? undefined : filters.direction,
                                product: filters.product === "all" ? undefined : filters.product
                            }
                        });
                        if (cancelled) return;
                        const items = Array.isArray(response) ? response : response.items ?? [];
                        setFlows(items);
                    } catch (err) {
                        if (cancelled) return;
                        if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"]) {
                            const backendMessage = err.data && err.data.message || err.message || "Mahsulot oqimlarini yuklashda xatolik yuz berdi";
                            setError(backendMessage);
                        } else {
                            setError("Mahsulot oqimlarini yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
                        }
                    } finally{
                        if (!cancelled) {
                            setIsLoading(false);
                        }
                    }
                }
            }["OwnerProductFlowPage.useEffect.fetchFlows"];
            fetchFlows();
            return ({
                "OwnerProductFlowPage.useEffect": ()=>{
                    cancelled = true;
                }
            })["OwnerProductFlowPage.useEffect"];
        }
    }["OwnerProductFlowPage.useEffect"], [
        filters.dateFrom,
        filters.dateTo,
        filters.direction,
        filters.product
    ]);
    const withinRange = (dateStr)=>{
        const current = new Date(dateStr).getTime();
        const from = filters.dateFrom ? new Date(filters.dateFrom).getTime() : undefined;
        const to = filters.dateTo ? new Date(filters.dateTo).getTime() : undefined;
        const afterFrom = typeof from === "number" ? current >= from : true;
        const beforeTo = typeof to === "number" ? current <= to : true;
        return afterFrom && beforeTo;
    };
    const filteredRecords = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "OwnerProductFlowPage.useMemo[filteredRecords]": ()=>flows.filter({
                "OwnerProductFlowPage.useMemo[filteredRecords]": (record)=>{
                    const matchesDirection = filters.direction === "all" || record.direction === filters.direction;
                    const matchesProduct = filters.product === "all" || record.product === filters.product;
                    return matchesDirection && matchesProduct && withinRange(record.loggedAt);
                }
            }["OwnerProductFlowPage.useMemo[filteredRecords]"])
    }["OwnerProductFlowPage.useMemo[filteredRecords]"], [
        flows,
        filters.direction,
        filters.product,
        filters.dateFrom,
        filters.dateTo
    ]);
    const stats = filteredRecords.reduce((acc, record)=>{
        if (record.direction === "Kirim") acc.inbound += record.quantity;
        if (record.direction === "Chiqim") acc.outbound += record.quantity;
        return acc;
    }, {
        inbound: 0,
        outbound: 0
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold text-[#0F172A]",
                        children: "Mahsulot kirim/chiqimi"
                    }, void 0, false, {
                        fileName: "[project]/app/owner-dashboard/product-flow/page.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[#64748B] mt-1",
                        children: "Silos va qadoqlash jarayonidagi barcha harakatlar"
                    }, void 0, false, {
                        fileName: "[project]/app/owner-dashboard/product-flow/page.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/owner-dashboard/product-flow/page.tsx",
                lineNumber: 117,
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
                                        fileName: "[project]/app/owner-dashboard/product-flow/page.tsx",
                                        lineNumber: 125,
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
                                        fileName: "[project]/app/owner-dashboard/product-flow/page.tsx",
                                        lineNumber: 126,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/owner-dashboard/product-flow/page.tsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-semibold text-[#0F172A] mb-2 block",
                                        children: "Tugash sanasi"
                                    }, void 0, false, {
                                        fileName: "[project]/app/owner-dashboard/product-flow/page.tsx",
                                        lineNumber: 134,
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
                                        fileName: "[project]/app/owner-dashboard/product-flow/page.tsx",
                                        lineNumber: 135,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/owner-dashboard/product-flow/page.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-semibold text-[#0F172A] mb-2 block",
                                        children: "Yo'nalish"
                                    }, void 0, false, {
                                        fileName: "[project]/app/owner-dashboard/product-flow/page.tsx",
                                        lineNumber: 143,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: filters.direction,
                                        onChange: (e)=>setFilters((prev)=>({
                                                    ...prev,
                                                    direction: e.target.value
                                                })),
                                        className: "w-full sm-select",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "all",
                                                children: "Barchasi"
                                            }, void 0, false, {
                                                fileName: "[project]/app/owner-dashboard/product-flow/page.tsx",
                                                lineNumber: 149,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Kirim",
                                                children: "Kirim"
                                            }, void 0, false, {
                                                fileName: "[project]/app/owner-dashboard/product-flow/page.tsx",
                                                lineNumber: 150,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Chiqim",
                                                children: "Chiqim"
                                            }, void 0, false, {
                                                fileName: "[project]/app/owner-dashboard/product-flow/page.tsx",
                                                lineNumber: 151,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/owner-dashboard/product-flow/page.tsx",
                                        lineNumber: 144,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/owner-dashboard/product-flow/page.tsx",
                                lineNumber: 142,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-semibold text-[#0F172A] mb-2 block",
                                        children: "Mahsulot"
                                    }, void 0, false, {
                                        fileName: "[project]/app/owner-dashboard/product-flow/page.tsx",
                                        lineNumber: 155,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: filters.product,
                                        onChange: (e)=>setFilters((prev)=>({
                                                    ...prev,
                                                    product: e.target.value
                                                })),
                                        className: "w-full sm-select",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "all",
                                                children: "Barchasi"
                                            }, void 0, false, {
                                                fileName: "[project]/app/owner-dashboard/product-flow/page.tsx",
                                                lineNumber: 161,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "M400",
                                                children: "M400"
                                            }, void 0, false, {
                                                fileName: "[project]/app/owner-dashboard/product-flow/page.tsx",
                                                lineNumber: 162,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "M500",
                                                children: "M500"
                                            }, void 0, false, {
                                                fileName: "[project]/app/owner-dashboard/product-flow/page.tsx",
                                                lineNumber: 163,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Sul'fatge chidamli",
                                                children: "Sul'fatge chidamli"
                                            }, void 0, false, {
                                                fileName: "[project]/app/owner-dashboard/product-flow/page.tsx",
                                                lineNumber: 164,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/owner-dashboard/product-flow/page.tsx",
                                        lineNumber: 156,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/owner-dashboard/product-flow/page.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/owner-dashboard/product-flow/page.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-end",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setFilters({
                                    dateFrom: "",
                                    dateTo: "",
                                    direction: "all",
                                    product: "all"
                                }),
                            className: "px-4 py-2 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] hover:bg-[#F1F5F9]",
                            children: "Filtrlarni tozalash"
                        }, void 0, false, {
                            fileName: "[project]/app/owner-dashboard/product-flow/page.tsx",
                            lineNumber: 169,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/owner-dashboard/product-flow/page.tsx",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/owner-dashboard/product-flow/page.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-lg p-6 card-shadow",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-semibold text-[#0F172A] mb-4",
                        children: "Harakatlar jurnali"
                    }, void 0, false, {
                        fileName: "[project]/app/owner-dashboard/product-flow/page.tsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-4 text-sm text-red-600",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/app/owner-dashboard/product-flow/page.tsx",
                        lineNumber: 189,
                        columnNumber: 19
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$data$2d$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DataTable"], {
                        columns: columns,
                        data: filteredRecords,
                        searchableFields: [
                            "id",
                            "product",
                            "direction",
                            "from",
                            "to",
                            "transport"
                        ],
                        renderCell: (row, col)=>{
                            if (col.key === "quantity") {
                                return `${numberFormatter.format(row[col.key])} ${row.unit}`;
                            }
                            return row[col.key];
                        },
                        footerTotals: filteredRecords.reduce((acc, record)=>{
                            acc.quantity += record.quantity;
                            acc.count += 1;
                            return acc;
                        }, {
                            quantity: 0,
                            count: 0
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/owner-dashboard/product-flow/page.tsx",
                        lineNumber: 190,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/owner-dashboard/product-flow/page.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/owner-dashboard/product-flow/page.tsx",
        lineNumber: 116,
        columnNumber: 5
    }, this);
}
_s(OwnerProductFlowPage, "j71fMVrAaOdM9Wnqw5yosn3ddkI=");
_c = OwnerProductFlowPage;
var _c;
__turbopack_context__.k.register(_c, "OwnerProductFlowPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_e75218cf._.js.map