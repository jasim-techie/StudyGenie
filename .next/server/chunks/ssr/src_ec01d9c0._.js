module.exports = {

"[project]/src/components/study-genie/Header.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Header": (()=>Header)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2d$circuit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BrainCircuit$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/brain-circuit.js [app-ssr] (ecmascript) <export default as BrainCircuit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-ssr] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-ssr] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$in$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogIn$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-in.js [app-ssr] (ecmascript) <export default as LogIn>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-ssr] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-ssr] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$help$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircleIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-help.js [app-ssr] (ecmascript) <export default as HelpCircleIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-ssr] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-user.js [app-ssr] (ecmascript) <export default as UserCircle>");
(()=>{
    const e = new Error("Cannot find module '@/components/ui/button'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/components/ui/sheet'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
const navLinks = [
    {
        href: "/",
        label: "Study Plan AI",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"]
    },
    {
        href: "/?section=quiz-maker",
        label: "Quiz Maker",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$help$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircleIcon$3e$__["HelpCircleIcon"],
        sectionId: "quiz-maker"
    },
    {
        href: "/?section=key-points",
        label: "Key Points",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"],
        sectionId: "key-points"
    },
    {
        href: "/dashboard/student",
        label: "Student Dashboard",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"]
    },
    {
        href: "/dashboard/parent",
        label: "Parent Dashboard",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircle$3e$__["UserCircle"]
    }
];
function Header() {
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const { theme, setTheme, resolvedTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>setMounted(true), []);
    const toggleTheme = ()=>{
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };
    const handleDesktopLinkClick = (href, sectionId)=>{
        if (sectionId && href.startsWith("/?section=")) {
            router.push(href); // This will trigger useEffect in HomePage to scroll
        } else {
            router.push(href);
        }
    };
    const handleMobileLinkClick = (href, sectionId)=>{
        if (sectionId && href.startsWith("/?section=")) {
            router.push(href);
        } else {
            router.push(href);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-50 py-4 px-4 sm:px-6 border-b shadow-sm bg-card/95 backdrop-blur-lg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto flex items-center justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    className: "flex items-center gap-2 text-primary hover:text-primary/90 transition-colors",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2d$circuit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BrainCircuit$3e$__["BrainCircuit"], {
                            className: "h-7 w-7 sm:h-8 sm:w-8"
                        }, void 0, false, {
                            fileName: "[project]/src/components/study-genie/Header.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-xl sm:text-2xl font-headline font-bold",
                            children: "StudyGenie AI"
                        }, void 0, false, {
                            fileName: "[project]/src/components/study-genie/Header.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/study-genie/Header.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "hidden md:flex items-center gap-1",
                            children: navLinks.slice(0, 3).map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                                    variant: "ghost",
                                    asChild: true,
                                    size: "sm",
                                    onClick: ()=>handleDesktopLinkClick(link.href, link.sectionId),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: link.href,
                                        className: "flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(link.icon, {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/study-genie/Header.tsx",
                                                lineNumber: 61,
                                                columnNumber: 19
                                            }, this),
                                            " ",
                                            link.label
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/study-genie/Header.tsx",
                                        lineNumber: 60,
                                        columnNumber: 17
                                    }, this)
                                }, link.label, false, {
                                    fileName: "[project]/src/components/study-genie/Header.tsx",
                                    lineNumber: 59,
                                    columnNumber: 16
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/study-genie/Header.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this),
                        mounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                            variant: "ghost",
                            size: "icon",
                            onClick: toggleTheme,
                            "aria-label": "Toggle theme",
                            className: "h-9 w-9 sm:h-10 sm:w-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                                    className: "h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/study-genie/Header.tsx",
                                    lineNumber: 75,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                                    className: "absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/study-genie/Header.tsx",
                                    lineNumber: 76,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "sr-only",
                                    children: "Toggle theme"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/study-genie/Header.tsx",
                                    lineNumber: 77,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/study-genie/Header.tsx",
                            lineNumber: 68,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/login",
                            passHref: true,
                            className: "hidden md:block",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                                variant: "outline",
                                size: "sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$in$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogIn$3e$__["LogIn"], {
                                        className: "mr-2 h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/study-genie/Header.tsx",
                                        lineNumber: 82,
                                        columnNumber: 15
                                    }, this),
                                    "Login / Sign Up"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/study-genie/Header.tsx",
                                lineNumber: 81,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/study-genie/Header.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "md:hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Sheet, {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SheetTrigger, {
                                        asChild: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                                            variant: "ghost",
                                            size: "icon",
                                            className: "h-9 w-9 sm:h-10 sm:w-10",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                                    className: "h-5 w-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/study-genie/Header.tsx",
                                                    lineNumber: 91,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "sr-only",
                                                    children: "Open menu"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/study-genie/Header.tsx",
                                                    lineNumber: 92,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/study-genie/Header.tsx",
                                            lineNumber: 90,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/study-genie/Header.tsx",
                                        lineNumber: 89,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SheetContent, {
                                        side: "right",
                                        className: "w-[280px] sm:w-[320px] p-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col h-full",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-6 border-b",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SheetClose, {
                                                        asChild: true,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                            href: "/",
                                                            className: "flex items-center gap-2 text-primary",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2d$circuit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BrainCircuit$3e$__["BrainCircuit"], {
                                                                    className: "h-7 w-7"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/study-genie/Header.tsx",
                                                                    lineNumber: 100,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                    className: "text-xl font-headline font-bold",
                                                                    children: "StudyGenie AI"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/study-genie/Header.tsx",
                                                                    lineNumber: 101,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/study-genie/Header.tsx",
                                                            lineNumber: 99,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/study-genie/Header.tsx",
                                                        lineNumber: 98,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/study-genie/Header.tsx",
                                                    lineNumber: 97,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                                    className: "flex-grow p-4 space-y-2",
                                                    children: navLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SheetClose, {
                                                            asChild: true,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                href: link.href,
                                                                onClick: ()=>handleMobileLinkClick(link.href, link.sectionId),
                                                                className: "flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors text-base",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(link.icon, {
                                                                        className: "h-5 w-5 text-muted-foreground"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/study-genie/Header.tsx",
                                                                        lineNumber: 113,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    link.label
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/study-genie/Header.tsx",
                                                                lineNumber: 108,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, link.label, false, {
                                                            fileName: "[project]/src/components/study-genie/Header.tsx",
                                                            lineNumber: 107,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/study-genie/Header.tsx",
                                                    lineNumber: 105,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-4 border-t",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SheetClose, {
                                                        asChild: true,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                            href: "/login",
                                                            passHref: true,
                                                            className: "w-full",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                                                                variant: "outline",
                                                                className: "w-full",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$in$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogIn$3e$__["LogIn"], {
                                                                        className: "mr-2 h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/study-genie/Header.tsx",
                                                                        lineNumber: 123,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    "Login / Sign Up"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/study-genie/Header.tsx",
                                                                lineNumber: 122,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/study-genie/Header.tsx",
                                                            lineNumber: 121,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/study-genie/Header.tsx",
                                                        lineNumber: 120,
                                                        columnNumber: 22
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/study-genie/Header.tsx",
                                                    lineNumber: 119,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/study-genie/Header.tsx",
                                            lineNumber: 96,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/study-genie/Header.tsx",
                                        lineNumber: 95,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/study-genie/Header.tsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/study-genie/Header.tsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/study-genie/Header.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/study-genie/Header.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/study-genie/Header.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/study-genie/QuizGenerator.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "QuizGenerator": (()=>QuizGenerator)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/components/ui/button'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/ui/card'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/ui/label'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/ui/textarea'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/hooks/use-toast'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$question$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileQuestion$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-question.js [app-ssr] (ecmascript) <export default as FileQuestion>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-ssr] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
const MAX_WORDS = 3000;
function QuizGenerator({ onQuizGenerated, isLoading, setIsLoading, createQuizAction }) {
    const [notesText, setNotesText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [wordCount, setWordCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const { toast } = useToast();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const words = notesText.split(/\s+/).filter(Boolean);
        setWordCount(words.length);
        if (words.length > MAX_WORDS) {
            setError(`Word limit exceeded. Maximum ${MAX_WORDS} words allowed.`);
        } else {
            setError(null);
        }
    }, [
        notesText
    ]);
    const handleTextChange = (event)=>{
        setNotesText(event.target.value);
    };
    const handleSubmit = async ()=>{
        if (!notesText.trim()) {
            setError("Please paste your study notes.");
            toast({
                title: "Empty Notes",
                description: "Please paste some text to generate a quiz.",
                variant: "destructive"
            });
            return;
        }
        if (wordCount > MAX_WORDS) {
            setError(`Word limit exceeded. Maximum ${MAX_WORDS} words allowed.`);
            toast({
                title: "Word Limit Exceeded",
                description: `Please reduce your notes to ${MAX_WORDS} words or less.`,
                variant: "destructive"
            });
            return;
        }
        setIsLoading(true);
        setError(null);
        // For now, let's default to 5 questions. This could be a user input later.
        const numQuestions = 5;
        try {
            const result = await createQuizAction(notesText, numQuestions);
            if (result.error) {
                throw new Error(result.error);
            }
            if (result.quizData?.quiz) {
                onQuizGenerated(result.quizData.quiz);
                toast({
                    title: "Quiz Generated!",
                    description: "Your quiz is ready to be taken."
                });
            } else {
                throw new Error("Quiz data not found in response.");
            }
        } catch (err) {
            console.error("Error generating quiz:", err);
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
            toast({
                title: "Quiz Generation Failed",
                description: errorMessage,
                variant: "destructive"
            });
            setError(`Failed to generate quiz: ${errorMessage}`);
        } finally{
            setIsLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
        className: "shadow-lg w-full max-w-2xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardHeader, {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardTitle, {
                        className: "font-headline text-2xl flex items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$question$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileQuestion$3e$__["FileQuestion"], {
                                className: "mr-2 h-6 w-6 text-primary"
                            }, void 0, false, {
                                fileName: "[project]/src/components/study-genie/QuizGenerator.tsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this),
                            "Paste Your Study Notes"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/study-genie/QuizGenerator.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardDescription, {
                        children: [
                            "Enter your notes, textbook content, or copied material below (max ",
                            MAX_WORDS,
                            " words). Our AI will generate a quiz to help you review."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/study-genie/QuizGenerator.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/study-genie/QuizGenerator.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardContent, {
                className: "space-y-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Label, {
                            htmlFor: "notes-input",
                            className: "text-base font-medium",
                            children: "Your Study Notes"
                        }, void 0, false, {
                            fileName: "[project]/src/components/study-genie/QuizGenerator.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Textarea, {
                            id: "notes-input",
                            value: notesText,
                            onChange: handleTextChange,
                            placeholder: "Paste your notes here...",
                            rows: 15,
                            className: "mt-2 text-base min-h-[200px] resize-y"
                        }, void 0, false, {
                            fileName: "[project]/src/components/study-genie/QuizGenerator.tsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-2 flex justify-between items-center text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: wordCount > MAX_WORDS ? "text-destructive" : "text-muted-foreground",
                                    children: [
                                        "Word Count: ",
                                        wordCount,
                                        " / ",
                                        MAX_WORDS
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/study-genie/QuizGenerator.tsx",
                                    lineNumber: 105,
                                    columnNumber: 13
                                }, this),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-destructive",
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/src/components/study-genie/QuizGenerator.tsx",
                                    lineNumber: 108,
                                    columnNumber: 23
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/study-genie/QuizGenerator.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/study-genie/QuizGenerator.tsx",
                    lineNumber: 94,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/study-genie/QuizGenerator.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardFooter, {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                    onClick: handleSubmit,
                    disabled: isLoading || wordCount === 0 || wordCount > MAX_WORDS,
                    className: "w-full text-base py-3",
                    children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                className: "mr-2 h-5 w-5 animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/src/components/study-genie/QuizGenerator.tsx",
                                lineNumber: 120,
                                columnNumber: 15
                            }, this),
                            "Generating Quiz..."
                        ]
                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                className: "mr-2 h-5 w-5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/study-genie/QuizGenerator.tsx",
                                lineNumber: 125,
                                columnNumber: 15
                            }, this),
                            "Generate Quiz (",
                            wordCount > 0 && wordCount <= MAX_WORDS ? '5 Questions' : '...',
                            ")"
                        ]
                    }, void 0, true)
                }, void 0, false, {
                    fileName: "[project]/src/components/study-genie/QuizGenerator.tsx",
                    lineNumber: 113,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/study-genie/QuizGenerator.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/study-genie/QuizGenerator.tsx",
        lineNumber: 82,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/study-genie/QuizDisplay.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "QuizDisplay": (()=>QuizDisplay)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/components/ui/button'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/ui/card'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/ui/radio-group'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/ui/label'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/ui/progress'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/ui/alert'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-ssr] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$help$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-help.js [app-ssr] (ecmascript) <export default as HelpCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trophy.js [app-ssr] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-ssr] (ecmascript) <export default as RotateCcw>");
(()=>{
    const e = new Error("Cannot find module '@/lib/utils'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
"use client";
;
;
;
;
;
;
;
;
;
;
function QuizDisplay({ quizJson, onRetakeQuiz }) {
    const [quiz, setQuiz] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [userAnswers, setUserAnswers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [showResults, setShowResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [score, setScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            const parsedQuiz = JSON.parse(quizJson);
            const quizWithIds = {
                ...parsedQuiz,
                questions: parsedQuiz.questions.map((q, index)=>({
                        ...q,
                        id: q.id || `q-${index}` // Corrected line: removed backslash
                    }))
            };
            setQuiz(quizWithIds);
            setCurrentQuestionIndex(0);
            setUserAnswers({});
            setShowResults(false);
            setScore(0);
        } catch (error) {
            console.error("Failed to parse quiz JSON:", error);
            setQuiz(null);
        }
    }, [
        quizJson
    ]);
    const handleAnswerSelect = (questionId, answer)=>{
        setUserAnswers((prev)=>({
                ...prev,
                [questionId]: answer
            }));
    };
    const handleNextQuestion = ()=>{
        if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex((prev)=>prev + 1);
        }
    };
    const handlePrevQuestion = ()=>{
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev)=>prev - 1);
        }
    };
    const handleSubmitQuiz = ()=>{
        if (!quiz) return;
        let calculatedScore = 0;
        quiz.questions.forEach((q)=>{
            if (userAnswers[q.id] === q.correctAnswer) {
                calculatedScore++;
            }
        });
        setScore(calculatedScore);
        setShowResults(true);
    };
    if (!quiz) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Alert, {
            variant: "destructive",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AlertTitle, {
                    children: "Error Loading Quiz"
                }, void 0, false, {
                    fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                    lineNumber: 80,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AlertDescription, {
                    children: "There was an issue loading the quiz. Please try generating it again."
                }, void 0, false, {
                    fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                    lineNumber: 81,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
            lineNumber: 78,
            columnNumber: 7
        }, this);
    }
    // Handle case where there are no questions
    if (quiz.questions.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Alert, {
            variant: "destructive",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AlertTitle, {
                    children: "Empty Quiz"
                }, void 0, false, {
                    fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AlertDescription, {
                    children: "This quiz has no questions. Please try generating it again with different notes."
                }, void 0, false, {
                    fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
            lineNumber: 89,
            columnNumber: 7
        }, this);
    }
    const currentQuestion = quiz.questions[currentQuestionIndex];
    const progress = quiz.questions.length > 0 ? (currentQuestionIndex + 1) / quiz.questions.length * 100 : 0;
    if (showResults) {
        const percentage = quiz.questions.length > 0 ? score / quiz.questions.length * 100 : 0;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
            className: "shadow-lg w-full max-w-2xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardHeader, {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardTitle, {
                            className: "font-headline text-2xl flex items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                    className: "mr-2 h-6 w-6 text-yellow-500"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                                    lineNumber: 106,
                                    columnNumber: 13
                                }, this),
                                "Quiz Results: ",
                                quiz.title
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                            lineNumber: 105,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardDescription, {
                            children: [
                                "You scored ",
                                score,
                                " out of ",
                                quiz.questions.length,
                                " (",
                                percentage.toFixed(1),
                                "%)"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                            lineNumber: 109,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                    lineNumber: 104,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardContent, {
                    className: "space-y-4",
                    children: quiz.questions.map((q, index)=>{
                        const isCorrect = userAnswers[q.id] === q.correctAnswer;
                        const cardClasses = cn("p-4 rounded-md border", isCorrect ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10");
                        const answerClasses = cn(isCorrect ? 'text-green-700' : 'text-red-700');
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: cardClasses,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-medium",
                                    children: [
                                        index + 1,
                                        ". ",
                                        q.questionText
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                                    lineNumber: 122,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm mt-1",
                                    children: [
                                        "Your answer: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: answerClasses,
                                            children: userAnswers[q.id] || "Not answered"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                                            lineNumber: 123,
                                            columnNumber: 58
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                                    lineNumber: 123,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm",
                                    children: [
                                        "Correct answer: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-green-700",
                                            children: q.correctAnswer
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                                            lineNumber: 124,
                                            columnNumber: 56
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                                    lineNumber: 124,
                                    columnNumber: 17
                                }, this),
                                q.explanation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs mt-1 text-muted-foreground",
                                    children: [
                                        "Explanation: ",
                                        q.explanation
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                                    lineNumber: 125,
                                    columnNumber: 35
                                }, this)
                            ]
                        }, q.id, true, {
                            fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                            lineNumber: 121,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                    lineNumber: 111,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardFooter, {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                        onClick: onRetakeQuiz,
                        variant: "outline",
                        className: "w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                className: "mr-2 h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                                lineNumber: 132,
                                columnNumber: 13
                            }, this),
                            "Retake Quiz or Generate New"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                        lineNumber: 131,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                    lineNumber: 130,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
            lineNumber: 103,
            columnNumber: 7
        }, this);
    }
    // This part will only be reached if quiz exists, has questions, and showResults is false
    if (!currentQuestion) {
        // This should ideally not be reached if the empty quiz check above works, but as a safeguard:
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Alert, {
            variant: "destructive",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                    lineNumber: 145,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AlertTitle, {
                    children: "Quiz Error"
                }, void 0, false, {
                    fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                    lineNumber: 146,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AlertDescription, {
                    children: "Could not load the current question. Please try generating the quiz again."
                }, void 0, false, {
                    fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                    lineNumber: 147,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
            lineNumber: 144,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
        className: "shadow-lg w-full max-w-2xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardHeader, {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardTitle, {
                        className: "font-headline text-2xl flex items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$help$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"], {
                                className: "mr-2 h-6 w-6 text-primary"
                            }, void 0, false, {
                                fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                                lineNumber: 156,
                                columnNumber: 11
                            }, this),
                            quiz.title
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                        lineNumber: 155,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardDescription, {
                        children: [
                            "Question ",
                            currentQuestionIndex + 1,
                            " of ",
                            quiz.questions.length
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Progress, {
                        value: progress,
                        className: "w-full mt-2 h-2"
                    }, void 0, false, {
                        fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                        lineNumber: 160,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardContent, {
                className: "space-y-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg font-medium mb-4",
                            children: currentQuestion.questionText
                        }, void 0, false, {
                            fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                            lineNumber: 164,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioGroup, {
                            value: userAnswers[currentQuestion.id] || "",
                            onValueChange: (value)=>handleAnswerSelect(currentQuestion.id, value),
                            className: "space-y-2",
                            children: currentQuestion.options.map((option, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Label, {
                                    htmlFor: `\${currentQuestion.id}-option-\${index}`,
                                    className: "flex items-center space-x-3 p-3 border rounded-md hover:bg-secondary/50 cursor-pointer transition-colors has-[:checked]:bg-primary/10 has-[:checked]:border-primary",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioGroupItem, {
                                            value: option,
                                            id: `\${currentQuestion.id}-option-\${index}`
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                                            lineNumber: 176,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: option
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                                            lineNumber: 177,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                                    lineNumber: 171,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                            lineNumber: 165,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                    lineNumber: 163,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                lineNumber: 162,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardFooter, {
                className: "flex justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                        onClick: handlePrevQuestion,
                        disabled: currentQuestionIndex === 0,
                        variant: "outline",
                        children: "Previous"
                    }, void 0, false, {
                        fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this),
                    currentQuestionIndex < quiz.questions.length - 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                        onClick: handleNextQuestion,
                        children: "Next"
                    }, void 0, false, {
                        fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                        lineNumber: 188,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                        onClick: handleSubmitQuiz,
                        className: "bg-accent hover:bg-accent/90 text-accent-foreground",
                        children: "Submit Quiz"
                    }, void 0, false, {
                        fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                        lineNumber: 190,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
                lineNumber: 183,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/study-genie/QuizDisplay.tsx",
        lineNumber: 153,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/app/data:6e15b8 [app-ssr] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"6087b78d3634643498292810c6846e60dc2569e551":"handleGenerateKeyPoints"},"src/app/actions.ts",""] */ __turbopack_context__.s({
    "handleGenerateKeyPoints": (()=>handleGenerateKeyPoints)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var handleGenerateKeyPoints = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("6087b78d3634643498292810c6846e60dc2569e551", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "handleGenerateKeyPoints"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgZ2VuZXJhdGVTdHVkeVNjaGVkdWxlLCBHZW5lcmF0ZVN0dWR5U2NoZWR1bGVJbnB1dCB9IGZyb20gXCJAL2FpL2Zsb3dzL2dlbmVyYXRlLXN0dWR5LXNjaGVkdWxlXCI7XG5pbXBvcnQgeyBzdWdnZXN0TGVhcm5pbmdSZXNvdXJjZXMsIFN1Z2dlc3RMZWFybmluZ1Jlc291cmNlc0lucHV0IH0gZnJvbSBcIkAvYWkvZmxvd3Mvc3VnZ2VzdC1sZWFybmluZy1yZXNvdXJjZXNcIjtcbmltcG9ydCB7IGNyZWF0ZVF1aXpGcm9tTm90ZXMsIENyZWF0ZVF1aXpGcm9tTm90ZXNJbnB1dCB9IGZyb20gXCJAL2FpL2Zsb3dzL2NyZWF0ZS1xdWl6LWZyb20tbm90ZXNcIjtcbmltcG9ydCB7IGdlbmVyYXRlVG9waWNJbWFnZSB9IGZyb20gXCJAL2FpL2Zsb3dzL2dlbmVyYXRlLXRvcGljLWltYWdlLWZsb3dcIjtcbmltcG9ydCB7IGV4dHJhY3RUZXh0RnJvbUltYWdlLCBFeHRyYWN0VGV4dEZyb21JbWFnZUlucHV0IH0gZnJvbSBcIkAvYWkvZmxvd3MvZXh0cmFjdC10ZXh0LWZyb20taW1hZ2UtZmxvd1wiO1xuaW1wb3J0IHsgZ2VuZXJhdGVLZXlQb2ludHMgYXMgZ2VuZXJhdGVLZXlQb2ludHNGbG93LCBHZW5lcmF0ZUtleVBvaW50c0lucHV0IGFzIEdlbmVyYXRlS2V5UG9pbnRzRmxvd0lucHV0IH0gZnJvbSBcIkAvYWkvZmxvd3MvZ2VuZXJhdGVLZXlQb2ludHNGbG93XCI7XG5pbXBvcnQgdHlwZSB7IEdlbmVyYXRlZFN0dWR5U2NoZWR1bGVPdXRwdXQsIFN1Z2dlc3RlZExlYXJuaW5nUmVzb3VyY2VzT3V0cHV0LCBDcmVhdGVkUXVpek91dHB1dCwgR2VuZXJhdGVLZXlQb2ludHNPdXRwdXQsIFN0dWR5UGxhbkZvcm1WYWx1ZXMgfSBmcm9tIFwiQC9saWIvdHlwZXNcIjtcbi8vIGltcG9ydCB7IGV4dHJhY3RUZXh0RnJvbVBkZiB9IGZyb20gXCJAL2FpL2Zsb3dzL2V4dHJhY3QtdGV4dC1mcm9tLXBkZi1mbG93XCI7IC8vIE5vdCBjdXJyZW50bHkgdXNlZCBkaXJlY3RseSBieSBvdGhlciBhY3Rpb25zXG5cbmFzeW5jIGZ1bmN0aW9uIGZpbGVUb0RhdGFVcmkoZmlsZTogRmlsZSk6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IGFycmF5QnVmZmVyID0gYXdhaXQgZmlsZS5hcnJheUJ1ZmZlcigpO1xuICBjb25zdCBidWZmZXIgPSBCdWZmZXIuZnJvbShhcnJheUJ1ZmZlcik7XG4gIHJldHVybiBgZGF0YToke2ZpbGUudHlwZX07YmFzZTY0LCR7YnVmZmVyLnRvU3RyaW5nKCdiYXNlNjQnKX1gO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlSW1hZ2VVcGxvYWRGb3JUb3BpY0V4dHJhY3Rpb24oXG4gIGltYWdlRGF0YVVyaTogc3RyaW5nXG4pOiBQcm9taXNlPHsgZXh0cmFjdGVkVGV4dDogc3RyaW5nIHwgbnVsbDsgZXJyb3I/OiBzdHJpbmcgfT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGlucHV0OiBFeHRyYWN0VGV4dEZyb21JbWFnZUlucHV0ID0geyBpbWFnZURhdGFVcmkgfTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleHRyYWN0VGV4dEZyb21JbWFnZShpbnB1dCk7XG4gICAgcmV0dXJuIHsgZXh0cmFjdGVkVGV4dDogcmVzdWx0LmV4dHJhY3RlZFRleHQgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZXh0cmFjdGluZyB0ZXh0IGZyb20gaW1hZ2U6XCIsIGVycm9yKTtcbiAgICByZXR1cm4geyBleHRyYWN0ZWRUZXh0OiBudWxsLCBlcnJvcjogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBcIkZhaWxlZCB0byBleHRyYWN0IHRleHQgZnJvbSBpbWFnZS5cIiB9O1xuICB9XG59XG5cbmludGVyZmFjZSBIYW5kbGVHZW5lcmF0ZVN0dWR5UGxhbkRhdGEgZXh0ZW5kcyBPbWl0PFN0dWR5UGxhbkZvcm1WYWx1ZXMsICdleGFtRGF0ZScgfCAnc3RhcnREYXRlJz4ge1xuICBleGFtRGF0ZTogc3RyaW5nO1xuICBzdGFydERhdGU6IHN0cmluZztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZUdlbmVyYXRlU3R1ZHlQbGFuKFxuICBkYXRhOiBIYW5kbGVHZW5lcmF0ZVN0dWR5UGxhbkRhdGFcbik6IFByb21pc2U8eyBzY2hlZHVsZTogR2VuZXJhdGVkU3R1ZHlTY2hlZHVsZU91dHB1dCB8IG51bGw7IHJlc291cmNlczogU3VnZ2VzdGVkTGVhcm5pbmdSZXNvdXJjZXNPdXRwdXQgfCBudWxsOyBlcnJvcj86IHN0cmluZyB9PiB7XG4gIHRyeSB7XG4gICAgY29uc3Qgc3ViamVjdE5hbWVzID0gZGF0YS5zdWJqZWN0cy5tYXAocyA9PiBzLm5hbWUpO1xuICAgIGNvbnN0IGFsbFRvcGljVGV4dHM6IHN0cmluZ1tdID0gZGF0YS5zdWJqZWN0cy5yZWR1Y2UoKGFjYywgcykgPT4ge1xuICAgICAgICBpZiAocy50b3BpY3MgJiYgcy50b3BpY3MudHJpbSgpICE9PSBcIlwiKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRpdmlkdWFsVG9waWNzID0gcy50b3BpY3Muc3BsaXQoL1tcXG4sXSsvKS5tYXAodG9waWMgPT4gdG9waWMudHJpbSgpKS5maWx0ZXIodG9waWMgPT4gdG9waWMgIT09IFwiXCIpO1xuICAgICAgICAgICAgYWNjLnB1c2goLi4uaW5kaXZpZHVhbFRvcGljcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBbXSBhcyBzdHJpbmdbXSk7XG5cbiAgICBsZXQgdG9waWNJbWFnZXNGb3JTY2hlZHVsZTogc3RyaW5nW10gPSBbXTtcblxuICAgIGlmIChhbGxUb3BpY1RleHRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgdW5pcXVlVG9waWNUZXh0c0ZvckltYWdlR2VuID0gQXJyYXkuZnJvbShuZXcgU2V0KGFsbFRvcGljVGV4dHMpKTsgXG5cbiAgICAgICAgY29uc3QgZ2VuZXJhdGVkVG9waWNJbWFnZVByb21pc2VzID0gdW5pcXVlVG9waWNUZXh0c0ZvckltYWdlR2VuLm1hcChhc3luYyAodG9waWNUZXh0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbWFnZUdlbklucHV0VGV4dCA9IHRvcGljVGV4dC5sZW5ndGggPiAxMDAgPyB0b3BpY1RleHQuc3Vic3RyaW5nKDAsIDk3KSArIFwiLi4uXCIgOiB0b3BpY1RleHQ7XG4gICAgICAgICAgICAgaWYgKGltYWdlR2VuSW5wdXRUZXh0KSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1hZ2VSZXN1bHQgPSBhd2FpdCBnZW5lcmF0ZVRvcGljSW1hZ2UoeyB0b3BpY1RleHQ6IGltYWdlR2VuSW5wdXRUZXh0IH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW1hZ2VSZXN1bHQuaW1hZ2VEYXRhVXJpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGltZ0Vycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYEZhaWxlZCB0byBnZW5lcmF0ZSBpbWFnZSBmb3IgdG9waWMgXCIke3RvcGljVGV4dH1cIjpgLCBpbWdFcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDsgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBnZW5lcmF0ZWRJbWFnZXMgPSAoYXdhaXQgUHJvbWlzZS5hbGwoZ2VuZXJhdGVkVG9waWNJbWFnZVByb21pc2VzKSkuZmlsdGVyKGltZyA9PiBpbWcgIT09IG51bGwpIGFzIHN0cmluZ1tdO1xuICAgICAgICB0b3BpY0ltYWdlc0ZvclNjaGVkdWxlLnB1c2goLi4uZ2VuZXJhdGVkSW1hZ2VzKTtcbiAgICB9XG4gICAgXG4gICAgY29uc3Qgc2NoZWR1bGVJbnB1dFRvcGljcyA9IGFsbFRvcGljVGV4dHMubGVuZ3RoID4gMCA/IEFycmF5LmZyb20obmV3IFNldChhbGxUb3BpY1RleHRzKSkgOiBbXCJHZW5lcmFsIFN0dWRpZXNcIl07XG5cbiAgICBjb25zdCBzY2hlZHVsZUlucHV0OiBHZW5lcmF0ZVN0dWR5U2NoZWR1bGVJbnB1dCA9IHtcbiAgICAgIHN1YmplY3RzOiBzdWJqZWN0TmFtZXMsXG4gICAgICB0b3BpY3M6IHNjaGVkdWxlSW5wdXRUb3BpY3MsIFxuICAgICAgZXhhbURhdGU6IGRhdGEuZXhhbURhdGUsXG4gICAgICBzdGFydERhdGU6IGRhdGEuc3RhcnREYXRlLFxuICAgICAgYXZhaWxhYmxlU3R1ZHlIb3Vyc1BlckRheTogZGF0YS5hdmFpbGFibGVTdHVkeUhvdXJzUGVyRGF5LFxuICAgICAgdG9waWNJbWFnZUlucHV0czogdG9waWNJbWFnZXNGb3JTY2hlZHVsZS5sZW5ndGggPiAwID8gdG9waWNJbWFnZXNGb3JTY2hlZHVsZSA6IHVuZGVmaW5lZCxcbiAgICB9O1xuICAgIGNvbnN0IHNjaGVkdWxlID0gYXdhaXQgZ2VuZXJhdGVTdHVkeVNjaGVkdWxlKHNjaGVkdWxlSW5wdXQpO1xuXG4gICAgY29uc3QgcmVzb3VyY2VzSW5wdXQ6IFN1Z2dlc3RMZWFybmluZ1Jlc291cmNlc0lucHV0ID0ge1xuICAgICAgc3ViamVjdDogc3ViamVjdE5hbWVzLmpvaW4oJywgJykgfHwgXCJHZW5lcmFsIFN0dWRpZXNcIiwgXG4gICAgICB0b3BpY3M6IHNjaGVkdWxlSW5wdXRUb3BpY3MsIFxuICAgIH07XG4gICAgY29uc3QgcmVzb3VyY2VzID0gYXdhaXQgc3VnZ2VzdExlYXJuaW5nUmVzb3VyY2VzKHJlc291cmNlc0lucHV0KTtcbiAgICBcbiAgICByZXR1cm4geyBzY2hlZHVsZSwgcmVzb3VyY2VzIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGdlbmVyYXRpbmcgc3R1ZHkgcGxhbjpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IHNjaGVkdWxlOiBudWxsLCByZXNvdXJjZXM6IG51bGwsIGVycm9yOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFwiRmFpbGVkIHRvIGdlbmVyYXRlIHN0dWR5IHBsYW4uXCIgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlQ3JlYXRlUXVpeihcbiAgbm90ZXNUZXh0OiBzdHJpbmcsXG4gIG51bVF1ZXN0aW9uczogbnVtYmVyID0gNVxuKTogUHJvbWlzZTx7IHF1aXpEYXRhOiBDcmVhdGVkUXVpek91dHB1dCB8IG51bGw7IGVycm9yPzogc3RyaW5nIH0+IHtcbiAgdHJ5IHtcbiAgICBpZiAoIW5vdGVzVGV4dCB8fCBub3Rlc1RleHQudHJpbSgpID09PSBcIlwiKSB7XG4gICAgICAgIHJldHVybiB7IHF1aXpEYXRhOiBudWxsLCBlcnJvcjogXCJOb3RlcyB0ZXh0IGNhbm5vdCBiZSBlbXB0eS5cIiB9O1xuICAgIH1cbiAgICBcbiAgICBjb25zdCBxdWl6SW5wdXQ6IENyZWF0ZVF1aXpGcm9tTm90ZXNJbnB1dCA9IHsgbm90ZXNUZXh0LCBudW1RdWVzdGlvbnMgfTtcbiAgICBjb25zdCBxdWl6RGF0YSA9IGF3YWl0IGNyZWF0ZVF1aXpGcm9tTm90ZXMocXVpeklucHV0KTtcbiAgICByZXR1cm4geyBxdWl6RGF0YSB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnN0IHR5cGVkRXJyb3IgPSBlcnJvciBhcyBFcnJvcjtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgY3JlYXRpbmcgcXVpejpcIiwgdHlwZWRFcnJvcik7XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gdHlwZWRFcnJvci5tZXNzYWdlIHx8IFwiRmFpbGVkIHRvIGNyZWF0ZSBxdWl6IGR1ZSB0byBhbiB1bmV4cGVjdGVkIGVycm9yLlwiO1xuICAgIGlmIChlcnJvck1lc3NhZ2UuaW5jbHVkZXMoXCI0MjlcIikgfHwgZXJyb3JNZXNzYWdlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoXCJxdW90YVwiKSkge1xuICAgICAgcmV0dXJuIHsgcXVpekRhdGE6IG51bGwsIGVycm9yOiBcIlF1aXogZ2VuZXJhdGlvbiBmYWlsZWQgZHVlIHRvIEFQSSByYXRlIGxpbWl0cy4gUGxlYXNlIHRyeSBhZ2FpbiBsYXRlciBvciB3aXRoIHNob3J0ZXIgbm90ZXMuXCIgfTtcbiAgICB9XG4gICAgaWYgKGVycm9yTWVzc2FnZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFwidG9rZW4gY291bnQgZXhjZWVkc1wiKSB8fCBlcnJvck1lc3NhZ2UudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcImlucHV0IHRva2VuIGNvdW50XCIpIHx8IGVycm9yTWVzc2FnZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFwibWF4aW11bSBudW1iZXIgb2YgdG9rZW5zIGFsbG93ZWRcIikpIHtcbiAgICAgIHJldHVybiB7IHF1aXpEYXRhOiBudWxsLCBlcnJvcjogXCJZb3VyIG5vdGVzIGFyZSB0b28gbG9uZyBmb3IgdGhlIEFJIHRvIHByb2Nlc3MuIFBsZWFzZSBzaG9ydGVuIHRoZW0gYW5kIHRyeSBhZ2Fpbi5cIiB9O1xuICAgIH1cbiAgICByZXR1cm4geyBxdWl6RGF0YTogbnVsbCwgZXJyb3I6IGVycm9yTWVzc2FnZSB9O1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoYW5kbGVHZW5lcmF0ZUtleVBvaW50cyhcbiAgYW5zd2VyQ29udGVudDogc3RyaW5nLFxuICBtYXJrV2VpZ2h0YWdlOiBudW1iZXJcbik6IFByb21pc2U8eyBrZXlQb2ludHNEYXRhOiBHZW5lcmF0ZUtleVBvaW50c091dHB1dCB8IG51bGw7IGVycm9yPzogc3RyaW5nIH0+IHtcbiAgdHJ5IHtcbiAgICBpZiAoIWFuc3dlckNvbnRlbnQgfHwgYW5zd2VyQ29udGVudC50cmltKCkgPT09IFwiXCIpIHtcbiAgICAgIHJldHVybiB7IGtleVBvaW50c0RhdGE6IG51bGwsIGVycm9yOiBcIkFuc3dlciBjb250ZW50IGNhbm5vdCBiZSBlbXB0eS5cIiB9O1xuICAgIH1cbiAgICBpZiAobWFya1dlaWdodGFnZSA8PSAwKSB7XG4gICAgICAgIHJldHVybiB7IGtleVBvaW50c0RhdGE6IG51bGwsIGVycm9yOiBcIk1hcmsgd2VpZ2h0YWdlIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXIuXCIgfTtcbiAgICB9XG5cbiAgICBjb25zdCBpbnB1dDogR2VuZXJhdGVLZXlQb2ludHNGbG93SW5wdXQgPSB7IGFuc3dlckNvbnRlbnQsIG1hcmtXZWlnaHRhZ2UgfTtcbiAgICBjb25zdCBrZXlQb2ludHNEYXRhID0gYXdhaXQgZ2VuZXJhdGVLZXlQb2ludHNGbG93KGlucHV0KTtcbiAgICByZXR1cm4geyBrZXlQb2ludHNEYXRhIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc3QgdHlwZWRFcnJvciA9IGVycm9yIGFzIEVycm9yO1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBnZW5lcmF0aW5nIGtleSBwb2ludHM6XCIsIHR5cGVkRXJyb3IpO1xuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IHR5cGVkRXJyb3IubWVzc2FnZSB8fCBcIkZhaWxlZCB0byBnZW5lcmF0ZSBrZXkgcG9pbnRzLlwiO1xuICAgICBpZiAoZXJyb3JNZXNzYWdlLmluY2x1ZGVzKFwiNDI5XCIpIHx8IGVycm9yTWVzc2FnZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFwicXVvdGFcIikpIHtcbiAgICAgIHJldHVybiB7IGtleVBvaW50c0RhdGE6IG51bGwsIGVycm9yOiBcIktleSBwb2ludCBnZW5lcmF0aW9uIGZhaWxlZCBkdWUgdG8gQVBJIHJhdGUgbGltaXRzLiBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyIG9yIHdpdGggc2hvcnRlciBjb250ZW50LlwiIH07XG4gICAgfVxuICAgIGlmIChlcnJvck1lc3NhZ2UudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcInRva2VuIGNvdW50IGV4Y2VlZHNcIikgfHwgZXJyb3JNZXNzYWdlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoXCJpbnB1dCB0b2tlbiBjb3VudFwiKSkge1xuICAgICAgcmV0dXJuIHsga2V5UG9pbnRzRGF0YTogbnVsbCwgZXJyb3I6IFwiWW91ciBjb250ZW50IGlzIHRvbyBsb25nIGZvciB0aGUgQUkgdG8gcHJvY2Vzcy4gUGxlYXNlIHNob3J0ZW4gaXQgYW5kIHRyeSBhZ2Fpbi5cIiB9O1xuICAgIH1cbiAgICByZXR1cm4geyBrZXlQb2ludHNEYXRhOiBudWxsLCBlcnJvcjogZXJyb3JNZXNzYWdlIH07XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoibVNBeUhzQiJ9
}}),
"[project]/src/components/study-genie/KeyPointGenerator.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "KeyPointGenerator": (()=>KeyPointGenerator)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/components/ui/button'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/ui/textarea'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/ui/label'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/ui/card'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/ui/select'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$checks$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ListChecks$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list-checks.js [app-ssr] (ecmascript) <export default as ListChecks>");
(()=>{
    const e = new Error("Cannot find module '@/hooks/use-toast'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$data$3a$6e15b8__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/data:6e15b8 [app-ssr] (ecmascript) <text/javascript>");
"use client";
;
;
;
;
;
;
;
;
;
;
const MAX_WORDS_KEY_POINTS = 5000;
const MARK_WEIGHTAGES = [
    2,
    4,
    8,
    12,
    16,
    20
];
function KeyPointGenerator() {
    const [answerContent, setAnswerContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [markWeightage, setMarkWeightage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(MARK_WEIGHTAGES[0]);
    const [wordCount, setWordCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [generatedKeyPoints, setGeneratedKeyPoints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const { toast } = useToast();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const words = answerContent.split(/\s+/).filter(Boolean);
        setWordCount(words.length);
        if (words.length > MAX_WORDS_KEY_POINTS) {
            setError(`Word limit exceeded. Maximum ${MAX_WORDS_KEY_POINTS} words allowed.`);
        } else {
            setError(null);
        }
    }, [
        answerContent
    ]);
    const handleTextChange = (event)=>{
        const newText = event.target.value;
        setAnswerContent(newText);
        const words = newText.split(/\s+/).filter(Boolean);
        setWordCount(words.length);
        if (words.length > MAX_WORDS_KEY_POINTS) {
            setError(`Word limit exceeded. Maximum ${MAX_WORDS_KEY_POINTS} words allowed.`);
        } else {
            setError(null);
        }
    };
    const handleMarkWeightageChange = (value)=>{
        setMarkWeightage(parseInt(value, 10));
    };
    const handleSubmit = async ()=>{
        if (!answerContent.trim()) {
            setError("Please paste your answer content.");
            toast({
                title: "Empty Content",
                description: "Please paste some text to generate key points.",
                variant: "destructive"
            });
            return;
        }
        if (wordCount > MAX_WORDS_KEY_POINTS) {
            setError(`Word limit exceeded. Maximum ${MAX_WORDS_KEY_POINTS} words allowed.`);
            toast({
                title: "Word Limit Exceeded",
                description: `Please reduce your content to ${MAX_WORDS_KEY_POINTS} words or less.`,
                variant: "destructive"
            });
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedKeyPoints(null);
        toast({
            title: "Generating Key Points",
            description: "AI is extracting key points from your content..."
        });
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$data$3a$6e15b8__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["handleGenerateKeyPoints"])(answerContent, markWeightage);
            if (result.error) {
                throw new Error(result.error);
            }
            if (result.keyPointsData?.keyPoints) {
                setGeneratedKeyPoints(result.keyPointsData.keyPoints);
                toast({
                    title: "Key Points Generated!",
                    description: "Your key points are ready."
                });
            } else {
                throw new Error("Key points not found in response.");
            }
        } catch (err) {
            console.error("Error generating key points:", err);
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
            toast({
                title: "Key Point Generation Failed",
                description: errorMessage,
                variant: "destructive"
            });
            setError(`Failed to generate key points: ${errorMessage}`);
        } finally{
            setIsLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
        className: "shadow-lg w-full max-w-3xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardHeader, {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardTitle, {
                        className: "font-headline text-2xl flex items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                className: "mr-2 h-6 w-6 text-primary"
                            }, void 0, false, {
                                fileName: "[project]/src/components/study-genie/KeyPointGenerator.tsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, this),
                            "Key Point Generator"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/study-genie/KeyPointGenerator.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardDescription, {
                        children: [
                            "Paste your full answer content and select the mark weightage. The AI will extract essential key points to aid your revision. Max ",
                            MAX_WORDS_KEY_POINTS,
                            " words."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/study-genie/KeyPointGenerator.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/study-genie/KeyPointGenerator.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardContent, {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Label, {
                                htmlFor: "answer-content-input",
                                className: "text-base font-medium",
                                children: "Full Answer Content"
                            }, void 0, false, {
                                fileName: "[project]/src/components/study-genie/KeyPointGenerator.tsx",
                                lineNumber: 104,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Textarea, {
                                id: "answer-content-input",
                                value: answerContent,
                                onChange: handleTextChange,
                                placeholder: "Paste your answer content here...",
                                rows: 12,
                                className: "mt-2 text-base min-h-[150px] resize-y"
                            }, void 0, false, {
                                fileName: "[project]/src/components/study-genie/KeyPointGenerator.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex justify-between items-center text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: wordCount > MAX_WORDS_KEY_POINTS ? "text-destructive" : "text-muted-foreground",
                                        children: [
                                            "Word Count: ",
                                            wordCount,
                                            " / ",
                                            MAX_WORDS_KEY_POINTS
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/study-genie/KeyPointGenerator.tsx",
                                        lineNumber: 114,
                                        columnNumber: 13
                                    }, this),
                                    error && !isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-destructive text-xs",
                                        children: error
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/study-genie/KeyPointGenerator.tsx",
                                        lineNumber: 117,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/study-genie/KeyPointGenerator.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/study-genie/KeyPointGenerator.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Label, {
                                htmlFor: "mark-weightage-select",
                                className: "text-base font-medium",
                                children: "Desired Mark Weightage"
                            }, void 0, false, {
                                fileName: "[project]/src/components/study-genie/KeyPointGenerator.tsx",
                                lineNumber: 122,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Select, {
                                onValueChange: handleMarkWeightageChange,
                                defaultValue: String(markWeightage),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectTrigger, {
                                        id: "mark-weightage-select",
                                        className: "w-full md:w-[180px] mt-2 text-base h-11",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectValue, {
                                            placeholder: "Select marks"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/study-genie/KeyPointGenerator.tsx",
                                            lineNumber: 125,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/study-genie/KeyPointGenerator.tsx",
                                        lineNumber: 124,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectContent, {
                                        children: MARK_WEIGHTAGES.map((mark)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectItem, {
                                                value: String(mark),
                                                className: "text-base",
                                                children: [
                                                    mark,
                                                    " Marks"
                                                ]
                                            }, mark, true, {
                                                fileName: "[project]/src/components/study-genie/KeyPointGenerator.tsx",
                                                lineNumber: 129,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/study-genie/KeyPointGenerator.tsx",
                                        lineNumber: 127,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/study-genie/KeyPointGenerator.tsx",
                                lineNumber: 123,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/study-genie/KeyPointGenerator.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/study-genie/KeyPointGenerator.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardFooter, {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                    onClick: handleSubmit,
                    disabled: isLoading || wordCount === 0 || wordCount > MAX_WORDS_KEY_POINTS || !!error,
                    className: "w-full text-base py-3",
                    children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                className: "mr-2 h-5 w-5 animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/src/components/study-genie/KeyPointGenerator.tsx",
                                lineNumber: 145,
                                columnNumber: 15
                            }, this),
                            "Generating Key Points..."
                        ]
                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                className: "mr-2 h-5 w-5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/study-genie/KeyPointGenerator.tsx",
                                lineNumber: 150,
                                columnNumber: 15
                            }, this),
                            "Generate Key Points"
                        ]
                    }, void 0, true)
                }, void 0, false, {
                    fileName: "[project]/src/components/study-genie/KeyPointGenerator.tsx",
                    lineNumber: 138,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/study-genie/KeyPointGenerator.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, this),
            generatedKeyPoints && !isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardContent, {
                className: "mt-6 border-t pt-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-headline flex items-center mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$checks$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ListChecks$3e$__["ListChecks"], {
                                className: "mr-2 h-5 w-5 text-primary"
                            }, void 0, false, {
                                fileName: "[project]/src/components/study-genie/KeyPointGenerator.tsx",
                                lineNumber: 160,
                                columnNumber: 13
                            }, this),
                            "Generated Key Points (",
                            markWeightage,
                            " Marks)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/study-genie/KeyPointGenerator.tsx",
                        lineNumber: 159,
                        columnNumber: 11
                    }, this),
                    generatedKeyPoints.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "space-y-2 list-disc list-inside bg-muted/50 p-4 rounded-md",
                        children: generatedKeyPoints.map((point, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "text-base text-foreground",
                                children: point
                            }, index, false, {
                                fileName: "[project]/src/components/study-genie/KeyPointGenerator.tsx",
                                lineNumber: 166,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/study-genie/KeyPointGenerator.tsx",
                        lineNumber: 164,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground",
                        children: "No specific key points were extracted. The AI might need more context or the content might be too brief for the selected marks."
                    }, void 0, false, {
                        fileName: "[project]/src/components/study-genie/KeyPointGenerator.tsx",
                        lineNumber: 172,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/study-genie/KeyPointGenerator.tsx",
                lineNumber: 158,
                columnNumber: 9
            }, this),
            error && !isLoading && generatedKeyPoints === null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardContent, {
                className: "mt-6 border-t pt-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-destructive text-center",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/src/components/study-genie/KeyPointGenerator.tsx",
                    lineNumber: 178,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/study-genie/KeyPointGenerator.tsx",
                lineNumber: 177,
                columnNumber: 10
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/study-genie/KeyPointGenerator.tsx",
        lineNumber: 91,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/study-genie/PdfExportButton.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "PdfExportButton": (()=>PdfExportButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/components/ui/button'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-ssr] (ecmascript) <export default as Download>");
(()=>{
    const e = new Error("Cannot find module '@/hooks/use-toast'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
"use client";
;
;
;
;
function PdfExportButton({ disabled = false }) {
    const { toast } = useToast();
    const handleExport = ()=>{
        toast({
            title: "PDF Export",
            description: "PDF export functionality is not yet implemented.",
            variant: "default"
        });
        console.log("Attempting to export PDF...");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
        onClick: handleExport,
        disabled: disabled,
        variant: "outline",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                className: "mr-2 h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/src/components/study-genie/PdfExportButton.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            "Export Plan as PDF"
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/study-genie/PdfExportButton.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/app/data:98788e [app-ssr] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"407287a71f4baa6f2789738c92cc573c76af9c8c89":"handleGenerateStudyPlan"},"src/app/actions.ts",""] */ __turbopack_context__.s({
    "handleGenerateStudyPlan": (()=>handleGenerateStudyPlan)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var handleGenerateStudyPlan = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("407287a71f4baa6f2789738c92cc573c76af9c8c89", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "handleGenerateStudyPlan"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgZ2VuZXJhdGVTdHVkeVNjaGVkdWxlLCBHZW5lcmF0ZVN0dWR5U2NoZWR1bGVJbnB1dCB9IGZyb20gXCJAL2FpL2Zsb3dzL2dlbmVyYXRlLXN0dWR5LXNjaGVkdWxlXCI7XG5pbXBvcnQgeyBzdWdnZXN0TGVhcm5pbmdSZXNvdXJjZXMsIFN1Z2dlc3RMZWFybmluZ1Jlc291cmNlc0lucHV0IH0gZnJvbSBcIkAvYWkvZmxvd3Mvc3VnZ2VzdC1sZWFybmluZy1yZXNvdXJjZXNcIjtcbmltcG9ydCB7IGNyZWF0ZVF1aXpGcm9tTm90ZXMsIENyZWF0ZVF1aXpGcm9tTm90ZXNJbnB1dCB9IGZyb20gXCJAL2FpL2Zsb3dzL2NyZWF0ZS1xdWl6LWZyb20tbm90ZXNcIjtcbmltcG9ydCB7IGdlbmVyYXRlVG9waWNJbWFnZSB9IGZyb20gXCJAL2FpL2Zsb3dzL2dlbmVyYXRlLXRvcGljLWltYWdlLWZsb3dcIjtcbmltcG9ydCB7IGV4dHJhY3RUZXh0RnJvbUltYWdlLCBFeHRyYWN0VGV4dEZyb21JbWFnZUlucHV0IH0gZnJvbSBcIkAvYWkvZmxvd3MvZXh0cmFjdC10ZXh0LWZyb20taW1hZ2UtZmxvd1wiO1xuaW1wb3J0IHsgZ2VuZXJhdGVLZXlQb2ludHMgYXMgZ2VuZXJhdGVLZXlQb2ludHNGbG93LCBHZW5lcmF0ZUtleVBvaW50c0lucHV0IGFzIEdlbmVyYXRlS2V5UG9pbnRzRmxvd0lucHV0IH0gZnJvbSBcIkAvYWkvZmxvd3MvZ2VuZXJhdGVLZXlQb2ludHNGbG93XCI7XG5pbXBvcnQgdHlwZSB7IEdlbmVyYXRlZFN0dWR5U2NoZWR1bGVPdXRwdXQsIFN1Z2dlc3RlZExlYXJuaW5nUmVzb3VyY2VzT3V0cHV0LCBDcmVhdGVkUXVpek91dHB1dCwgR2VuZXJhdGVLZXlQb2ludHNPdXRwdXQsIFN0dWR5UGxhbkZvcm1WYWx1ZXMgfSBmcm9tIFwiQC9saWIvdHlwZXNcIjtcbi8vIGltcG9ydCB7IGV4dHJhY3RUZXh0RnJvbVBkZiB9IGZyb20gXCJAL2FpL2Zsb3dzL2V4dHJhY3QtdGV4dC1mcm9tLXBkZi1mbG93XCI7IC8vIE5vdCBjdXJyZW50bHkgdXNlZCBkaXJlY3RseSBieSBvdGhlciBhY3Rpb25zXG5cbmFzeW5jIGZ1bmN0aW9uIGZpbGVUb0RhdGFVcmkoZmlsZTogRmlsZSk6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IGFycmF5QnVmZmVyID0gYXdhaXQgZmlsZS5hcnJheUJ1ZmZlcigpO1xuICBjb25zdCBidWZmZXIgPSBCdWZmZXIuZnJvbShhcnJheUJ1ZmZlcik7XG4gIHJldHVybiBgZGF0YToke2ZpbGUudHlwZX07YmFzZTY0LCR7YnVmZmVyLnRvU3RyaW5nKCdiYXNlNjQnKX1gO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlSW1hZ2VVcGxvYWRGb3JUb3BpY0V4dHJhY3Rpb24oXG4gIGltYWdlRGF0YVVyaTogc3RyaW5nXG4pOiBQcm9taXNlPHsgZXh0cmFjdGVkVGV4dDogc3RyaW5nIHwgbnVsbDsgZXJyb3I/OiBzdHJpbmcgfT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGlucHV0OiBFeHRyYWN0VGV4dEZyb21JbWFnZUlucHV0ID0geyBpbWFnZURhdGFVcmkgfTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleHRyYWN0VGV4dEZyb21JbWFnZShpbnB1dCk7XG4gICAgcmV0dXJuIHsgZXh0cmFjdGVkVGV4dDogcmVzdWx0LmV4dHJhY3RlZFRleHQgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZXh0cmFjdGluZyB0ZXh0IGZyb20gaW1hZ2U6XCIsIGVycm9yKTtcbiAgICByZXR1cm4geyBleHRyYWN0ZWRUZXh0OiBudWxsLCBlcnJvcjogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBcIkZhaWxlZCB0byBleHRyYWN0IHRleHQgZnJvbSBpbWFnZS5cIiB9O1xuICB9XG59XG5cbmludGVyZmFjZSBIYW5kbGVHZW5lcmF0ZVN0dWR5UGxhbkRhdGEgZXh0ZW5kcyBPbWl0PFN0dWR5UGxhbkZvcm1WYWx1ZXMsICdleGFtRGF0ZScgfCAnc3RhcnREYXRlJz4ge1xuICBleGFtRGF0ZTogc3RyaW5nO1xuICBzdGFydERhdGU6IHN0cmluZztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZUdlbmVyYXRlU3R1ZHlQbGFuKFxuICBkYXRhOiBIYW5kbGVHZW5lcmF0ZVN0dWR5UGxhbkRhdGFcbik6IFByb21pc2U8eyBzY2hlZHVsZTogR2VuZXJhdGVkU3R1ZHlTY2hlZHVsZU91dHB1dCB8IG51bGw7IHJlc291cmNlczogU3VnZ2VzdGVkTGVhcm5pbmdSZXNvdXJjZXNPdXRwdXQgfCBudWxsOyBlcnJvcj86IHN0cmluZyB9PiB7XG4gIHRyeSB7XG4gICAgY29uc3Qgc3ViamVjdE5hbWVzID0gZGF0YS5zdWJqZWN0cy5tYXAocyA9PiBzLm5hbWUpO1xuICAgIGNvbnN0IGFsbFRvcGljVGV4dHM6IHN0cmluZ1tdID0gZGF0YS5zdWJqZWN0cy5yZWR1Y2UoKGFjYywgcykgPT4ge1xuICAgICAgICBpZiAocy50b3BpY3MgJiYgcy50b3BpY3MudHJpbSgpICE9PSBcIlwiKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRpdmlkdWFsVG9waWNzID0gcy50b3BpY3Muc3BsaXQoL1tcXG4sXSsvKS5tYXAodG9waWMgPT4gdG9waWMudHJpbSgpKS5maWx0ZXIodG9waWMgPT4gdG9waWMgIT09IFwiXCIpO1xuICAgICAgICAgICAgYWNjLnB1c2goLi4uaW5kaXZpZHVhbFRvcGljcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBbXSBhcyBzdHJpbmdbXSk7XG5cbiAgICBsZXQgdG9waWNJbWFnZXNGb3JTY2hlZHVsZTogc3RyaW5nW10gPSBbXTtcblxuICAgIGlmIChhbGxUb3BpY1RleHRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgdW5pcXVlVG9waWNUZXh0c0ZvckltYWdlR2VuID0gQXJyYXkuZnJvbShuZXcgU2V0KGFsbFRvcGljVGV4dHMpKTsgXG5cbiAgICAgICAgY29uc3QgZ2VuZXJhdGVkVG9waWNJbWFnZVByb21pc2VzID0gdW5pcXVlVG9waWNUZXh0c0ZvckltYWdlR2VuLm1hcChhc3luYyAodG9waWNUZXh0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbWFnZUdlbklucHV0VGV4dCA9IHRvcGljVGV4dC5sZW5ndGggPiAxMDAgPyB0b3BpY1RleHQuc3Vic3RyaW5nKDAsIDk3KSArIFwiLi4uXCIgOiB0b3BpY1RleHQ7XG4gICAgICAgICAgICAgaWYgKGltYWdlR2VuSW5wdXRUZXh0KSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1hZ2VSZXN1bHQgPSBhd2FpdCBnZW5lcmF0ZVRvcGljSW1hZ2UoeyB0b3BpY1RleHQ6IGltYWdlR2VuSW5wdXRUZXh0IH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW1hZ2VSZXN1bHQuaW1hZ2VEYXRhVXJpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGltZ0Vycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYEZhaWxlZCB0byBnZW5lcmF0ZSBpbWFnZSBmb3IgdG9waWMgXCIke3RvcGljVGV4dH1cIjpgLCBpbWdFcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDsgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBnZW5lcmF0ZWRJbWFnZXMgPSAoYXdhaXQgUHJvbWlzZS5hbGwoZ2VuZXJhdGVkVG9waWNJbWFnZVByb21pc2VzKSkuZmlsdGVyKGltZyA9PiBpbWcgIT09IG51bGwpIGFzIHN0cmluZ1tdO1xuICAgICAgICB0b3BpY0ltYWdlc0ZvclNjaGVkdWxlLnB1c2goLi4uZ2VuZXJhdGVkSW1hZ2VzKTtcbiAgICB9XG4gICAgXG4gICAgY29uc3Qgc2NoZWR1bGVJbnB1dFRvcGljcyA9IGFsbFRvcGljVGV4dHMubGVuZ3RoID4gMCA/IEFycmF5LmZyb20obmV3IFNldChhbGxUb3BpY1RleHRzKSkgOiBbXCJHZW5lcmFsIFN0dWRpZXNcIl07XG5cbiAgICBjb25zdCBzY2hlZHVsZUlucHV0OiBHZW5lcmF0ZVN0dWR5U2NoZWR1bGVJbnB1dCA9IHtcbiAgICAgIHN1YmplY3RzOiBzdWJqZWN0TmFtZXMsXG4gICAgICB0b3BpY3M6IHNjaGVkdWxlSW5wdXRUb3BpY3MsIFxuICAgICAgZXhhbURhdGU6IGRhdGEuZXhhbURhdGUsXG4gICAgICBzdGFydERhdGU6IGRhdGEuc3RhcnREYXRlLFxuICAgICAgYXZhaWxhYmxlU3R1ZHlIb3Vyc1BlckRheTogZGF0YS5hdmFpbGFibGVTdHVkeUhvdXJzUGVyRGF5LFxuICAgICAgdG9waWNJbWFnZUlucHV0czogdG9waWNJbWFnZXNGb3JTY2hlZHVsZS5sZW5ndGggPiAwID8gdG9waWNJbWFnZXNGb3JTY2hlZHVsZSA6IHVuZGVmaW5lZCxcbiAgICB9O1xuICAgIGNvbnN0IHNjaGVkdWxlID0gYXdhaXQgZ2VuZXJhdGVTdHVkeVNjaGVkdWxlKHNjaGVkdWxlSW5wdXQpO1xuXG4gICAgY29uc3QgcmVzb3VyY2VzSW5wdXQ6IFN1Z2dlc3RMZWFybmluZ1Jlc291cmNlc0lucHV0ID0ge1xuICAgICAgc3ViamVjdDogc3ViamVjdE5hbWVzLmpvaW4oJywgJykgfHwgXCJHZW5lcmFsIFN0dWRpZXNcIiwgXG4gICAgICB0b3BpY3M6IHNjaGVkdWxlSW5wdXRUb3BpY3MsIFxuICAgIH07XG4gICAgY29uc3QgcmVzb3VyY2VzID0gYXdhaXQgc3VnZ2VzdExlYXJuaW5nUmVzb3VyY2VzKHJlc291cmNlc0lucHV0KTtcbiAgICBcbiAgICByZXR1cm4geyBzY2hlZHVsZSwgcmVzb3VyY2VzIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGdlbmVyYXRpbmcgc3R1ZHkgcGxhbjpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IHNjaGVkdWxlOiBudWxsLCByZXNvdXJjZXM6IG51bGwsIGVycm9yOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFwiRmFpbGVkIHRvIGdlbmVyYXRlIHN0dWR5IHBsYW4uXCIgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlQ3JlYXRlUXVpeihcbiAgbm90ZXNUZXh0OiBzdHJpbmcsXG4gIG51bVF1ZXN0aW9uczogbnVtYmVyID0gNVxuKTogUHJvbWlzZTx7IHF1aXpEYXRhOiBDcmVhdGVkUXVpek91dHB1dCB8IG51bGw7IGVycm9yPzogc3RyaW5nIH0+IHtcbiAgdHJ5IHtcbiAgICBpZiAoIW5vdGVzVGV4dCB8fCBub3Rlc1RleHQudHJpbSgpID09PSBcIlwiKSB7XG4gICAgICAgIHJldHVybiB7IHF1aXpEYXRhOiBudWxsLCBlcnJvcjogXCJOb3RlcyB0ZXh0IGNhbm5vdCBiZSBlbXB0eS5cIiB9O1xuICAgIH1cbiAgICBcbiAgICBjb25zdCBxdWl6SW5wdXQ6IENyZWF0ZVF1aXpGcm9tTm90ZXNJbnB1dCA9IHsgbm90ZXNUZXh0LCBudW1RdWVzdGlvbnMgfTtcbiAgICBjb25zdCBxdWl6RGF0YSA9IGF3YWl0IGNyZWF0ZVF1aXpGcm9tTm90ZXMocXVpeklucHV0KTtcbiAgICByZXR1cm4geyBxdWl6RGF0YSB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnN0IHR5cGVkRXJyb3IgPSBlcnJvciBhcyBFcnJvcjtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgY3JlYXRpbmcgcXVpejpcIiwgdHlwZWRFcnJvcik7XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gdHlwZWRFcnJvci5tZXNzYWdlIHx8IFwiRmFpbGVkIHRvIGNyZWF0ZSBxdWl6IGR1ZSB0byBhbiB1bmV4cGVjdGVkIGVycm9yLlwiO1xuICAgIGlmIChlcnJvck1lc3NhZ2UuaW5jbHVkZXMoXCI0MjlcIikgfHwgZXJyb3JNZXNzYWdlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoXCJxdW90YVwiKSkge1xuICAgICAgcmV0dXJuIHsgcXVpekRhdGE6IG51bGwsIGVycm9yOiBcIlF1aXogZ2VuZXJhdGlvbiBmYWlsZWQgZHVlIHRvIEFQSSByYXRlIGxpbWl0cy4gUGxlYXNlIHRyeSBhZ2FpbiBsYXRlciBvciB3aXRoIHNob3J0ZXIgbm90ZXMuXCIgfTtcbiAgICB9XG4gICAgaWYgKGVycm9yTWVzc2FnZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFwidG9rZW4gY291bnQgZXhjZWVkc1wiKSB8fCBlcnJvck1lc3NhZ2UudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcImlucHV0IHRva2VuIGNvdW50XCIpIHx8IGVycm9yTWVzc2FnZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFwibWF4aW11bSBudW1iZXIgb2YgdG9rZW5zIGFsbG93ZWRcIikpIHtcbiAgICAgIHJldHVybiB7IHF1aXpEYXRhOiBudWxsLCBlcnJvcjogXCJZb3VyIG5vdGVzIGFyZSB0b28gbG9uZyBmb3IgdGhlIEFJIHRvIHByb2Nlc3MuIFBsZWFzZSBzaG9ydGVuIHRoZW0gYW5kIHRyeSBhZ2Fpbi5cIiB9O1xuICAgIH1cbiAgICByZXR1cm4geyBxdWl6RGF0YTogbnVsbCwgZXJyb3I6IGVycm9yTWVzc2FnZSB9O1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoYW5kbGVHZW5lcmF0ZUtleVBvaW50cyhcbiAgYW5zd2VyQ29udGVudDogc3RyaW5nLFxuICBtYXJrV2VpZ2h0YWdlOiBudW1iZXJcbik6IFByb21pc2U8eyBrZXlQb2ludHNEYXRhOiBHZW5lcmF0ZUtleVBvaW50c091dHB1dCB8IG51bGw7IGVycm9yPzogc3RyaW5nIH0+IHtcbiAgdHJ5IHtcbiAgICBpZiAoIWFuc3dlckNvbnRlbnQgfHwgYW5zd2VyQ29udGVudC50cmltKCkgPT09IFwiXCIpIHtcbiAgICAgIHJldHVybiB7IGtleVBvaW50c0RhdGE6IG51bGwsIGVycm9yOiBcIkFuc3dlciBjb250ZW50IGNhbm5vdCBiZSBlbXB0eS5cIiB9O1xuICAgIH1cbiAgICBpZiAobWFya1dlaWdodGFnZSA8PSAwKSB7XG4gICAgICAgIHJldHVybiB7IGtleVBvaW50c0RhdGE6IG51bGwsIGVycm9yOiBcIk1hcmsgd2VpZ2h0YWdlIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXIuXCIgfTtcbiAgICB9XG5cbiAgICBjb25zdCBpbnB1dDogR2VuZXJhdGVLZXlQb2ludHNGbG93SW5wdXQgPSB7IGFuc3dlckNvbnRlbnQsIG1hcmtXZWlnaHRhZ2UgfTtcbiAgICBjb25zdCBrZXlQb2ludHNEYXRhID0gYXdhaXQgZ2VuZXJhdGVLZXlQb2ludHNGbG93KGlucHV0KTtcbiAgICByZXR1cm4geyBrZXlQb2ludHNEYXRhIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc3QgdHlwZWRFcnJvciA9IGVycm9yIGFzIEVycm9yO1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBnZW5lcmF0aW5nIGtleSBwb2ludHM6XCIsIHR5cGVkRXJyb3IpO1xuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IHR5cGVkRXJyb3IubWVzc2FnZSB8fCBcIkZhaWxlZCB0byBnZW5lcmF0ZSBrZXkgcG9pbnRzLlwiO1xuICAgICBpZiAoZXJyb3JNZXNzYWdlLmluY2x1ZGVzKFwiNDI5XCIpIHx8IGVycm9yTWVzc2FnZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFwicXVvdGFcIikpIHtcbiAgICAgIHJldHVybiB7IGtleVBvaW50c0RhdGE6IG51bGwsIGVycm9yOiBcIktleSBwb2ludCBnZW5lcmF0aW9uIGZhaWxlZCBkdWUgdG8gQVBJIHJhdGUgbGltaXRzLiBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyIG9yIHdpdGggc2hvcnRlciBjb250ZW50LlwiIH07XG4gICAgfVxuICAgIGlmIChlcnJvck1lc3NhZ2UudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcInRva2VuIGNvdW50IGV4Y2VlZHNcIikgfHwgZXJyb3JNZXNzYWdlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoXCJpbnB1dCB0b2tlbiBjb3VudFwiKSkge1xuICAgICAgcmV0dXJuIHsga2V5UG9pbnRzRGF0YTogbnVsbCwgZXJyb3I6IFwiWW91ciBjb250ZW50IGlzIHRvbyBsb25nIGZvciB0aGUgQUkgdG8gcHJvY2Vzcy4gUGxlYXNlIHNob3J0ZW4gaXQgYW5kIHRyeSBhZ2Fpbi5cIiB9O1xuICAgIH1cbiAgICByZXR1cm4geyBrZXlQb2ludHNEYXRhOiBudWxsLCBlcnJvcjogZXJyb3JNZXNzYWdlIH07XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoibVNBbUNzQiJ9
}}),
"[project]/src/app/data:c56454 [app-ssr] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"603012e5fd2047c34bd77af15318cf2d5b2689c975":"handleCreateQuiz"},"src/app/actions.ts",""] */ __turbopack_context__.s({
    "handleCreateQuiz": (()=>handleCreateQuiz)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var handleCreateQuiz = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("603012e5fd2047c34bd77af15318cf2d5b2689c975", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "handleCreateQuiz"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgZ2VuZXJhdGVTdHVkeVNjaGVkdWxlLCBHZW5lcmF0ZVN0dWR5U2NoZWR1bGVJbnB1dCB9IGZyb20gXCJAL2FpL2Zsb3dzL2dlbmVyYXRlLXN0dWR5LXNjaGVkdWxlXCI7XG5pbXBvcnQgeyBzdWdnZXN0TGVhcm5pbmdSZXNvdXJjZXMsIFN1Z2dlc3RMZWFybmluZ1Jlc291cmNlc0lucHV0IH0gZnJvbSBcIkAvYWkvZmxvd3Mvc3VnZ2VzdC1sZWFybmluZy1yZXNvdXJjZXNcIjtcbmltcG9ydCB7IGNyZWF0ZVF1aXpGcm9tTm90ZXMsIENyZWF0ZVF1aXpGcm9tTm90ZXNJbnB1dCB9IGZyb20gXCJAL2FpL2Zsb3dzL2NyZWF0ZS1xdWl6LWZyb20tbm90ZXNcIjtcbmltcG9ydCB7IGdlbmVyYXRlVG9waWNJbWFnZSB9IGZyb20gXCJAL2FpL2Zsb3dzL2dlbmVyYXRlLXRvcGljLWltYWdlLWZsb3dcIjtcbmltcG9ydCB7IGV4dHJhY3RUZXh0RnJvbUltYWdlLCBFeHRyYWN0VGV4dEZyb21JbWFnZUlucHV0IH0gZnJvbSBcIkAvYWkvZmxvd3MvZXh0cmFjdC10ZXh0LWZyb20taW1hZ2UtZmxvd1wiO1xuaW1wb3J0IHsgZ2VuZXJhdGVLZXlQb2ludHMgYXMgZ2VuZXJhdGVLZXlQb2ludHNGbG93LCBHZW5lcmF0ZUtleVBvaW50c0lucHV0IGFzIEdlbmVyYXRlS2V5UG9pbnRzRmxvd0lucHV0IH0gZnJvbSBcIkAvYWkvZmxvd3MvZ2VuZXJhdGVLZXlQb2ludHNGbG93XCI7XG5pbXBvcnQgdHlwZSB7IEdlbmVyYXRlZFN0dWR5U2NoZWR1bGVPdXRwdXQsIFN1Z2dlc3RlZExlYXJuaW5nUmVzb3VyY2VzT3V0cHV0LCBDcmVhdGVkUXVpek91dHB1dCwgR2VuZXJhdGVLZXlQb2ludHNPdXRwdXQsIFN0dWR5UGxhbkZvcm1WYWx1ZXMgfSBmcm9tIFwiQC9saWIvdHlwZXNcIjtcbi8vIGltcG9ydCB7IGV4dHJhY3RUZXh0RnJvbVBkZiB9IGZyb20gXCJAL2FpL2Zsb3dzL2V4dHJhY3QtdGV4dC1mcm9tLXBkZi1mbG93XCI7IC8vIE5vdCBjdXJyZW50bHkgdXNlZCBkaXJlY3RseSBieSBvdGhlciBhY3Rpb25zXG5cbmFzeW5jIGZ1bmN0aW9uIGZpbGVUb0RhdGFVcmkoZmlsZTogRmlsZSk6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IGFycmF5QnVmZmVyID0gYXdhaXQgZmlsZS5hcnJheUJ1ZmZlcigpO1xuICBjb25zdCBidWZmZXIgPSBCdWZmZXIuZnJvbShhcnJheUJ1ZmZlcik7XG4gIHJldHVybiBgZGF0YToke2ZpbGUudHlwZX07YmFzZTY0LCR7YnVmZmVyLnRvU3RyaW5nKCdiYXNlNjQnKX1gO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlSW1hZ2VVcGxvYWRGb3JUb3BpY0V4dHJhY3Rpb24oXG4gIGltYWdlRGF0YVVyaTogc3RyaW5nXG4pOiBQcm9taXNlPHsgZXh0cmFjdGVkVGV4dDogc3RyaW5nIHwgbnVsbDsgZXJyb3I/OiBzdHJpbmcgfT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGlucHV0OiBFeHRyYWN0VGV4dEZyb21JbWFnZUlucHV0ID0geyBpbWFnZURhdGFVcmkgfTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleHRyYWN0VGV4dEZyb21JbWFnZShpbnB1dCk7XG4gICAgcmV0dXJuIHsgZXh0cmFjdGVkVGV4dDogcmVzdWx0LmV4dHJhY3RlZFRleHQgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZXh0cmFjdGluZyB0ZXh0IGZyb20gaW1hZ2U6XCIsIGVycm9yKTtcbiAgICByZXR1cm4geyBleHRyYWN0ZWRUZXh0OiBudWxsLCBlcnJvcjogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBcIkZhaWxlZCB0byBleHRyYWN0IHRleHQgZnJvbSBpbWFnZS5cIiB9O1xuICB9XG59XG5cbmludGVyZmFjZSBIYW5kbGVHZW5lcmF0ZVN0dWR5UGxhbkRhdGEgZXh0ZW5kcyBPbWl0PFN0dWR5UGxhbkZvcm1WYWx1ZXMsICdleGFtRGF0ZScgfCAnc3RhcnREYXRlJz4ge1xuICBleGFtRGF0ZTogc3RyaW5nO1xuICBzdGFydERhdGU6IHN0cmluZztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZUdlbmVyYXRlU3R1ZHlQbGFuKFxuICBkYXRhOiBIYW5kbGVHZW5lcmF0ZVN0dWR5UGxhbkRhdGFcbik6IFByb21pc2U8eyBzY2hlZHVsZTogR2VuZXJhdGVkU3R1ZHlTY2hlZHVsZU91dHB1dCB8IG51bGw7IHJlc291cmNlczogU3VnZ2VzdGVkTGVhcm5pbmdSZXNvdXJjZXNPdXRwdXQgfCBudWxsOyBlcnJvcj86IHN0cmluZyB9PiB7XG4gIHRyeSB7XG4gICAgY29uc3Qgc3ViamVjdE5hbWVzID0gZGF0YS5zdWJqZWN0cy5tYXAocyA9PiBzLm5hbWUpO1xuICAgIGNvbnN0IGFsbFRvcGljVGV4dHM6IHN0cmluZ1tdID0gZGF0YS5zdWJqZWN0cy5yZWR1Y2UoKGFjYywgcykgPT4ge1xuICAgICAgICBpZiAocy50b3BpY3MgJiYgcy50b3BpY3MudHJpbSgpICE9PSBcIlwiKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRpdmlkdWFsVG9waWNzID0gcy50b3BpY3Muc3BsaXQoL1tcXG4sXSsvKS5tYXAodG9waWMgPT4gdG9waWMudHJpbSgpKS5maWx0ZXIodG9waWMgPT4gdG9waWMgIT09IFwiXCIpO1xuICAgICAgICAgICAgYWNjLnB1c2goLi4uaW5kaXZpZHVhbFRvcGljcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBbXSBhcyBzdHJpbmdbXSk7XG5cbiAgICBsZXQgdG9waWNJbWFnZXNGb3JTY2hlZHVsZTogc3RyaW5nW10gPSBbXTtcblxuICAgIGlmIChhbGxUb3BpY1RleHRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgdW5pcXVlVG9waWNUZXh0c0ZvckltYWdlR2VuID0gQXJyYXkuZnJvbShuZXcgU2V0KGFsbFRvcGljVGV4dHMpKTsgXG5cbiAgICAgICAgY29uc3QgZ2VuZXJhdGVkVG9waWNJbWFnZVByb21pc2VzID0gdW5pcXVlVG9waWNUZXh0c0ZvckltYWdlR2VuLm1hcChhc3luYyAodG9waWNUZXh0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbWFnZUdlbklucHV0VGV4dCA9IHRvcGljVGV4dC5sZW5ndGggPiAxMDAgPyB0b3BpY1RleHQuc3Vic3RyaW5nKDAsIDk3KSArIFwiLi4uXCIgOiB0b3BpY1RleHQ7XG4gICAgICAgICAgICAgaWYgKGltYWdlR2VuSW5wdXRUZXh0KSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1hZ2VSZXN1bHQgPSBhd2FpdCBnZW5lcmF0ZVRvcGljSW1hZ2UoeyB0b3BpY1RleHQ6IGltYWdlR2VuSW5wdXRUZXh0IH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW1hZ2VSZXN1bHQuaW1hZ2VEYXRhVXJpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGltZ0Vycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYEZhaWxlZCB0byBnZW5lcmF0ZSBpbWFnZSBmb3IgdG9waWMgXCIke3RvcGljVGV4dH1cIjpgLCBpbWdFcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDsgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBnZW5lcmF0ZWRJbWFnZXMgPSAoYXdhaXQgUHJvbWlzZS5hbGwoZ2VuZXJhdGVkVG9waWNJbWFnZVByb21pc2VzKSkuZmlsdGVyKGltZyA9PiBpbWcgIT09IG51bGwpIGFzIHN0cmluZ1tdO1xuICAgICAgICB0b3BpY0ltYWdlc0ZvclNjaGVkdWxlLnB1c2goLi4uZ2VuZXJhdGVkSW1hZ2VzKTtcbiAgICB9XG4gICAgXG4gICAgY29uc3Qgc2NoZWR1bGVJbnB1dFRvcGljcyA9IGFsbFRvcGljVGV4dHMubGVuZ3RoID4gMCA/IEFycmF5LmZyb20obmV3IFNldChhbGxUb3BpY1RleHRzKSkgOiBbXCJHZW5lcmFsIFN0dWRpZXNcIl07XG5cbiAgICBjb25zdCBzY2hlZHVsZUlucHV0OiBHZW5lcmF0ZVN0dWR5U2NoZWR1bGVJbnB1dCA9IHtcbiAgICAgIHN1YmplY3RzOiBzdWJqZWN0TmFtZXMsXG4gICAgICB0b3BpY3M6IHNjaGVkdWxlSW5wdXRUb3BpY3MsIFxuICAgICAgZXhhbURhdGU6IGRhdGEuZXhhbURhdGUsXG4gICAgICBzdGFydERhdGU6IGRhdGEuc3RhcnREYXRlLFxuICAgICAgYXZhaWxhYmxlU3R1ZHlIb3Vyc1BlckRheTogZGF0YS5hdmFpbGFibGVTdHVkeUhvdXJzUGVyRGF5LFxuICAgICAgdG9waWNJbWFnZUlucHV0czogdG9waWNJbWFnZXNGb3JTY2hlZHVsZS5sZW5ndGggPiAwID8gdG9waWNJbWFnZXNGb3JTY2hlZHVsZSA6IHVuZGVmaW5lZCxcbiAgICB9O1xuICAgIGNvbnN0IHNjaGVkdWxlID0gYXdhaXQgZ2VuZXJhdGVTdHVkeVNjaGVkdWxlKHNjaGVkdWxlSW5wdXQpO1xuXG4gICAgY29uc3QgcmVzb3VyY2VzSW5wdXQ6IFN1Z2dlc3RMZWFybmluZ1Jlc291cmNlc0lucHV0ID0ge1xuICAgICAgc3ViamVjdDogc3ViamVjdE5hbWVzLmpvaW4oJywgJykgfHwgXCJHZW5lcmFsIFN0dWRpZXNcIiwgXG4gICAgICB0b3BpY3M6IHNjaGVkdWxlSW5wdXRUb3BpY3MsIFxuICAgIH07XG4gICAgY29uc3QgcmVzb3VyY2VzID0gYXdhaXQgc3VnZ2VzdExlYXJuaW5nUmVzb3VyY2VzKHJlc291cmNlc0lucHV0KTtcbiAgICBcbiAgICByZXR1cm4geyBzY2hlZHVsZSwgcmVzb3VyY2VzIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGdlbmVyYXRpbmcgc3R1ZHkgcGxhbjpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IHNjaGVkdWxlOiBudWxsLCByZXNvdXJjZXM6IG51bGwsIGVycm9yOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFwiRmFpbGVkIHRvIGdlbmVyYXRlIHN0dWR5IHBsYW4uXCIgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlQ3JlYXRlUXVpeihcbiAgbm90ZXNUZXh0OiBzdHJpbmcsXG4gIG51bVF1ZXN0aW9uczogbnVtYmVyID0gNVxuKTogUHJvbWlzZTx7IHF1aXpEYXRhOiBDcmVhdGVkUXVpek91dHB1dCB8IG51bGw7IGVycm9yPzogc3RyaW5nIH0+IHtcbiAgdHJ5IHtcbiAgICBpZiAoIW5vdGVzVGV4dCB8fCBub3Rlc1RleHQudHJpbSgpID09PSBcIlwiKSB7XG4gICAgICAgIHJldHVybiB7IHF1aXpEYXRhOiBudWxsLCBlcnJvcjogXCJOb3RlcyB0ZXh0IGNhbm5vdCBiZSBlbXB0eS5cIiB9O1xuICAgIH1cbiAgICBcbiAgICBjb25zdCBxdWl6SW5wdXQ6IENyZWF0ZVF1aXpGcm9tTm90ZXNJbnB1dCA9IHsgbm90ZXNUZXh0LCBudW1RdWVzdGlvbnMgfTtcbiAgICBjb25zdCBxdWl6RGF0YSA9IGF3YWl0IGNyZWF0ZVF1aXpGcm9tTm90ZXMocXVpeklucHV0KTtcbiAgICByZXR1cm4geyBxdWl6RGF0YSB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnN0IHR5cGVkRXJyb3IgPSBlcnJvciBhcyBFcnJvcjtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgY3JlYXRpbmcgcXVpejpcIiwgdHlwZWRFcnJvcik7XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gdHlwZWRFcnJvci5tZXNzYWdlIHx8IFwiRmFpbGVkIHRvIGNyZWF0ZSBxdWl6IGR1ZSB0byBhbiB1bmV4cGVjdGVkIGVycm9yLlwiO1xuICAgIGlmIChlcnJvck1lc3NhZ2UuaW5jbHVkZXMoXCI0MjlcIikgfHwgZXJyb3JNZXNzYWdlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoXCJxdW90YVwiKSkge1xuICAgICAgcmV0dXJuIHsgcXVpekRhdGE6IG51bGwsIGVycm9yOiBcIlF1aXogZ2VuZXJhdGlvbiBmYWlsZWQgZHVlIHRvIEFQSSByYXRlIGxpbWl0cy4gUGxlYXNlIHRyeSBhZ2FpbiBsYXRlciBvciB3aXRoIHNob3J0ZXIgbm90ZXMuXCIgfTtcbiAgICB9XG4gICAgaWYgKGVycm9yTWVzc2FnZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFwidG9rZW4gY291bnQgZXhjZWVkc1wiKSB8fCBlcnJvck1lc3NhZ2UudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcImlucHV0IHRva2VuIGNvdW50XCIpIHx8IGVycm9yTWVzc2FnZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFwibWF4aW11bSBudW1iZXIgb2YgdG9rZW5zIGFsbG93ZWRcIikpIHtcbiAgICAgIHJldHVybiB7IHF1aXpEYXRhOiBudWxsLCBlcnJvcjogXCJZb3VyIG5vdGVzIGFyZSB0b28gbG9uZyBmb3IgdGhlIEFJIHRvIHByb2Nlc3MuIFBsZWFzZSBzaG9ydGVuIHRoZW0gYW5kIHRyeSBhZ2Fpbi5cIiB9O1xuICAgIH1cbiAgICByZXR1cm4geyBxdWl6RGF0YTogbnVsbCwgZXJyb3I6IGVycm9yTWVzc2FnZSB9O1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoYW5kbGVHZW5lcmF0ZUtleVBvaW50cyhcbiAgYW5zd2VyQ29udGVudDogc3RyaW5nLFxuICBtYXJrV2VpZ2h0YWdlOiBudW1iZXJcbik6IFByb21pc2U8eyBrZXlQb2ludHNEYXRhOiBHZW5lcmF0ZUtleVBvaW50c091dHB1dCB8IG51bGw7IGVycm9yPzogc3RyaW5nIH0+IHtcbiAgdHJ5IHtcbiAgICBpZiAoIWFuc3dlckNvbnRlbnQgfHwgYW5zd2VyQ29udGVudC50cmltKCkgPT09IFwiXCIpIHtcbiAgICAgIHJldHVybiB7IGtleVBvaW50c0RhdGE6IG51bGwsIGVycm9yOiBcIkFuc3dlciBjb250ZW50IGNhbm5vdCBiZSBlbXB0eS5cIiB9O1xuICAgIH1cbiAgICBpZiAobWFya1dlaWdodGFnZSA8PSAwKSB7XG4gICAgICAgIHJldHVybiB7IGtleVBvaW50c0RhdGE6IG51bGwsIGVycm9yOiBcIk1hcmsgd2VpZ2h0YWdlIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXIuXCIgfTtcbiAgICB9XG5cbiAgICBjb25zdCBpbnB1dDogR2VuZXJhdGVLZXlQb2ludHNGbG93SW5wdXQgPSB7IGFuc3dlckNvbnRlbnQsIG1hcmtXZWlnaHRhZ2UgfTtcbiAgICBjb25zdCBrZXlQb2ludHNEYXRhID0gYXdhaXQgZ2VuZXJhdGVLZXlQb2ludHNGbG93KGlucHV0KTtcbiAgICByZXR1cm4geyBrZXlQb2ludHNEYXRhIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc3QgdHlwZWRFcnJvciA9IGVycm9yIGFzIEVycm9yO1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBnZW5lcmF0aW5nIGtleSBwb2ludHM6XCIsIHR5cGVkRXJyb3IpO1xuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IHR5cGVkRXJyb3IubWVzc2FnZSB8fCBcIkZhaWxlZCB0byBnZW5lcmF0ZSBrZXkgcG9pbnRzLlwiO1xuICAgICBpZiAoZXJyb3JNZXNzYWdlLmluY2x1ZGVzKFwiNDI5XCIpIHx8IGVycm9yTWVzc2FnZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFwicXVvdGFcIikpIHtcbiAgICAgIHJldHVybiB7IGtleVBvaW50c0RhdGE6IG51bGwsIGVycm9yOiBcIktleSBwb2ludCBnZW5lcmF0aW9uIGZhaWxlZCBkdWUgdG8gQVBJIHJhdGUgbGltaXRzLiBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyIG9yIHdpdGggc2hvcnRlciBjb250ZW50LlwiIH07XG4gICAgfVxuICAgIGlmIChlcnJvck1lc3NhZ2UudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcInRva2VuIGNvdW50IGV4Y2VlZHNcIikgfHwgZXJyb3JNZXNzYWdlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoXCJpbnB1dCB0b2tlbiBjb3VudFwiKSkge1xuICAgICAgcmV0dXJuIHsga2V5UG9pbnRzRGF0YTogbnVsbCwgZXJyb3I6IFwiWW91ciBjb250ZW50IGlzIHRvbyBsb25nIGZvciB0aGUgQUkgdG8gcHJvY2Vzcy4gUGxlYXNlIHNob3J0ZW4gaXQgYW5kIHRyeSBhZ2Fpbi5cIiB9O1xuICAgIH1cbiAgICByZXR1cm4geyBrZXlQb2ludHNEYXRhOiBudWxsLCBlcnJvcjogZXJyb3JNZXNzYWdlIH07XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiNFJBK0ZzQiJ9
}}),
"[project]/src/app/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>HomePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$study$2d$genie$2f$Header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/study-genie/Header.tsx [app-ssr] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/components/study-genie/StudyPlanForm'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/study-genie/TimetableDisplay'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/study-genie/TimeAllocationChart'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/study-genie/ResourceSuggestions'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$study$2d$genie$2f$QuizGenerator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/study-genie/QuizGenerator.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$study$2d$genie$2f$QuizDisplay$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/study-genie/QuizDisplay.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$study$2d$genie$2f$KeyPointGenerator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/study-genie/KeyPointGenerator.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$study$2d$genie$2f$PdfExportButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/study-genie/PdfExportButton.tsx [app-ssr] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/components/ui/tabs'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookCopy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-copy.js [app-ssr] (ecmascript) <export default as BookCopy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$help$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircleIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-help.js [app-ssr] (ecmascript) <export default as HelpCircleIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript) <export default as Sparkles>");
(()=>{
    const e = new Error("Cannot find module '@/hooks/use-toast'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$data$3a$98788e__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/data:98788e [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$data$3a$c56454__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/data:c56454 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function HomePage() {
    const [studyPlanLoading, setStudyPlanLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [quizLoading, setQuizLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [schedule, setSchedule] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [resources, setResources] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [quizJson, setQuizJson] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("study-plan");
    const { toast } = useToast();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const section = searchParams.get('section');
        if (section === 'quiz-maker' || section === 'key-points') {
            setActiveTab(section);
            // Clean the URL by removing the section query param after scrolling
            const current = new URL(window.location.toString());
            current.searchParams.delete('section');
            router.replace(current.pathname + current.search, {
                scroll: false
            });
            // Scroll to the element if needed
            const element = document.getElementById(section);
            element?.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }, [
        searchParams,
        router
    ]);
    const onStudyPlanSubmit = async (data)=>{
        setStudyPlanLoading(true);
        setSchedule(null);
        setResources(null);
        const formattedSubjects = data.subjects.map((s)=>({
                id: s.id,
                name: s.name,
                topics: s.topics,
                notesImageForTopics: s.notesImageForTopics,
                ocrTextPreview: s.ocrTextPreview
            }));
        const hasAnyTopicText = formattedSubjects.some((s)=>s.topics && s.topics.trim() !== "");
        const willGenerateImages = hasAnyTopicText;
        if (willGenerateImages) {
            toast({
                title: "Generating Study Plan & Topic Images",
                description: "AI is crafting your plan and may create images for your topics. This can take a moment..."
            });
        } else {
            toast({
                title: "Generating Study Plan",
                description: "AI is crafting your personalized plan..."
            });
        }
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$data$3a$98788e__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["handleGenerateStudyPlan"])({
            subjects: formattedSubjects,
            examDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(data.examDate, "yyyy-MM-dd"),
            startDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(data.startDate, "yyyy-MM-dd"),
            availableStudyHoursPerDay: data.studyHoursPerDay
        });
        if (result.error) {
            toast({
                title: "Error",
                description: result.error,
                variant: "destructive"
            });
        } else {
            setSchedule(result.schedule);
            setResources(result.resources);
            toast({
                title: "Success!",
                description: "Your study plan and resources are ready."
            });
        }
        setStudyPlanLoading(false);
    };
    const onQuizGenerated = (generatedQuizJson)=>{
        setQuizJson(generatedQuizJson);
        setQuizLoading(false);
    };
    const handleRetakeQuiz = ()=>{
        setQuizJson(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex flex-col bg-background",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$study$2d$genie$2f$Header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Header"], {}, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-grow container mx-auto px-4 py-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tabs, {
                    value: activeTab,
                    onValueChange: setActiveTab,
                    className: "w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TabsList, {
                            className: "grid w-full grid-cols-1 sm:grid-cols-3 md:w-fit mx-auto mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TabsTrigger, {
                                    value: "study-plan",
                                    className: "text-base py-2.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookCopy$3e$__["BookCopy"], {
                                            className: "mr-2 h-5 w-5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 106,
                                            columnNumber: 15
                                        }, this),
                                        " Study Plan Generator"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 105,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TabsTrigger, {
                                    value: "quiz-maker",
                                    id: "quiz-maker",
                                    className: "text-base py-2.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$help$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircleIcon$3e$__["HelpCircleIcon"], {
                                            className: "mr-2 h-5 w-5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 109,
                                            columnNumber: 15
                                        }, this),
                                        " Quiz Maker"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 108,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TabsTrigger, {
                                    value: "key-points",
                                    id: "key-points",
                                    className: "text-base py-2.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                            className: "mr-2 h-5 w-5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 112,
                                            columnNumber: 15
                                        }, this),
                                        " Key Point Extractor"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 111,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TabsContent, {
                            value: "study-plan",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StudyPlanForm, {
                                        onSubmit: onStudyPlanSubmit,
                                        isLoading: studyPlanLoading
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 118,
                                        columnNumber: 15
                                    }, this),
                                    studyPlanLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col justify-center items-center py-8 text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                className: "h-12 w-12 animate-spin text-primary"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 121,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "ml-0 mt-4 text-lg text-muted-foreground",
                                                children: "AI is crafting your plan..."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 122,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 120,
                                        columnNumber: 17
                                    }, this),
                                    schedule && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-8 space-y-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TimetableDisplay, {
                                                timetable: schedule.timetable.map((t)=>({
                                                        ...t,
                                                        topics: t.topics || []
                                                    }))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 129,
                                                columnNumber: 19
                                            }, this),
                                            schedule.summary && schedule.summary.trim() !== "" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TimeAllocationChart, {
                                                summary: schedule.summary
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 130,
                                                columnNumber: 74
                                            }, this),
                                            resources && resources.resourceSuggestions && resources.resourceSuggestions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ResourceSuggestions, {
                                                resources: resources.resourceSuggestions
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 131,
                                                columnNumber: 110
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-center mt-6",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$study$2d$genie$2f$PdfExportButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PdfExportButton"], {
                                                    disabled: !schedule
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 133,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 132,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 128,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 117,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 116,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TabsContent, {
                            value: "quiz-maker",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-8",
                                children: !quizJson ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$study$2d$genie$2f$QuizGenerator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QuizGenerator"], {
                                    onQuizGenerated: onQuizGenerated,
                                    isLoading: quizLoading,
                                    setIsLoading: setQuizLoading,
                                    createQuizAction: async (notesText, numQuestions)=>{
                                        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$data$3a$c56454__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["handleCreateQuiz"])(notesText, numQuestions);
                                        return result;
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 143,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$study$2d$genie$2f$QuizDisplay$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QuizDisplay"], {
                                    quizJson: quizJson,
                                    onRetakeQuiz: handleRetakeQuiz
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 153,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 141,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 140,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TabsContent, {
                            value: "key-points",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-8",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$study$2d$genie$2f$KeyPointGenerator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KeyPointGenerator"], {}, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 160,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 159,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 103,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "py-6 text-center text-muted-foreground border-t",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "© ",
                            new Date().getFullYear(),
                            " StudyGenie AI. All rights reserved."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 166,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs mt-1",
                        children: "Powered by Genkit & Next.js"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 167,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 165,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=src_ec01d9c0._.js.map