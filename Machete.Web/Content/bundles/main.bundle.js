webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_auth_guard_service__ = __webpack_require__("../../../../../src/app/shared/services/auth-guard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__selective_preloading_strategy__ = __webpack_require__("../../../../../src/app/selective-preloading-strategy.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth_dashboard_dashboard_component__ = __webpack_require__("../../../../../src/app/auth/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__auth_unauthorized_unauthorized_component__ = __webpack_require__("../../../../../src/app/auth/unauthorized/unauthorized.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_oidc_client__ = __webpack_require__("../../../../oidc-client/lib/oidc-client.min.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_oidc_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_oidc_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__auth_authorize_authorize_component__ = __webpack_require__("../../../../../src/app/auth/authorize/authorize.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var appRoutes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: __WEBPACK_IMPORTED_MODULE_5__auth_dashboard_dashboard_component__["a" /* DashboardComponent */]
    },
    {
        path: 'unauthorized',
        component: __WEBPACK_IMPORTED_MODULE_6__auth_unauthorized_unauthorized_component__["a" /* UnauthorizedComponent */]
    },
    // Used to receive redirect from Identity server
    {
        path: 'authorize',
        component: __WEBPACK_IMPORTED_MODULE_8__auth_authorize_authorize_component__["a" /* AuthorizeComponent */]
    },
    //{ path: '**', component: PageNotFoundComponent }
    { path: '**', redirectTo: '/dashboard' }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
        __WEBPACK_IMPORTED_MODULE_7_oidc_client__["Log"].info('app-routing.module.ctor called');
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            //AppComponent,
            __WEBPACK_IMPORTED_MODULE_6__auth_unauthorized_unauthorized_component__["a" /* UnauthorizedComponent */],
            __WEBPACK_IMPORTED_MODULE_5__auth_dashboard_dashboard_component__["a" /* DashboardComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forRoot(appRoutes, { preloadingStrategy: __WEBPACK_IMPORTED_MODULE_4__selective_preloading_strategy__["a" /* SelectivePreloadingStrategy */] })
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_3__shared_services_auth_guard_service__["a" /* AuthGuardService */],
            __WEBPACK_IMPORTED_MODULE_4__selective_preloading_strategy__["a" /* SelectivePreloadingStrategy */]
        ]
    }),
    __metadata("design:paramtypes", [])
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"layout-wrapper\" [ngClass]=\"{'layout-compact':layoutCompact}\">\r\n\r\n    <div #layoutContainer class=\"layout-container\" \r\n            [ngClass]=\"{'menu-layout-static': !isOverlay(),\r\n            'menu-layout-overlay': isOverlay(),\r\n            'layout-menu-overlay-active': overlayMenuActive,\r\n            'menu-layout-horizontal': isHorizontal(),\r\n            'layout-menu-static-inactive': staticMenuDesktopInactive,\r\n            'layout-menu-static-active': staticMenuMobileActive}\">\r\n\r\n        <app-topbar></app-topbar>\r\n\r\n        <div class=\"layout-menu\" [ngClass]=\"{'layout-menu-dark':darkMenu}\" (click)=\"onMenuClick($event)\">\r\n            <div #layoutMenuScroller class=\"nano\">\r\n                <div class=\"nano-content menu-scroll-content\">\r\n                    <inline-profile *ngIf=\"profileMode=='inline'&&!isHorizontal()\"></inline-profile>\r\n                    <app-menu [reset]=\"resetMenu\"></app-menu>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        \r\n        <div class=\"layout-main\">\r\n            <router-outlet></router-outlet>\r\n            \r\n            <app-footer></app-footer>\r\n        </div>\r\n        \r\n        <div class=\"layout-mask\"></div>\r\n    </div>\r\n\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MenuOrientation;
(function (MenuOrientation) {
    MenuOrientation[MenuOrientation["STATIC"] = 0] = "STATIC";
    MenuOrientation[MenuOrientation["OVERLAY"] = 1] = "OVERLAY";
    MenuOrientation[MenuOrientation["HORIZONTAL"] = 2] = "HORIZONTAL";
})(MenuOrientation || (MenuOrientation = {}));
;
var AppComponent = (function () {
    function AppComponent(renderer) {
        this.renderer = renderer;
        this.layoutCompact = false;
        this.layoutMode = MenuOrientation.STATIC;
        this.darkMenu = true;
        this.profileMode = 'inline';
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.layoutContainer = this.layourContainerViewChild.nativeElement;
        this.layoutMenuScroller = this.layoutMenuScrollerViewChild.nativeElement;
        //hides the horizontal submenus or top menu if outside is clicked
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', function (event) {
            if (!_this.topbarItemClick) {
                _this.activeTopbarItem = null;
                _this.topbarMenuActive = false;
            }
            if (!_this.menuClick && _this.isHorizontal()) {
                _this.resetMenu = true;
            }
            _this.topbarItemClick = false;
            _this.menuClick = false;
        });
        setTimeout(function () {
            jQuery(_this.layoutMenuScroller).nanoScroller({ flash: true });
        }, 10);
    };
    AppComponent.prototype.onMenuButtonClick = function (event) {
        this.rotateMenuButton = !this.rotateMenuButton;
        this.topbarMenuActive = false;
        if (this.layoutMode === MenuOrientation.OVERLAY) {
            this.overlayMenuActive = !this.overlayMenuActive;
        }
        else {
            if (this.isDesktop())
                this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
            else
                this.staticMenuMobileActive = !this.staticMenuMobileActive;
        }
        event.preventDefault();
    };
    AppComponent.prototype.onMenuClick = function ($event) {
        var _this = this;
        this.menuClick = true;
        this.resetMenu = false;
        if (!this.isHorizontal()) {
            setTimeout(function () {
                jQuery(_this.layoutMenuScroller).nanoScroller();
            }, 500);
        }
    };
    AppComponent.prototype.onTopbarMenuButtonClick = function (event) {
        this.topbarItemClick = true;
        this.topbarMenuActive = !this.topbarMenuActive;
        if (this.overlayMenuActive || this.staticMenuMobileActive) {
            this.rotateMenuButton = false;
            this.overlayMenuActive = false;
            this.staticMenuMobileActive = false;
        }
        event.preventDefault();
    };
    AppComponent.prototype.onTopbarItemClick = function (event, item) {
        this.topbarItemClick = true;
        if (this.activeTopbarItem === item)
            this.activeTopbarItem = null;
        else
            this.activeTopbarItem = item;
        event.preventDefault();
    };
    AppComponent.prototype.isTablet = function () {
        var width = window.innerWidth;
        return width <= 1024 && width > 640;
    };
    AppComponent.prototype.isDesktop = function () {
        return window.innerWidth > 1024;
    };
    AppComponent.prototype.isMobile = function () {
        return window.innerWidth <= 640;
    };
    AppComponent.prototype.isOverlay = function () {
        return this.layoutMode === MenuOrientation.OVERLAY;
    };
    AppComponent.prototype.isHorizontal = function () {
        return this.layoutMode === MenuOrientation.HORIZONTAL;
    };
    AppComponent.prototype.changeToStaticMenu = function () {
        this.layoutMode = MenuOrientation.STATIC;
    };
    AppComponent.prototype.changeToOverlayMenu = function () {
        this.layoutMode = MenuOrientation.OVERLAY;
    };
    AppComponent.prototype.changeToHorizontalMenu = function () {
        this.layoutMode = MenuOrientation.HORIZONTAL;
    };
    AppComponent.prototype.ngOnDestroy = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
        }
        jQuery(this.layoutMenuScroller).nanoScroller({ flash: true });
    };
    return AppComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('layoutContainer'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], AppComponent.prototype, "layourContainerViewChild", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('layoutMenuScroller'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _b || Object)
], AppComponent.prototype, "layoutMenuScrollerViewChild", void 0);
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]) === "function" && _c || Object])
], AppComponent);

var _a, _b, _c;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.footer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppFooter; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppFooter = (function () {
    function AppFooter() {
    }
    return AppFooter;
}());
AppFooter = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-footer',
        template: "\n        <div class=\"footer\">\n            <div class=\"card clearfix\">\n                <span class=\"footer-text-left\">Machete</span>\n                <span class=\"footer-text-right\"><span class=\"ui-icon ui-icon-copyright\"></span>  <span>All Rights Reserved</span></span>\n            </div>\n        </div>\n    "
    })
], AppFooter);

//# sourceMappingURL=app.footer.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.menu.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template ngFor let-child let-i=\"index\" [ngForOf]=\"(root ? item : item.items)\">\r\n    <li [ngClass]=\"{'active-menuitem': isActive(i)}\" *ngIf=\"child.visible === false ? false : true\">\r\n        <a [href]=\"child.url||'#'\" \r\n            (click)=\"itemClick($event,child,i)\" \r\n            class=\"ripplelink\" \r\n            *ngIf=\"!child.routerLink\" \r\n            [attr.tabindex]=\"!visible ? '-1' : null\" \r\n            [attr.target]=\"child.target\">\r\n            <i class=\"material-icons\">{{child.icon}}</i>\r\n            <span>{{child.label}}</span>\r\n            <i class=\"material-icons\" *ngIf=\"child.items\">keyboard_arrow_down</i>\r\n        </a>\r\n\r\n        <a (click)=\"itemClick($event,child,i)\" \r\n            class=\"ripplelink\" \r\n            *ngIf=\"child.routerLink\"\r\n            [routerLink]=\"child.routerLink\" \r\n            routerLinkActive=\"active-menuitem-routerlink\" \r\n            [routerLinkActiveOptions]=\"{exact: true}\" \r\n            [attr.tabindex]=\"!visible ? '-1' : null\" \r\n            [attr.target]=\"child.target\">\r\n            <i class=\"material-icons\">{{child.icon}}</i>\r\n            <span>{{child.label}}</span>\r\n            <i class=\"material-icons\" *ngIf=\"child.items\">keyboard_arrow_down</i>\r\n        </a>\r\n        <ul app-submenu [item]=\"child\" *ngIf=\"child.items\" [@children]=\"isActive(i) ? 'visible' : 'hidden'\" \r\n            [visible]=\"isActive(i)\" [reset]=\"reset\"></ul>\r\n    </li>\r\n</ng-template>"

/***/ }),

/***/ "../../../../../src/app/app.menu.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__("../../../animations/@angular/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppMenuComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AppSubMenu; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var AppMenuComponent = (function () {
    function AppMenuComponent(app) {
        this.app = app;
    }
    AppMenuComponent.prototype.ngOnInit = function () {
        this.model = [
            { label: 'Place an order', icon: 'business', routerLink: ['/online-orders/introduction'] },
            { label: 'Employers', icon: 'business', routerLink: ['/employers'] },
            { label: 'Work Orders', icon: 'work', routerLink: ['/work-orders'] },
            { label: 'Dispatch', icon: 'today', url: ['/dispatch'] },
            { label: 'People', icon: 'people', url: ['/person'] },
            { label: 'Activities', icon: 'local_activity', url: ['/Activity'] },
            { label: 'Sign-ins', icon: 'track_changes', url: ['/workersignin'] },
            { label: 'Emails', icon: 'email', url: ['/email'] },
            { label: 'Reports', icon: 'subtitles', routerLink: ['/reports'] },
            { label: 'Exports', icon: 'file_download', routerLink: ['/exports'] }
        ];
    };
    return AppMenuComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], AppMenuComponent.prototype, "reset", void 0);
AppMenuComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-menu',
        template: "\n        <ul app-submenu [item]=\"model\" \n            root=\"true\" \n            class=\"ultima-menu ultima-main-menu clearfix\" \n            [reset]=\"reset\" \n            visible=\"true\"></ul>\n    "
    }),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]; }))),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]) === "function" && _a || Object])
], AppMenuComponent);

var AppSubMenu = (function () {
    function AppSubMenu(app, router, location) {
        this.app = app;
        this.router = router;
        this.location = location;
    }
    AppSubMenu.prototype.itemClick = function (event, item, index) {
        //avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }
        //activate current item and deactivate active sibling if any
        this.activeIndex = (this.activeIndex === index) ? null : index;
        //execute command
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
        //prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            event.preventDefault();
        }
        //hide menu
        if (!item.items) {
            if (this.app.isHorizontal())
                this.app.resetMenu = true;
            else
                this.app.resetMenu = false;
            this.app.overlayMenuActive = false;
            this.app.staticMenuMobileActive = false;
        }
    };
    AppSubMenu.prototype.isActive = function (index) {
        return this.activeIndex === index;
    };
    Object.defineProperty(AppSubMenu.prototype, "reset", {
        get: function () {
            return this._reset;
        },
        set: function (val) {
            this._reset = val;
            if (this._reset && this.app.isHorizontal()) {
                this.activeIndex = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    return AppSubMenu;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["MenuItem"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["MenuItem"]) === "function" && _b || Object)
], AppSubMenu.prototype, "item", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], AppSubMenu.prototype, "root", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], AppSubMenu.prototype, "visible", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], AppSubMenu.prototype, "reset", null);
AppSubMenu = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: '[app-submenu]',
        template: __webpack_require__("../../../../../src/app/app.menu.component.html"),
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["trigger"])('children', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["state"])('hidden', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({
                    height: '0px'
                })),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["state"])('visible', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({
                    height: '*'
                })),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["transition"])('visible => hidden', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["animate"])('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["transition"])('hidden => visible', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["animate"])('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
            ])
        ]
    }),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]; }))),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["Router"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["Location"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common__["Location"]) === "function" && _e || Object])
], AppSubMenu);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=app.menu.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_menu_component__ = __webpack_require__("../../../../../src/app/app.menu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_topbar_component__ = __webpack_require__("../../../../../src/app/app.topbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_footer_component__ = __webpack_require__("../../../../../src/app/app.footer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_profile_component__ = __webpack_require__("../../../../../src/app/app.profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__not_found_component__ = __webpack_require__("../../../../../src/app/not-found.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__shared_services_auth_service__ = __webpack_require__("../../../../../src/app/shared/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_oidc_client__ = __webpack_require__("../../../../oidc-client/lib/oidc-client.min.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_oidc_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_oidc_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__auth_authorize_authorize_component__ = __webpack_require__("../../../../../src/app/auth/authorize/authorize.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__shared_services_token_interceptor__ = __webpack_require__("../../../../../src/app/shared/services/token.interceptor.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__online_orders_online_orders_module__ = __webpack_require__("../../../../../src/app/online-orders/online-orders.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__reports_reports_module__ = __webpack_require__("../../../../../src/app/reports/reports.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__exports_exports_module__ = __webpack_require__("../../../../../src/app/exports/exports.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__work_orders_work_orders_module__ = __webpack_require__("../../../../../src/app/work-orders/work-orders.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__employers_employers_module__ = __webpack_require__("../../../../../src/app/employers/employers.module.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
























var AppModule = (function () {
    // Diagnostic only: inspect router configuration
    function AppModule(router) {
        if (!__WEBPACK_IMPORTED_MODULE_14__environments_environment__["a" /* environment */].production) {
            __WEBPACK_IMPORTED_MODULE_16_oidc_client__["Log"].level = __WEBPACK_IMPORTED_MODULE_16_oidc_client__["Log"].INFO;
            __WEBPACK_IMPORTED_MODULE_16_oidc_client__["Log"].logger = console;
        }
        __WEBPACK_IMPORTED_MODULE_16_oidc_client__["Log"].info('app.module.ctor()');
        //console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_8__app_menu_component__["a" /* AppMenuComponent */],
            __WEBPACK_IMPORTED_MODULE_8__app_menu_component__["b" /* AppSubMenu */],
            __WEBPACK_IMPORTED_MODULE_9__app_topbar_component__["a" /* AppTopBar */],
            __WEBPACK_IMPORTED_MODULE_10__app_footer_component__["a" /* AppFooter */],
            __WEBPACK_IMPORTED_MODULE_11__app_profile_component__["a" /* InlineProfileComponent */],
            __WEBPACK_IMPORTED_MODULE_12__not_found_component__["a" /* PageNotFoundComponent */],
            __WEBPACK_IMPORTED_MODULE_17__auth_authorize_authorize_component__["a" /* AuthorizeComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["BrowserModule"],
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_6__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_20__reports_reports_module__["a" /* ReportsModule */],
            __WEBPACK_IMPORTED_MODULE_19__online_orders_online_orders_module__["a" /* OnlineOrdersModule */],
            __WEBPACK_IMPORTED_MODULE_21__exports_exports_module__["a" /* ExportsModule */],
            __WEBPACK_IMPORTED_MODULE_22__work_orders_work_orders_module__["a" /* WorkOrdersModule */],
            __WEBPACK_IMPORTED_MODULE_23__employers_employers_module__["a" /* EmployersModule */],
            __WEBPACK_IMPORTED_MODULE_2__app_routing_module__["a" /* AppRoutingModule */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_15__shared_services_auth_service__["a" /* AuthService */],
            {
                provide: __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["b" /* HTTP_INTERCEPTORS */],
                useClass: __WEBPACK_IMPORTED_MODULE_18__shared_services_token_interceptor__["a" /* TokenInterceptor */],
                multi: true
            }
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_13__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_13__angular_router__["Router"]) === "function" && _a || Object])
], AppModule);

var _a;
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"profile\" [ngClass]=\"{'profile-expanded':active}\">\r\n    <div class=\"profile-image\"></div>\r\n    <a href=\"#\" (click)=\"onClick($event)\">\r\n        <span class=\"profile-name\">Jimmy Carter</span>\r\n        <i class=\"material-icons\">keyboard_arrow_down</i>\r\n    </a>\r\n</div>\r\n\r\n<ul class=\"ultima-menu profile-menu\" [@menu]=\"active ? 'visible' : 'hidden'\">\r\n    <li role=\"menuitem\">\r\n        <a href=\"#\" class=\"ripplelink\" [attr.tabindex]=\"!active ? '-1' : null\">\r\n            <i class=\"material-icons\">person</i>\r\n            <span>Profile</span>\r\n        </a>\r\n    </li>\r\n    <li role=\"menuitem\">\r\n        <a href=\"#\" class=\"ripplelink\" [attr.tabindex]=\"!active ? '-1' : null\">\r\n            <i class=\"material-icons\">power_settings_new</i>\r\n            <span>Logout</span>\r\n        </a>\r\n    </li>\r\n</ul>"

/***/ }),

/***/ "../../../../../src/app/app.profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InlineProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var InlineProfileComponent = (function () {
    function InlineProfileComponent() {
    }
    InlineProfileComponent.prototype.onClick = function (event) {
        this.active = !this.active;
        event.preventDefault();
    };
    return InlineProfileComponent;
}());
InlineProfileComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'inline-profile',
        template: __webpack_require__("../../../../../src/app/app.profile.component.html"),
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('menu', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('hidden', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                    height: '0px'
                })),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('visible', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                    height: '*'
                })),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('visible => hidden', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('hidden => visible', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
            ])
        ]
    })
], InlineProfileComponent);

//# sourceMappingURL=app.profile.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.topbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppTopBar; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var AppTopBar = (function () {
    function AppTopBar(app) {
        this.app = app;
    }
    return AppTopBar;
}());
AppTopBar = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-topbar',
        template: "\n        <div class=\"topbar clearfix\">\n            <div class=\"topbar-left\">            \n                <div class=\"logo\"></div>\n            </div>\n\n            <div class=\"topbar-right\">\n                <a id=\"menu-button\" href=\"#\" (click)=\"app.onMenuButtonClick($event)\">\n                    <i></i>\n                </a>\n            </div>\n        </div>\n    "
    }),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_1__app_component__["a" /* AppComponent */]; }))),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__app_component__["a" /* AppComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__app_component__["a" /* AppComponent */]) === "function" && _a || Object])
], AppTopBar);

var _a;
//# sourceMappingURL=app.topbar.component.js.map

/***/ }),

/***/ "../../../../../src/app/auth/authorize/authorize.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/auth/authorize/authorize.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\r\n  authorize works!\r\n</p>\r\n"

/***/ }),

/***/ "../../../../../src/app/auth/authorize/authorize.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_auth_service__ = __webpack_require__("../../../../../src/app/shared/services/auth.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthorizeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthorizeComponent = (function () {
    function AuthorizeComponent(auth) {
        this.auth = auth;
    }
    AuthorizeComponent.prototype.ngOnInit = function () {
        this.auth.endSigninMainWindow(this.auth.redirectUrl);
    };
    return AuthorizeComponent;
}());
AuthorizeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-authorize',
        template: __webpack_require__("../../../../../src/app/auth/authorize/authorize.component.html"),
        styles: [__webpack_require__("../../../../../src/app/auth/authorize/authorize.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_services_auth_service__["a" /* AuthService */]) === "function" && _a || Object])
], AuthorizeComponent);

var _a;
//# sourceMappingURL=authorize.component.js.map

/***/ }),

/***/ "../../../../../src/app/auth/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\r\n  <button (click)=\"clearState()\" id='clearState'>clear stale state</button>\r\n  <button (click)=\"getUser()\" id='getUser'>get user</button>\r\n  <button (click)=\"removeUser()\" id='removeUser'>remove user</button>\r\n</div>\r\n<div>\r\n  <button (click)=\"startSigninMainWindow()\" id='startSigninMainWindow'>start signin main window</button>\r\n  <button (click)=\"endSigninMainWindow()\" id='endSigninMainWindow'>end signin main window</button>\r\n</div>\r\n<div>\r\n  <button (click)=\"startSignoutMainWindow()\" id='startSignoutMainWindow'>start signout main window</button>\r\n  <button (click)=\"endSignoutMainWindow()\" id='endSignoutMainWindow'>end signout main window</button>\r\n</div>\r\n<div *ngIf=\"_user\">\r\n  <pre>{{_user | json}}</pre>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/auth/dashboard/dashboard.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "div {\n  padding: 10px;\n  margin: 10px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/auth/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_auth_service__ = __webpack_require__("../../../../../src/app/shared/services/auth.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DashboardComponent = (function () {
    function DashboardComponent(authService) {
        this.authService = authService;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadedUserSub = this.authService.userLoadededEvent
            .subscribe(function (user) {
            _this._user = user;
        });
    };
    DashboardComponent.prototype.clearState = function () {
        this.authService.clearState();
    };
    DashboardComponent.prototype.getUser = function () {
        this.authService.getUser();
    };
    DashboardComponent.prototype.removeUser = function () {
        this.authService.removeUser();
    };
    DashboardComponent.prototype.startSigninMainWindow = function () {
        this.authService.startSigninMainWindow();
    };
    DashboardComponent.prototype.endSigninMainWindow = function () {
        this.authService.endSigninMainWindow();
    };
    DashboardComponent.prototype.startSignoutMainWindow = function () {
        this.authService.startSignoutMainWindow();
    };
    DashboardComponent.prototype.endSignoutMainWindow = function () {
        this.authService.endSigninMainWindow();
    };
    DashboardComponent.prototype.ngOnDestroy = function () {
        if (this.loadedUserSub.unsubscribe()) {
            this.loadedUserSub.unsubscribe();
        }
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-dashboard',
        template: __webpack_require__("../../../../../src/app/auth/dashboard/dashboard.component.html"),
        styles: [__webpack_require__("../../../../../src/app/auth/dashboard/dashboard.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_services_auth_service__["a" /* AuthService */]) === "function" && _a || Object])
], DashboardComponent);

var _a;
//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ "../../../../../src/app/auth/unauthorized/unauthorized.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\r\n  Unauthorized Request<p> \r\n  to login click <a (click)=\"login()\">here</a>.\r\n</div>\r\n<br>\r\n<div>\r\n  To go back click <a (click)=\"goback()\">here</a>.\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/auth/unauthorized/unauthorized.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "a {\n  text-decoration: underline;\n  color: blue;\n  cursor: pointer; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/auth/unauthorized/unauthorized.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_auth_service__ = __webpack_require__("../../../../../src/app/shared/services/auth.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UnauthorizedComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UnauthorizedComponent = (function () {
    //, private location:Location
    function UnauthorizedComponent(location, service) {
        this.location = location;
        this.service = service;
    }
    UnauthorizedComponent.prototype.ngOnInit = function () {
    };
    UnauthorizedComponent.prototype.login = function () {
        this.service.startSigninMainWindow();
    };
    UnauthorizedComponent.prototype.goback = function () {
        // this.location.back();
    };
    return UnauthorizedComponent;
}());
UnauthorizedComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-unauthorized',
        template: __webpack_require__("../../../../../src/app/auth/unauthorized/unauthorized.component.html"),
        styles: [__webpack_require__("../../../../../src/app/auth/unauthorized/unauthorized.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common__["Location"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common__["Location"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_services_auth_service__["a" /* AuthService */]) === "function" && _b || Object])
], UnauthorizedComponent);

var _a, _b;
//# sourceMappingURL=unauthorized.component.js.map

/***/ }),

/***/ "../../../../../src/app/employers/employers-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__employers_component__ = __webpack_require__("../../../../../src/app/employers/employers.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployersRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var employerRoutes = [
    {
        path: 'employers',
        component: __WEBPACK_IMPORTED_MODULE_2__employers_component__["a" /* EmployersComponent */]
    }
];
var EmployersRoutingModule = (function () {
    function EmployersRoutingModule() {
    }
    return EmployersRoutingModule;
}());
EmployersRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(employerRoutes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]
        ],
        providers: []
    })
], EmployersRoutingModule);

//# sourceMappingURL=employers-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/employers/employers.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/employers/employers.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\r\n  employers works!\r\n</p>\r\n<div class=\"ui-fluid\">\r\n  <div class=\"card\">\r\n    <form [formGroup]=\"employerForm\" (ngSubmit)=\"saveEmployer()\" class=\"ui-g form-group\">\r\n      <div class=\"ui-g-12 ui-md-6\">\r\n\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4  ui-g-nopad\">\r\n            <label for=\"name\">Name</label>\r\n          </div>\r\n          <div class=\"ui-g-12  ui-md-8 ui-g-nopad\">\r\n            <span class=\"md-inputfield\">\r\n                <input class=\"ui-inputtext ng-dirty ng-invalid\" \r\n                      formControlName=\"name\" \r\n                      id=\"name\"\r\n                      type=\"text\" pInputText/>\r\n              <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!employerForm.valid && showErrors\">\r\n                {{formErrors.name}}\r\n              </div>\r\n            </span>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4  ui-g-nopad\">\r\n            <label for=\"phone\">Phone number</label>\r\n          </div>\r\n          <div class=\"ui-g-12  ui-md-8 ui-g-nopad\">\r\n            <span class=\"md-inputfield\">\r\n                <input class=\"ui-inputtext ng-dirty ng-invalid\" \r\n                      formControlName=\"phone\" \r\n                      id=\"phone\"\r\n                      type=\"text\" pInputText/>\r\n              <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!employerForm.valid && showErrors\">\r\n                {{formErrors.phone}}\r\n              </div>\r\n            </span>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4  ui-g-nopad\">\r\n            <label for=\"cellphone\">Cell phone</label>\r\n          </div>\r\n          <div class=\"ui-g-12  ui-md-8 ui-g-nopad\">\r\n            <span class=\"md-inputfield\">\r\n                <input class=\"ui-inputtext ng-dirty ng-invalid\" \r\n                      formControlName=\"cellphone\" \r\n                      id=\"cellphone\"\r\n                      type=\"text\" pInputText/>\r\n              <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!employerForm.valid && showErrors\">\r\n                {{formErrors.cellphone}}\r\n              </div>\r\n            </span>\r\n          </div>\r\n        </div>\r\n        \r\n\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4  ui-g-nopad\">\r\n            <label for=\"email\">Email</label>\r\n          </div>\r\n          <div class=\"ui-g-12  ui-md-8 ui-g-nopad\">\r\n            <span class=\"md-inputfield\">\r\n                <input class=\"ui-inputtext ng-dirty ng-invalid\" \r\n                      formControlName=\"email\" \r\n                      id=\"email\"\r\n                      type=\"text\" pInputText/>\r\n              <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!employerForm.valid && showErrors\">\r\n                {{formErrors.email}}\r\n              </div>\r\n            </span>\r\n          </div>\r\n        </div>\r\n        \r\n\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4  ui-g-nopad\">\r\n            <label for=\"referredBy\">Referred by?</label>\r\n          </div>\r\n          <div class=\"ui-g-12  ui-md-8 ui-g-nopad\">\r\n            <span class=\"md-inputfield\">\r\n                <input class=\"ui-inputtext ng-dirty ng-invalid\" \r\n                      formControlName=\"referredBy\" \r\n                      id=\"referredBy\"\r\n                      type=\"text\" pInputText/>\r\n              <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!employerForm.valid && showErrors\">\r\n                {{formErrors.referredBy}}\r\n              </div>\r\n            </span>\r\n          </div>\r\n        </div>\r\n        \r\n\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4  ui-g-nopad\">\r\n            <label for=\"referredByOther\">Referred by notes</label>\r\n          </div>\r\n          <div class=\"ui-g-12  ui-md-8 ui-g-nopad\">\r\n            <span class=\"md-inputfield\">\r\n                <input class=\"ui-inputtext ng-dirty ng-invalid\" \r\n                      formControlName=\"referredByOther\" \r\n                      id=\"referredByOther\"\r\n                      type=\"text\" pInputText/>\r\n              <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!employerForm.valid && showErrors\">\r\n                {{formErrors.referredByOther}}\r\n              </div>\r\n            </span>\r\n          </div>\r\n        </div>\r\n        \r\n        \r\n      </div>\r\n      <!-- -------------------------vertical divide---------------------------- -->\r\n      <div class=\"ui-g-12  ui-md-6\">\r\n        \r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4  ui-g-nopad\">\r\n            <label for=\"business\">Is a business?</label>\r\n          </div>\r\n          <div class=\"ui-g-12  ui-md-8 ui-g-nopad\">\r\n            <span class=\"md-inputfield\">\r\n                <input class=\"ui-inputtext ng-dirty ng-invalid\" \r\n                      formControlName=\"business\" \r\n                      id=\"business\"\r\n                      type=\"text\" pInputText/>\r\n              <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!employerForm.valid && showErrors\">\r\n                {{formErrors.business}}\r\n              </div>\r\n            </span>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4  ui-g-nopad\">\r\n            <label for=\"address1\">Address (1)</label>\r\n          </div>\r\n          <div class=\"ui-g-12  ui-md-8 ui-g-nopad\">\r\n            <span class=\"md-inputfield\">\r\n                <input class=\"ui-inputtext ng-dirty ng-invalid\" \r\n                      formControlName=\"address1\" \r\n                      id=\"address1\"\r\n                      type=\"text\" pInputText/>\r\n              <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!employerForm.valid && showErrors\">\r\n                {{formErrors.address1}}\r\n              </div>\r\n            </span>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4  ui-g-nopad\">\r\n            <label for=\"address2\">Address (2)</label>\r\n          </div>\r\n          <div class=\"ui-g-12  ui-md-8 ui-g-nopad\">\r\n            <span class=\"md-inputfield\">\r\n                <input class=\"ui-inputtext ng-dirty ng-invalid\" \r\n                      formControlName=\"address2\" \r\n                      id=\"address2\"\r\n                      type=\"text\" pInputText/>\r\n              <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!employerForm.valid && showErrors\">\r\n                {{formErrors.address1}}\r\n              </div>\r\n            </span>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4  ui-g-nopad\">\r\n            <label for=\"city\">City</label>\r\n          </div>\r\n          <div class=\"ui-g-12  ui-md-8 ui-g-nopad\">\r\n            <span class=\"md-inputfield\">\r\n                <input class=\"ui-inputtext ng-dirty ng-invalid\" \r\n                      formControlName=\"city\" \r\n                      id=\"city\"\r\n                      type=\"text\" pInputText/>\r\n              <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!employerForm.valid && showErrors\">\r\n                {{formErrors.state}}\r\n              </div>\r\n            </span>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4  ui-g-nopad\">\r\n            <label for=\"state\">State</label>\r\n          </div>\r\n          <div class=\"ui-g-12  ui-md-8 ui-g-nopad\">\r\n            <span class=\"md-inputfield\">\r\n                <input class=\"ui-inputtext ng-dirty ng-invalid\" \r\n                      formControlName=\"state\" \r\n                      id=\"state\"\r\n                      type=\"text\" pInputText/>\r\n              <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!employerForm.valid && showErrors\">\r\n                {{formErrors.state}}\r\n              </div>\r\n            </span>\r\n          </div>\r\n        </div>\r\n\r\n\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4  ui-g-nopad\">\r\n            <label for=\"zipcode\">Zipcode</label>\r\n          </div>\r\n          <div class=\"ui-g-12  ui-md-8 ui-g-nopad\">\r\n            <span class=\"md-inputfield\">\r\n                <input class=\"ui-inputtext ng-dirty ng-invalid\" \r\n                      formControlName=\"zipcode\" \r\n                      id=\"zipcode\"\r\n                      type=\"text\" pInputText/>\r\n              <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!employerForm.valid && showErrors\">\r\n                {{formErrors.state}}\r\n              </div>\r\n            </span>\r\n          </div>\r\n        </div>\r\n\r\n        \r\n      </div>\r\n      <div class=\"ui-g-12\">\r\n        <button pButton type=\"submit\" label=\"Save\"></button>\r\n      </div>\r\n    </form>\r\n  </div>\r\n</div>        "

/***/ }),

/***/ "../../../../../src/app/employers/employers.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__employers_service__ = __webpack_require__("../../../../../src/app/employers/employers.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_models_employer__ = __webpack_require__("../../../../../src/app/shared/models/employer.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lookups_lookups_service__ = __webpack_require__("../../../../../src/app/lookups/lookups.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_oidc_client__ = __webpack_require__("../../../../oidc-client/lib/oidc-client.min.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_oidc_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_oidc_client__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployersComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EmployersComponent = (function () {
    function EmployersComponent(employersService, lookupsService, fb) {
        this.employersService = employersService;
        this.lookupsService = lookupsService;
        this.fb = fb;
        this.employer = new __WEBPACK_IMPORTED_MODULE_2__shared_models_employer__["a" /* Employer */]();
        this.showErrors = false;
        this.formErrors = {
            'address1': '',
            'address2': '',
            'blogparticipate?': '',
            'business': '',
            'businessname': '',
            'cellphone': '',
            'city': '',
            'email': '',
            'fax': '',
            'name': '',
            'phone': '',
            'referredBy': '',
            'referredByOther': '',
            'state': '',
            'zipcode': ''
        };
        this.validationMessages = {
            'address1': { 'required': 'Address is required' },
            'address2': { '': '' },
            'blogparticipate': { 'required': '' },
            'business': { 'required': '' },
            'businessname': { 'required': '' },
            'cellphone': { 'required': '' },
            'city': { 'required': 'City is required' },
            'email': { 'required': 'Email is required' },
            'fax': { 'required': '' },
            'name': { 'required': 'Name is required' },
            'phone': { 'required': '' },
            'referredBy': { 'required': '' },
            'referredByOther': { 'required': '' },
            'state': { 'required': '' },
            'zipcode': { 'required': 'zipcode is required' }
        };
    }
    EmployersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.employersService.getEmployerBySubject()
            .subscribe(function (data) {
            _this.employer = data;
            _this.buildForm();
        });
        this.buildForm();
    };
    EmployersComponent.prototype.buildForm = function () {
        var _this = this;
        this.employerForm = this.fb.group({
            'id': [this.employer.id],
            'address1': [this.employer.address1, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            'address2': [this.employer.address2],
            'blogparticipate': [this.employer.blogparticipate],
            'business': [this.employer.business],
            'businessname': [this.employer.businessname],
            'cellphone': [this.employer.cellphone, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            'city': [this.employer.city, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            'email': [this.employer.email, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            'fax': [this.employer.fax],
            'name': [this.employer.name, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            'phone': [this.employer.phone, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            'referredBy': [this.employer.referredBy],
            'referredByOther': [this.employer.referredByOther],
            'state': [this.employer.state, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            'zipcode': [this.employer.zipcode, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required]
        });
        this.employerForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    EmployersComponent.prototype.onValueChanged = function (data) {
        var form = this.employerForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    EmployersComponent.prototype.saveEmployer = function () {
        __WEBPACK_IMPORTED_MODULE_5_oidc_client__["Log"].info('employers.component.saveEmployer: called');
        this.onValueChanged();
        if (this.employerForm.status === 'INVALID') {
            this.showErrors = true;
            return;
        }
        __WEBPACK_IMPORTED_MODULE_5_oidc_client__["Log"].info('employers.component.saveEmployer: valid');
        this.showErrors = false;
        var formModel = this.employerForm.value;
        this.employersService.save(formModel)
            .subscribe(function (data) { }, 
        //   this.employer = data;
        //   this.buildForm();
        // },
        function (error) {
            __WEBPACK_IMPORTED_MODULE_5_oidc_client__["Log"].info(JSON.stringify(error));
        }, function () { return __WEBPACK_IMPORTED_MODULE_5_oidc_client__["Log"].info(); });
    };
    return EmployersComponent;
}());
EmployersComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-employers',
        template: __webpack_require__("../../../../../src/app/employers/employers.component.html"),
        styles: [__webpack_require__("../../../../../src/app/employers/employers.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_1__employers_service__["a" /* EmployersService */], __WEBPACK_IMPORTED_MODULE_4__lookups_lookups_service__["a" /* LookupsService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__employers_service__["a" /* EmployersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__employers_service__["a" /* EmployersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__lookups_lookups_service__["a" /* LookupsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__lookups_lookups_service__["a" /* LookupsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"]) === "function" && _c || Object])
], EmployersComponent);

var _a, _b, _c;
//# sourceMappingURL=employers.component.js.map

/***/ }),

/***/ "../../../../../src/app/employers/employers.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__employers_component__ = __webpack_require__("../../../../../src/app/employers/employers.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__employers_routing_module__ = __webpack_require__("../../../../../src/app/employers/employers-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_primeng_primeng__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployersModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EmployersModule = (function () {
    // Diagnostic only: inspect router configuration
    function EmployersModule() {
        console.log('employers');
    }
    return EmployersModule;
}());
EmployersModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["InputTextModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ButtonModule"],
            __WEBPACK_IMPORTED_MODULE_3__employers_routing_module__["a" /* EmployersRoutingModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__employers_component__["a" /* EmployersComponent */]]
    }),
    __metadata("design:paramtypes", [])
], EmployersModule);

//# sourceMappingURL=employers.module.js.map

/***/ }),

/***/ "../../../../../src/app/employers/employers.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_handle_error__ = __webpack_require__("../../../../../src/app/shared/handle-error.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_index__ = __webpack_require__("../../../../../src/app/shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_oidc_client__ = __webpack_require__("../../../../oidc-client/lib/oidc-client.min.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_oidc_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_oidc_client__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployersService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var EmployersService = (function () {
    function EmployersService(http, auth) {
        this.http = http;
        this.auth = auth;
    }
    EmployersService.prototype.getEmployerBySubject = function () {
        var uri = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].dataUrl + '/api/employers';
        // TODO handle null sub in employerService.getOrders
        uri = uri + '?sub=' + this.auth.currentUser.profile['sub'];
        return this.http.get(uri)
            .map(function (o) { return o['data']; })
            .catch(__WEBPACK_IMPORTED_MODULE_3__shared_handle_error__["a" /* HandleError */].error);
    };
    EmployersService.prototype.save = function (employer) {
        var uri = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].dataUrl + '/api/employers';
        uri = uri + '/' + employer.id;
        __WEBPACK_IMPORTED_MODULE_5_oidc_client__["Log"].info('employers.service.save: called');
        return this.http.put(uri, JSON.stringify(employer), {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpHeaders */]().set('Content-Type', 'application/json'),
        });
        //.catch(HandleError.error);
    };
    return EmployersService;
}());
EmployersService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpClient */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__shared_index__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_index__["a" /* AuthService */]) === "function" && _b || Object])
], EmployersService);

var _a, _b;
//# sourceMappingURL=employers.service.js.map

/***/ }),

/***/ "../../../../../src/app/exports/exports-options.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/exports/exports-options.component.html":
/***/ (function(module, exports) {

module.exports = "<div [formGroup]=\"form\">\r\n  <p-dataTable  [value]=\"columns\" [responsive]=\"true\">\r\n    <p-column field=\"name\" header=\"Column name\"></p-column>\r\n    <p-column field=\"is_nullable\" header=\"Contains nulls?\"></p-column>\r\n    <p-column field=\"system_type_name\" header=\"Data type\"></p-column>\r\n    <p-column header=\"Include in export\">\r\n      <ng-template let-foo=\"rowData\" pTemplate=\"body\">\r\n        <p-inputSwitch onLabel=\"Yes\" offLabel=\"No\" [(ngModel)]=\"foo.include\" [formControlName]=\"foo.name\"></p-inputSwitch>\r\n      </ng-template>\r\n    </p-column>\r\n  </p-dataTable>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/exports/exports-options.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExportsOptionsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ExportsOptionsComponent = (function () {
    function ExportsOptionsComponent() {
        this.columns = [];
    }
    ExportsOptionsComponent.prototype.ngOnInit = function () {
    };
    return ExportsOptionsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], ExportsOptionsComponent.prototype, "columns", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormGroup"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormGroup"]) === "function" && _a || Object)
], ExportsOptionsComponent.prototype, "form", void 0);
ExportsOptionsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'exports-options',
        template: __webpack_require__("../../../../../src/app/exports/exports-options.component.html"),
        styles: [__webpack_require__("../../../../../src/app/exports/exports-options.component.css")]
    }),
    __metadata("design:paramtypes", [])
], ExportsOptionsComponent);

var _a;
//# sourceMappingURL=exports-options.component.js.map

/***/ }),

/***/ "../../../../../src/app/exports/exports-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__exports_component__ = __webpack_require__("../../../../../src/app/exports/exports.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_auth_guard_service__ = __webpack_require__("../../../../../src/app/shared/services/auth-guard.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExportsRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var exportsRoutes = [
    {
        path: 'exports',
        component: __WEBPACK_IMPORTED_MODULE_2__exports_component__["a" /* ExportsComponent */],
        canLoad: [__WEBPACK_IMPORTED_MODULE_3__shared_services_auth_guard_service__["a" /* AuthGuardService */]]
    }
];
var ExportsRoutingModule = (function () {
    function ExportsRoutingModule() {
    }
    return ExportsRoutingModule;
}());
ExportsRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(exportsRoutes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]
        ],
        providers: []
    })
], ExportsRoutingModule);

//# sourceMappingURL=exports-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/exports/exports.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/exports/exports.component.html":
/***/ (function(module, exports) {

module.exports = "<h1>Exports</h1>\r\n<div class=\"ui-g\" >\r\n  <div class=\"ui-g-12 ui-md-6\">\r\n    <p-dropdown\r\n      id=\"exportsDD\"\r\n      placeholder=\"Select a table\"\r\n      [options]=\"exportsDropDown\"\r\n      (onChange)=\"getColumns()\"\r\n      [(ngModel)]=\"selectedExportName\"\r\n      [filter]=\"true\"\r\n      [style]=\"{'width':'10em'}\"></p-dropdown>\r\n  </div>\r\n  <div class=\"ui-g-12 ui-md-6\">\r\n    <p-dropdown\r\n      placeholder=\"date field for filter\"\r\n      [options]=\"dateFilterDropDown\"\r\n      [(ngModel)]=\"selectedDateFilter\"\r\n      [style]=\"{'width':'10em'}\"></p-dropdown>\r\n  </div>\r\n  <div class=\"ui-g-12 ui-md-4 ui-lg-3\">\r\n    <p-calendar\r\n      placeholder=\"Start date\"\r\n      [showIcon]=\"true\"\r\n      [(ngModel)]=\"selectedStartDate\"\r\n      dataType=\"string\"></p-calendar>\r\n  </div>\r\n  <div class=\"ui-g-12 ui-md-4 ui-lg-3\">\r\n    <p-calendar\r\n      placeholder=\"End date\"\r\n      [showIcon]=\"true\"\r\n      [(ngModel)]=\"selectedEndDate\"\r\n      dataType=\"string\"></p-calendar>\r\n  </div>\r\n  <div class=\"ui-g-12 ui-md-4 ui-lg-3\">\r\n    <button pButton type=\"submit\" label=\"Export\" (click)=\"onSubmit()\"></button>\r\n  </div>\r\n</div>\r\n<div>\r\n    <exports-options [columns]=\"selectedColumns\" [form]=\"form\"></exports-options>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/exports/exports.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__exports_service__ = __webpack_require__("../../../../../src/app/exports/exports.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reports_reports_component__ = __webpack_require__("../../../../../src/app/reports/reports.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_file_saver__ = __webpack_require__("../../../../file-saver/FileSaver.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_file_saver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_file_saver__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_content_disposition__ = __webpack_require__("../../../../content-disposition/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_content_disposition___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_content_disposition__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExportsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ExportsComponent = (function () {
    function ExportsComponent(exportsService, _fb) {
        this.exportsService = exportsService;
        this._fb = _fb;
        this.form = new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormGroup"]({});
    }
    ExportsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.exportsService.getExportsList()
            .subscribe(function (listData) {
            _this.exports = listData;
            _this.exportsDropDown = listData.map(function (r) {
                return new __WEBPACK_IMPORTED_MODULE_2__reports_reports_component__["a" /* MySelectItem */](r.name, r.name);
            });
        }, function (error) { return _this.errorMessage = error; }, function () { return console.log('exports.component: ngOnInit onCompleted'); });
    };
    ExportsComponent.prototype.getColumns = function () {
        var _this = this;
        this.exportsService.getColumns(this.selectedExportName)
            .subscribe(function (data) {
            _this.selectedColumns = data;
            _this.dateFilterDropDown = data.filter(function (f) { return f.system_type_name === 'datetime'; })
                .map(function (r) {
                return new __WEBPACK_IMPORTED_MODULE_2__reports_reports_component__["a" /* MySelectItem */](r.name, r.name);
            });
            var group = {};
            data.forEach(function (col) {
                group[col.name] = new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormControl"](true);
            });
            _this.form = new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormGroup"](group);
        }, function (error) { return _this.errorMessage = error; }, function () { return console.log('exportsService.getColumns completed'); });
    };
    ExportsComponent.prototype.onSubmit = function () {
        var _this = this;
        var data = Object.assign({
            beginDate: this.selectedStartDate,
            endDate: this.selectedEndDate,
            filterField: this.selectedDateFilter
        }, this.form.value);
        console.log(this.form.value);
        this.exportsService.getExport(this.selectedExportName, data)
            .subscribe(function (res) {
            _this.downloadFile(res['_body'], _this.getFilename(res.headers.get('content-disposition')), res['_body'].type);
        }),
            function (error) { return _this.errorMessage = error; },
            function () { return console.log('exportsService.getColumns completed'); };
    };
    ExportsComponent.prototype.downloadFile = function (data, fileName, ttype) {
        var blob = new Blob([data], { type: ttype });
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_file_saver__["saveAs"])(blob, fileName);
    };
    ExportsComponent.prototype.getFilename = function (content) {
        return __WEBPACK_IMPORTED_MODULE_5_content_disposition__["parse"](content).parameters['filename'];
    };
    return ExportsComponent;
}());
ExportsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-exports',
        template: __webpack_require__("../../../../../src/app/exports/exports.component.html"),
        styles: [__webpack_require__("../../../../../src/app/exports/exports.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_1__exports_service__["a" /* ExportsService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__exports_service__["a" /* ExportsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__exports_service__["a" /* ExportsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormBuilder"]) === "function" && _b || Object])
], ExportsComponent);

var _a, _b;
//# sourceMappingURL=exports.component.js.map

/***/ }),

/***/ "../../../../../src/app/exports/exports.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__exports_component__ = __webpack_require__("../../../../../src/app/exports/exports.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__exports_routing_module__ = __webpack_require__("../../../../../src/app/exports/exports-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__exports_options_component__ = __webpack_require__("../../../../../src/app/exports/exports-options.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExportsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ExportsModule = (function () {
    function ExportsModule() {
        console.log('ExportsModule-ctor');
    }
    return ExportsModule;
}());
ExportsModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["e" /* JsonpModule */],
            __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["TabViewModule"],
            __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["ChartModule"],
            __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["DataTableModule"],
            __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["SharedModule"],
            __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["CalendarModule"],
            __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["ButtonModule"],
            __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["DropdownModule"],
            __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["DialogModule"],
            __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["InputSwitchModule"],
            __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["InputTextareaModule"],
            __WEBPACK_IMPORTED_MODULE_5__exports_routing_module__["a" /* ExportsRoutingModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__exports_component__["a" /* ExportsComponent */], __WEBPACK_IMPORTED_MODULE_7__exports_options_component__["a" /* ExportsOptionsComponent */]]
    }),
    __metadata("design:paramtypes", [])
], ExportsModule);

//# sourceMappingURL=exports.module.js.map

/***/ }),

/***/ "../../../../../src/app/exports/exports.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExportsService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ExportsService = (function () {
    function ExportsService(http) {
        this.http = http;
        this.uriBase = __WEBPACK_IMPORTED_MODULE_5__environments_environment__["a" /* environment */].dataUrl + '/api/exports';
    }
    ExportsService.prototype.getExportsList = function () {
        console.log('exportsService.getExportList: ' + this.uriBase);
        return this.http.get(this.uriBase)
            .map(function (res) { return res['data']; })
            .catch(this.handleError);
    };
    ExportsService.prototype.getColumns = function (tableName) {
        var uri = this.uriBase + '/' + tableName.toLowerCase();
        console.log('exportsService.getColumns ' + uri);
        return this.http.get(uri)
            .map(function (res) { return res['data']; })
            .catch(this.handleError);
    };
    ExportsService.prototype.getExport = function (tableName, o) {
        var headers = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/text' });
        var options = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["c" /* RequestOptions */]({
            headers: headers,
            responseType: __WEBPACK_IMPORTED_MODULE_4__angular_http__["f" /* ResponseContentType */].Blob
        });
        var params = this.encodeData(o);
        console.log('exportsService.getExport: ' + JSON.stringify(params));
        //const uri = this.uriBase + '/' + tableName.toLowerCase();
        var uri = this.uriBase + '/' + tableName + '/execute?' + params;
        return this.http.get(uri)
            .map(function (res) {
            return res;
        });
    };
    ExportsService.prototype.handleError = function (error) {
        console.error('ERROR', error);
        return Promise.reject(error.message || error);
    };
    ExportsService.prototype.encodeData = function (data) {
        return Object.keys(data).map(function (key) {
            return [key, data[key]].map(encodeURIComponent).join('=');
        }).join('&');
    };
    return ExportsService;
}());
ExportsService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["c" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["c" /* HttpClient */]) === "function" && _a || Object])
], ExportsService);

var _a;
//# sourceMappingURL=exports.service.js.map

/***/ }),

/***/ "../../../../../src/app/lookups/lookups.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_handle_error__ = __webpack_require__("../../../../../src/app/shared/handle-error.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LookupsService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LookupsService = (function () {
    function LookupsService(http) {
        this.http = http;
        this.uriBase = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].dataUrl + '/api/lookups';
    }
    LookupsService.prototype.getLookups = function (category) {
        var uri = this.uriBase;
        if (category) {
            uri = uri + '?category=' + category;
        }
        console.log('lookupsService.getLookups: ' + uri);
        return this.http.get(uri)
            .map(function (res) { return res['data']; })
            .catch(__WEBPACK_IMPORTED_MODULE_1__shared_handle_error__["a" /* HandleError */].error);
    };
    return LookupsService;
}());
LookupsService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpClient */]) === "function" && _a || Object])
], LookupsService);

var _a;
//# sourceMappingURL=lookups.service.js.map

/***/ }),

/***/ "../../../../../src/app/lookups/models/lookup.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Record */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Lookup; });
/**
 * Created by jcii on 6/2/17.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Record = (function () {
    function Record() {
    }
    return Record;
}());

var Lookup = (function (_super) {
    __extends(Lookup, _super);
    function Lookup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Lookup;
}(Record));

//# sourceMappingURL=lookup.js.map

/***/ }),

/***/ "../../../../../src/app/not-found.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageNotFoundComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var PageNotFoundComponent = (function () {
    function PageNotFoundComponent() {
    }
    return PageNotFoundComponent;
}());
PageNotFoundComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: '<h2>Page not found</h2>'
    })
], PageNotFoundComponent);

//# sourceMappingURL=not-found.component.js.map

/***/ }),

/***/ "../../../../../src/app/online-orders/final-confirm/final-confirm.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/online-orders/final-confirm/final-confirm.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-fluid\">\r\n  <div class=\"card\">\r\n      <div class=\"ui-g-12 ui-md-6\">\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4  ui-g-nopad\">\r\n            <label for=\"dateTimeofWork\">Time needed</label>\r\n          </div>\r\n          <div class=\"ui-g-12 ui-md-8  ui-g-nopad\">\r\n            {{order.dateTimeofWork}}\r\n          </div>\r\n        </div>\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4 ui-g-nopad\">\r\n            <label for=\"contactName\">Contact name</label>\r\n          </div>\r\n          <div class=\"ui-g-12  ui-md-8 ui-g-nopad\">\r\n            {{order.contactName}}\r\n          </div>\r\n        </div>\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4 ui-g-nopad\">\r\n            <label for=\"worksiteAddress1\">Address (1)</label>\r\n          </div>\r\n          <div class=\"ui-g-12  ui-md-8 ui-g-nopad\">\r\n            {{order.worksiteAddress1}}\r\n          </div>\r\n        </div>\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4  ui-g-nopad\">\r\n            <label for=\"worksiteAddress2\">Address (2)</label>\r\n          </div>\r\n          <div class=\"ui-g-12  ui-md-8 ui-g-nopad\">\r\n            {{order.worksiteAddress2}}\r\n          </div>\r\n        </div>\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4 ui-g-nopad\">\r\n            <label for=\"city\">City</label>\r\n          </div>\r\n          <div class=\"ui-g-12 ui-md-8 ui-g-nopad\">\r\n            {{order.city}}\r\n          </div>\r\n        </div>\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4 ui-g-nopad\">\r\n            <label for=\"state\">State</label>\r\n          </div>\r\n          <div class=\"ui-g-12 ui-md-8 ui-g-nopad\">\r\n            {{order.state}}\r\n          </div>\r\n        </div>\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4 ui-g-nopad\">\r\n            <label for=\"zipcode\">Zipcode</label>\r\n          </div>\r\n          <div class=\"ui-g-12 ui-md-8 ui-g-nopad\">\r\n            {{order.zipcode}}\r\n          </div>\r\n        </div>\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4 ui-g-nopad\">\r\n            <label for=\"phone\">Phone</label>\r\n          </div>\r\n          <div class=\"ui-g-12 ui-md-8 ui-g-nopad\">\r\n            {{order.phone}}\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"ui-g-12 ui-md-6\">\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4 ui-g-nopad\">\r\n            <label for=\"description\">Work Description</label>\r\n          </div>\r\n          <div class=\"ui-g-12 ui-md-8 ui-g-nopad\">\r\n            {{order.description}}\r\n          </div>\r\n        </div>\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4 ui-g-nopad\">\r\n            <label for=\"additionalNotes\">Additional notes to dispatcher</label>\r\n          </div>\r\n          <div class=\"ui-g-12 ui-md-8 ui-g-nopad\">\r\n            {{order.additionalNotes}}\r\n          </div>\r\n        </div>\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4 ui-g-nopad\">\r\n            <label for=\"transportMethodID\">Transport method</label>\r\n          </div>\r\n          <div class=\"ui-g-12 ui-md-8 ui-g-nopad\">\r\n            {{order.transportMethodID}}\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"ui-g-12\">\r\n        <button pButton type=\"submit\" label=\"Save\"></button>\r\n      </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/online-orders/final-confirm/final-confirm.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__work_order_work_order_service__ = __webpack_require__("../../../../../src/app/online-orders/work-order/work-order.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FinalConfirmComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FinalConfirmComponent = (function () {
    function FinalConfirmComponent(ordersService) {
        this.ordersService = ordersService;
    }
    FinalConfirmComponent.prototype.ngOnInit = function () {
        this.order = this.ordersService.get();
    };
    return FinalConfirmComponent;
}());
FinalConfirmComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-final-confirm',
        template: __webpack_require__("../../../../../src/app/online-orders/final-confirm/final-confirm.component.html"),
        styles: [__webpack_require__("../../../../../src/app/online-orders/final-confirm/final-confirm.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__work_order_work_order_service__["a" /* WorkOrderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__work_order_work_order_service__["a" /* WorkOrderService */]) === "function" && _a || Object])
], FinalConfirmComponent);

var _a;
//# sourceMappingURL=final-confirm.component.js.map

/***/ }),

/***/ "../../../../../src/app/online-orders/intro-confirm/intro-confirm.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/online-orders/intro-confirm/intro-confirm.component.html":
/***/ (function(module, exports) {

module.exports = "<strong>Please note:</strong>\r\n<ol>\r\n  <li>This order is not complete until you receive a confirmation email from Casa Latina.\r\n    If you do not hear from us or if you need a worker with 48 hours please call 206.956.0779 x3 during our\r\n    <a href=\"#\" id=\"businessHoursModal\">Business Hours</a>.\r\n  </li>\r\n  <li>Please allow a one hour window for worker(s) to arrive. This will account for transportation\r\n    routes with multiple stops and for traffic. There is no transportation fee to hire a Casa Latina\r\n    worker when you pick them up from our office. To have your worker(s) arrive at your door,\r\n    there is a <a href=\"#\" id=\"transportationMethodModal\">small fee</a> payable through this form.\r\n  </li>\r\n  <li>Casa Latina workers are not contractors. You will need to provide all tools, materials, and\r\n    safety equipment necessary for the job you wish to have done.\r\n  </li>\r\n</ol>\r\n"

/***/ }),

/***/ "../../../../../src/app/online-orders/intro-confirm/intro-confirm.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntroConfirmComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var IntroConfirmComponent = (function () {
    function IntroConfirmComponent() {
    }
    IntroConfirmComponent.prototype.ngOnInit = function () {
    };
    return IntroConfirmComponent;
}());
IntroConfirmComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-intro-confirm',
        template: __webpack_require__("../../../../../src/app/online-orders/intro-confirm/intro-confirm.component.html"),
        styles: [__webpack_require__("../../../../../src/app/online-orders/intro-confirm/intro-confirm.component.css")]
    }),
    __metadata("design:paramtypes", [])
], IntroConfirmComponent);

//# sourceMappingURL=intro-confirm.component.js.map

/***/ }),

/***/ "../../../../../src/app/online-orders/introduction/introduction.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/online-orders/introduction/introduction.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n<p>\r\n  Casa Latina connects Latino immigrant workers with individuals and businesses looking for temporary labor. Our workers are skilled and dependable. From landscaping to dry walling to catering and housecleaning, if you can dream the project our workers can do it! For more information about our program please read these Frequently Asked Questions\r\n</p>\r\n<p>\r\n  If you are ready to hire a worker, please fill out the following form.\r\n</p>\r\n<p>\r\n  If you still have questions about hiring a worker, please call us at 206.956.0779 x3.\r\n</p>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/online-orders/introduction/introduction.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntroductionComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var IntroductionComponent = (function () {
    function IntroductionComponent() {
    }
    IntroductionComponent.prototype.ngOnInit = function () {
    };
    return IntroductionComponent;
}());
IntroductionComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-introduction',
        template: __webpack_require__("../../../../../src/app/online-orders/introduction/introduction.component.html"),
        styles: [__webpack_require__("../../../../../src/app/online-orders/introduction/introduction.component.css")]
    }),
    __metadata("design:paramtypes", [])
], IntroductionComponent);

//# sourceMappingURL=introduction.component.js.map

/***/ }),

/***/ "../../../../../src/app/online-orders/online-orders-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__online_orders_component__ = __webpack_require__("../../../../../src/app/online-orders/online-orders.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__introduction_introduction_component__ = __webpack_require__("../../../../../src/app/online-orders/introduction/introduction.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__intro_confirm_intro_confirm_component__ = __webpack_require__("../../../../../src/app/online-orders/intro-confirm/intro-confirm.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__work_order_work_order_component__ = __webpack_require__("../../../../../src/app/online-orders/work-order/work-order.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__work_assignments_work_assignments_component__ = __webpack_require__("../../../../../src/app/online-orders/work-assignments/work-assignments.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__final_confirm_final_confirm_component__ = __webpack_require__("../../../../../src/app/online-orders/final-confirm/final-confirm.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_services_auth_guard_service__ = __webpack_require__("../../../../../src/app/shared/services/auth-guard.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OnlineOrdersRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var onlineOrderRoutes = [
    {
        path: 'online-orders',
        component: __WEBPACK_IMPORTED_MODULE_2__online_orders_component__["a" /* OnlineOrdersComponent */],
        canLoad: [__WEBPACK_IMPORTED_MODULE_8__shared_services_auth_guard_service__["a" /* AuthGuardService */]],
        children: [
            {
                path: 'introduction',
                component: __WEBPACK_IMPORTED_MODULE_3__introduction_introduction_component__["a" /* IntroductionComponent */],
                canLoad: [__WEBPACK_IMPORTED_MODULE_8__shared_services_auth_guard_service__["a" /* AuthGuardService */]]
            },
            {
                path: 'intro-confirm',
                component: __WEBPACK_IMPORTED_MODULE_4__intro_confirm_intro_confirm_component__["a" /* IntroConfirmComponent */],
                canLoad: [__WEBPACK_IMPORTED_MODULE_8__shared_services_auth_guard_service__["a" /* AuthGuardService */]]
            },
            {
                path: 'work-order',
                component: __WEBPACK_IMPORTED_MODULE_5__work_order_work_order_component__["a" /* WorkOrderComponent */],
                canLoad: [__WEBPACK_IMPORTED_MODULE_8__shared_services_auth_guard_service__["a" /* AuthGuardService */]]
            },
            {
                path: 'work-assignments',
                component: __WEBPACK_IMPORTED_MODULE_6__work_assignments_work_assignments_component__["a" /* WorkAssignmentsComponent */],
                canLoad: [__WEBPACK_IMPORTED_MODULE_8__shared_services_auth_guard_service__["a" /* AuthGuardService */]]
            },
            {
                path: 'final-confirm',
                component: __WEBPACK_IMPORTED_MODULE_7__final_confirm_final_confirm_component__["a" /* FinalConfirmComponent */],
                canLoad: [__WEBPACK_IMPORTED_MODULE_8__shared_services_auth_guard_service__["a" /* AuthGuardService */]]
            }
        ]
    },
];
var OnlineOrdersRoutingModule = (function () {
    function OnlineOrdersRoutingModule() {
    }
    return OnlineOrdersRoutingModule;
}());
OnlineOrdersRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(onlineOrderRoutes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]
        ],
        providers: []
    })
], OnlineOrdersRoutingModule);

//# sourceMappingURL=online-orders-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/online-orders/online-orders.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/online-orders/online-orders.component.html":
/***/ (function(module, exports) {

module.exports = "<h1>\r\n  Hire a Worker Online Order Form\r\n</h1>\r\n<p-steps [model]=\"items\" [readonly]=\"false\" [(activeIndex)]=\"activeIndex\" ></p-steps>\r\n<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ "../../../../../src/app/online-orders/online-orders.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lookups_lookups_service__ = __webpack_require__("../../../../../src/app/lookups/lookups.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__online_orders_service__ = __webpack_require__("../../../../../src/app/online-orders/online-orders.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__work_assignments_work_assignment_service__ = __webpack_require__("../../../../../src/app/online-orders/work-assignments/work-assignment.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__work_order_work_order_service__ = __webpack_require__("../../../../../src/app/online-orders/work-order/work-order.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__employers_employers_service__ = __webpack_require__("../../../../../src/app/employers/employers.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OnlineOrdersComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var OnlineOrdersComponent = (function () {
    function OnlineOrdersComponent() {
        this.activeIndex = 0;
    }
    OnlineOrdersComponent.prototype.ngOnInit = function () {
        this.items = [
            { label: 'Introduction', routerLink: ['introduction'] },
            { label: 'Confirm', routerLink: ['intro-confirm'] },
            { label: 'work site details', routerLink: ['work-order'] },
            { label: 'worker details', routerLink: ['work-assignments'] },
            { label: 'finalize', routerLink: ['final-confirm'] }
        ];
    };
    return OnlineOrdersComponent;
}());
OnlineOrdersComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-online-orders',
        template: __webpack_require__("../../../../../src/app/online-orders/online-orders.component.html"),
        styles: [__webpack_require__("../../../../../src/app/online-orders/online-orders.component.css")],
        providers: [
            __WEBPACK_IMPORTED_MODULE_1__lookups_lookups_service__["a" /* LookupsService */],
            __WEBPACK_IMPORTED_MODULE_6__employers_employers_service__["a" /* EmployersService */],
            __WEBPACK_IMPORTED_MODULE_2__online_orders_service__["a" /* OnlineOrdersService */],
            __WEBPACK_IMPORTED_MODULE_5__work_order_work_order_service__["a" /* WorkOrderService */],
            __WEBPACK_IMPORTED_MODULE_4__work_assignments_work_assignment_service__["a" /* WorkAssignmentService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"]
        ]
    }),
    __metadata("design:paramtypes", [])
], OnlineOrdersComponent);

//# sourceMappingURL=online-orders.component.js.map

/***/ }),

/***/ "../../../../../src/app/online-orders/online-orders.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__introduction_introduction_component__ = __webpack_require__("../../../../../src/app/online-orders/introduction/introduction.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__online_orders_component__ = __webpack_require__("../../../../../src/app/online-orders/online-orders.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__intro_confirm_intro_confirm_component__ = __webpack_require__("../../../../../src/app/online-orders/intro-confirm/intro-confirm.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__work_order_work_order_component__ = __webpack_require__("../../../../../src/app/online-orders/work-order/work-order.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__work_assignments_work_assignments_component__ = __webpack_require__("../../../../../src/app/online-orders/work-assignments/work-assignments.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__final_confirm_final_confirm_component__ = __webpack_require__("../../../../../src/app/online-orders/final-confirm/final-confirm.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__online_orders_routing_module__ = __webpack_require__("../../../../../src/app/online-orders/online-orders-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OnlineOrdersModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var OnlineOrdersModule = (function () {
    function OnlineOrdersModule() {
    }
    return OnlineOrdersModule;
}());
OnlineOrdersModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["StepsModule"],
            __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["DropdownModule"],
            __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["CalendarModule"],
            __WEBPACK_IMPORTED_MODULE_10__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_10__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["DataTableModule"],
            __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["InputSwitchModule"],
            __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["MessagesModule"],
            __WEBPACK_IMPORTED_MODULE_8__online_orders_routing_module__["a" /* OnlineOrdersRoutingModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__introduction_introduction_component__["a" /* IntroductionComponent */],
            __WEBPACK_IMPORTED_MODULE_3__online_orders_component__["a" /* OnlineOrdersComponent */],
            __WEBPACK_IMPORTED_MODULE_4__intro_confirm_intro_confirm_component__["a" /* IntroConfirmComponent */],
            __WEBPACK_IMPORTED_MODULE_5__work_order_work_order_component__["a" /* WorkOrderComponent */],
            __WEBPACK_IMPORTED_MODULE_6__work_assignments_work_assignments_component__["a" /* WorkAssignmentsComponent */],
            __WEBPACK_IMPORTED_MODULE_7__final_confirm_final_confirm_component__["a" /* FinalConfirmComponent */]
        ]
    })
], OnlineOrdersModule);

//# sourceMappingURL=online-orders.module.js.map

/***/ }),

/***/ "../../../../../src/app/online-orders/online-orders.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OnlineOrdersService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var OnlineOrdersService = (function () {
    function OnlineOrdersService() {
    }
    return OnlineOrdersService;
}());
OnlineOrdersService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], OnlineOrdersService);

//# sourceMappingURL=online-orders.service.js.map

/***/ }),

/***/ "../../../../../src/app/online-orders/work-assignments/models/worker-request.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkerRequest; });
/**
 * Created by jcii on 5/31/17.
 */
var WorkerRequest = (function () {
    function WorkerRequest() {
        this.requiresHeavyLifting = false;
    }
    return WorkerRequest;
}());

//# sourceMappingURL=worker-request.js.map

/***/ }),

/***/ "../../../../../src/app/online-orders/work-assignments/work-assignment.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_oidc_client__ = __webpack_require__("../../../../oidc-client/lib/oidc-client.min.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_oidc_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_oidc_client__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkAssignmentService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WorkAssignmentService = (function () {
    function WorkAssignmentService() {
        this.requests = new Array();
        __WEBPACK_IMPORTED_MODULE_1_oidc_client__["Log"].info('online-orders.work-assignment.service: ' + JSON.stringify(this.getAll()));
    }
    WorkAssignmentService.prototype.getAll = function () {
        return this.requests;
    };
    WorkAssignmentService.prototype.create = function (request) {
        this.requests.push(request);
    };
    WorkAssignmentService.prototype.save = function (request) {
        var index = this.findSelectedRequestIndex(request);
        this.requests[index] = request;
    };
    WorkAssignmentService.prototype.getNextRequestId = function () {
        var sorted = this.requests.sort(this.sort);
        if (sorted.length === 0) {
            return 1;
        }
        else {
            return sorted[sorted.length - 1].id + 1;
        }
    };
    WorkAssignmentService.prototype.sort = function (a, b) {
        if (a.id < b.id) {
            return -1;
        }
        if (a.id > b.id) {
            return 1;
        }
        return 0;
    };
    WorkAssignmentService.prototype.delete = function (request) {
        var index = this.requests.indexOf(request);
        if (index > -1) {
            this.requests.splice(index, 1);
        }
    };
    WorkAssignmentService.prototype.clear = function () { };
    WorkAssignmentService.prototype.findSelectedRequestIndex = function (request) {
        return this.requests.findIndex(function (a) { return a.id === request.id; });
    };
    return WorkAssignmentService;
}());
WorkAssignmentService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], WorkAssignmentService);

//# sourceMappingURL=work-assignment.service.js.map

/***/ }),

/***/ "../../../../../src/app/online-orders/work-assignments/work-assignments.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/online-orders/work-assignments/work-assignments.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-fluid\">\r\n  <div class=\"card\">\r\n    <form [formGroup]=\"requestForm\" (ngSubmit)=\"saveRequest()\" class=\"ui-g form-group\">\r\n      <div class=\"ui-g-12 ui-md-6\">\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4 ui-g-nopad\">\r\n            <label for=\"skillsList\">Skill needed</label>\r\n          </div>\r\n          <div class=\"ui-g-12 ui-md-8 ui-g-nopad\">\r\n            <p-dropdown id=\"skillsList\"\r\n                        [options]=\"skillsDropDown\"\r\n                        formControlName=\"skillId\"\r\n                        [(ngModel)]=\"request.skillId\"\r\n                        (onChange)=\"selectSkill(request.skillId)\"\r\n                        [autoWidth]=\"false\"\r\n                        placeholder=\"Select a skill\"></p-dropdown>\r\n\r\n          </div>\r\n        </div>\r\n        <div class=\"ui-g-12 ui-g-nopad\">\r\n          <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!requestForm.controls['skillId'].valid && showErrors\">\r\n            {{formErrors.skillId}}\r\n          </div>\r\n        </div>\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4 ui-g-nopad\">\r\n            <label for=\"hours\">Hours needed</label>\r\n          </div>\r\n          <div class=\"ui-g-12 ui-md-8 ui-g-nopad\">\r\n            <input class=\"ui-inputtext\" formControlName=\"hours\" id=\"hours\" type=\"text\" pInputText/>\r\n          </div>\r\n        </div>\r\n        <div class=\"ui-g-12 ui-g-nopad\">\r\n          <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!requestForm.controls['hours'].valid && showErrors\">\r\n            {{formErrors.hours}}\r\n          </div>\r\n        </div>\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4 ui-g-nopad\">\r\n            <label for=\"requiresHeavyLifting\">Requires heavy lifting?</label>\r\n          </div>\r\n          <div class=\"ui-g-12 ui-md-8 ui-g-nopad\">\r\n            <p-inputSwitch id=\"requiresHeavyLifting\" formControlName=\"requiresHeavyLifting\"></p-inputSwitch>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4 ui-g-nopad\">\r\n            <label for=\"description\">Additional info about job</label>\r\n          </div>\r\n          <div class=\"ui-g-12 ui-md-8 ui-g-nopad\">\r\n            <textarea rows=\"3\" class=\"ui-inputtext\" formControlName=\"description\" id=\"description\" type=\"text\" pInputText></textarea>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"ui-g-12 ui-md-6\">\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4 ui-g-nopad\">\r\n            Skill description\r\n          </div>\r\n          <div class=\"ui-g-12 ui-md-8 ui-g-nopad\">\r\n            {{this.selectedSkill.skillDescriptionEn}}\r\n          </div>\r\n        </div>\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4 ui-g-nopad\">\r\n            Hourly rate\r\n          </div>\r\n          <div class=\"ui-g-12 ui-md-8 ui-g-nopad\">\r\n            {{this.selectedSkill.wage}}\r\n          </div>\r\n        </div>\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4 ui-g-nopad\">\r\n            Minimum time\r\n          </div>\r\n          <div class=\"ui-g-12 ui-md-8 ui-g-nopad\">\r\n            {{this.selectedSkill.minHour}}\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"ui-g-12\">\r\n        <button pButton type=\"submit\" label=\"Save\"></button>\r\n      </div>\r\n    </form>\r\n\r\n    <p-dataTable [value]=\"requestList\" [(selection)]=\"selectedRequest\" (onRowSelect)=\"onRowSelect($event)\" [responsive]=\"true\">\r\n      <p-column field=\"skill\" header=\"Skill needed\"></p-column>\r\n      <p-column field=\"hours\" header=\"hours requested\"></p-column>\r\n      <p-column field=\"description\" header=\"notes\"></p-column>\r\n      <p-column field=\"requiresHeavyLifting\" header=\"Heavy lifting?\"></p-column>\r\n      <p-column field=\"wage\" header=\"Hourly wage\"></p-column>\r\n\r\n      <p-column styleClass=\"col-button\">\r\n        <ng-template pTemplate=\"header\">\r\n          Actions\r\n        </ng-template>\r\n        <ng-template let-request=\"rowData\" pTemplate=\"body\">\r\n          <button type=\"button\" pButton (click)=\"editRequest(request)\" icon=\"ui-icon-edit\"></button>\r\n          <button type=\"button\" pButton (click)=\"deleteRequest(request)\" icon=\"ui-icon-delete\"></button>\r\n        </ng-template>\r\n      </p-column>\r\n    </p-dataTable>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/online-orders/work-assignments/work-assignments.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reports_reports_component__ = __webpack_require__("../../../../../src/app/reports/reports.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_worker_request__ = __webpack_require__("../../../../../src/app/online-orders/work-assignments/models/worker-request.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lookups_lookups_service__ = __webpack_require__("../../../../../src/app/lookups/lookups.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lookups_models_lookup__ = __webpack_require__("../../../../../src/app/lookups/models/lookup.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__work_assignment_service__ = __webpack_require__("../../../../../src/app/online-orders/work-assignments/work-assignment.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkAssignmentsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var WorkAssignmentsComponent = (function () {
    function WorkAssignmentsComponent(lookupsService, waService, fb) {
        this.lookupsService = lookupsService;
        this.waService = waService;
        this.fb = fb;
        this.selectedSkill = new __WEBPACK_IMPORTED_MODULE_5__lookups_models_lookup__["a" /* Lookup */]();
        this.requestList = new Array(); // list built by user in UI
        this.request = new __WEBPACK_IMPORTED_MODULE_3__models_worker_request__["a" /* WorkerRequest */](); // composed by UI to make/edit a request
        this.newRequest = true;
        this.showErrors = false;
        this.formErrors = {
            'skillId': '',
            'skill': '',
            'hours': '',
            'description': '',
            'requiresHeavyLifting': '',
            'wage': ''
        };
        this.validationMessages = {
            'skillId': { 'required': 'Please select the type of work to be performed.' },
            'skill': { 'required': 'skill is required.' },
            'hours': { 'required': 'Please enter the number of hours needed.' },
            'description': { 'required': 'description is required.' },
            'requiresHeavyLifting': { 'required': 'requiresHeavyLifting is required.' },
            'wage': { 'required': 'wage is required.' }
        };
    }
    WorkAssignmentsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.lookupsService.getLookups('skill')
            .subscribe(function (listData) {
            _this.skills = listData;
            _this.skillsDropDown = listData.map(function (l) {
                return new __WEBPACK_IMPORTED_MODULE_2__reports_reports_component__["a" /* MySelectItem */](l.text_EN, String(l.id));
            });
        }, function (error) { return _this.errorMessage = error; }, function () { return console.log('work-assignments.component: ngOnInit onCompleted'); });
        this.requestList = this.waService.getAll();
        this.buildForm();
    };
    WorkAssignmentsComponent.prototype.buildForm = function () {
        var _this = this;
        this.requestForm = this.fb.group({
            'id': '',
            'skillId': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            'skill': [''],
            'hours': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            'description': [''],
            'requiresHeavyLifting': [false, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            'wage': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required]
        });
        this.requestForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    WorkAssignmentsComponent.prototype.onValueChanged = function (data) {
        var form = this.requestForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    WorkAssignmentsComponent.prototype.selectSkill = function (skillId) {
        var skill = this.skills.filter(function (f) { return f.id === Number(skillId); }).shift();
        if (skill === null) {
            throw new Error('Can\'t find selected skill in component\'s list');
        }
        this.selectedSkill = skill;
        this.requestForm.controls['skill'].setValue(skill.text_EN);
        this.requestForm.controls['wage'].setValue(skill.wage);
    };
    WorkAssignmentsComponent.prototype.editRequest = function (request) {
        this.requestForm.controls['id'].setValue(request.id);
        this.requestForm.controls['skillId'].setValue(request.skillId);
        this.requestForm.controls['skill'].setValue(request.skill);
        this.requestForm.controls['hours'].setValue(request.hours);
        this.requestForm.controls['description'].setValue(request.description);
        this.requestForm.controls['requiresHeavyLifting'].setValue(request.requiresHeavyLifting);
        this.requestForm.controls['wage'].setValue(request.wage);
        this.newRequest = false;
    };
    WorkAssignmentsComponent.prototype.deleteRequest = function (request) {
        this.waService.delete(request);
        this.requestList = this.waService.getAll().slice();
        this.requestForm.reset();
        this.newRequest = true;
    };
    WorkAssignmentsComponent.prototype.saveRequest = function () {
        this.onValueChanged();
        if (this.requestForm.status === 'INVALID') {
            this.showErrors = true;
            return;
        }
        this.showErrors = false;
        var formModel = this.requestForm.value;
        var saveRequest = {
            id: formModel.id || this.waService.getNextRequestId(),
            skillId: formModel.skillId,
            skill: formModel.skill,
            hours: formModel.hours,
            description: formModel.description,
            requiresHeavyLifting: formModel.requiresHeavyLifting,
            wage: formModel.wage
        };
        if (this.newRequest) {
            this.waService.create(saveRequest);
        }
        else {
            this.waService.save(saveRequest);
        }
        this.requestList = this.waService.getAll().slice();
        this.requestForm.reset();
        this.buildForm();
        this.newRequest = true;
    };
    WorkAssignmentsComponent.prototype.onRowSelect = function (event) {
        this.newRequest = false;
        this.request = this.cloneRequest(event.data);
    };
    WorkAssignmentsComponent.prototype.cloneRequest = function (c) {
        var request = new __WEBPACK_IMPORTED_MODULE_3__models_worker_request__["a" /* WorkerRequest */]();
        for (var prop in c) {
            request[prop] = c[prop];
        }
        return request;
    };
    return WorkAssignmentsComponent;
}());
WorkAssignmentsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-work-assignments',
        template: __webpack_require__("../../../../../src/app/online-orders/work-assignments/work-assignments.component.html"),
        styles: [__webpack_require__("../../../../../src/app/online-orders/work-assignments/work-assignments.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__lookups_lookups_service__["a" /* LookupsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__lookups_lookups_service__["a" /* LookupsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_6__work_assignment_service__["a" /* WorkAssignmentService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__work_assignment_service__["a" /* WorkAssignmentService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"]) === "function" && _c || Object])
], WorkAssignmentsComponent);

var _a, _b, _c;
//# sourceMappingURL=work-assignments.component.js.map

/***/ }),

/***/ "../../../../../src/app/online-orders/work-order/models/work-order.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkOrder; });
/**
 * Created by jcii on 6/10/17.
 */
var WorkOrder = (function () {
    function WorkOrder() {
    }
    return WorkOrder;
}());

//# sourceMappingURL=work-order.js.map

/***/ }),

/***/ "../../../../../src/app/online-orders/work-order/work-order.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/online-orders/work-order/work-order.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-fluid\">\r\n  <div class=\"card\">\r\n    <form [formGroup]=\"orderForm\" (ngSubmit)=\"save()\" class=\"ui-g form-group\">\r\n      <div class=\"ui-g-12 ui-md-6\">\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4  ui-g-nopad\">\r\n            <label for=\"dateTimeofWork\">Time needed</label>\r\n          </div>\r\n          <div class=\"ui-g-12 ui-md-8  ui-g-nopad\">\r\n                <span class=\"md-inputfield\">\r\n                <p-calendar id=\"dateTimeofWork\"\r\n                            showTime=\"true\"\r\n                            stepMinute=\"15\"\r\n                            defaultDate=\"\"\r\n                            formControlName=\"dateTimeofWork\">\r\n                </p-calendar>\r\n                <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!orderForm.valid && showErrors\">\r\n                  {{formErrors.dateTimeofWork}}\r\n                </div>\r\n                </span>\r\n          </div>\r\n        </div>\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4 ui-g-nopad\">\r\n            <label for=\"contactName\">Contact name</label>\r\n          </div>\r\n          <div class=\"ui-g-12  ui-md-8 ui-g-nopad\">\r\n                <span class=\"md-inputfield\">\r\n                  <input class=\"ui-inputtext ng-dirty ng-invalid\" formControlName=\"contactName\" id=\"contactName\"\r\n                         type=\"text\" pInputText/>\r\n                  <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!orderForm.valid && showErrors\">\r\n                    {{formErrors.contactName}}\r\n                  </div>\r\n                </span>\r\n          </div>\r\n        </div>\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4 ui-g-nopad\">\r\n            <label for=\"worksiteAddress1\">Address (1)</label>\r\n          </div>\r\n          <div class=\"ui-g-12  ui-md-8 ui-g-nopad\">\r\n                <span class=\"md-inputfield\">\r\n                  <input class=\"ui-inputtext\" formControlName=\"worksiteAddress1\" id=\"worksiteAddress1\" type=\"text\"\r\n                         pInputText/>\r\n                  <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!orderForm.valid && showErrors\">\r\n                    {{formErrors.worksiteAddress1}}\r\n                  </div>\r\n                </span>\r\n          </div>\r\n        </div>\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4  ui-g-nopad\">\r\n            <label for=\"worksiteAddress2\">Address (2)</label>\r\n          </div>\r\n          <div class=\"ui-g-12  ui-md-8 ui-g-nopad\">\r\n            <input class=\"ui-inputtext\" formControlName=\"worksiteAddress2\" id=\"worksiteAddress2\" type=\"text\"\r\n                   pInputText/>\r\n          </div>\r\n        </div>\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4 ui-g-nopad\">\r\n            <label for=\"city\">City</label>\r\n          </div>\r\n          <div class=\"ui-g-12 ui-md-8 ui-g-nopad\">\r\n            <span class=\"md-inputfield\">\r\n              <input class=\"ui-inputtext\" formControlname=\"city\" id=\"city\" type=\"text\" pInputText/>\r\n              <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!orderForm.valid && showErrors\">\r\n                  {{formErrors.city}}\r\n              </div>\r\n            </span>\r\n          </div>\r\n        </div>\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4 ui-g-nopad\">\r\n            <label for=\"state\">State</label>\r\n          </div>\r\n          <div class=\"ui-g-12 ui-md-8 ui-g-nopad\">\r\n            <span class=\"md-inputfield\">\r\n              <input class=\"ui-inputtext\" formControlName=\"state\" id=\"state\" type=\"text\" pInputText/>\r\n              <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!orderForm.valid && showErrors\">\r\n                  {{formErrors.state}}\r\n              </div>\r\n            </span>\r\n          </div>\r\n        </div>\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4 ui-g-nopad\">\r\n            <label for=\"zipcode\">Zipcode</label>\r\n          </div>\r\n          <div class=\"ui-g-12 ui-md-8 ui-g-nopad\">\r\n            <span class=\"md-inputfield\">\r\n              <input class=\"ui-inputtext\" formControlName=\"zipcode\" id=\"zipcode\" type=\"text\" pInputText/>\r\n              <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!orderForm.valid && showErrors\">\r\n                  {{formErrors.zipcode}}\r\n              </div>\r\n            </span>\r\n          </div>\r\n        </div>\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4 ui-g-nopad\">\r\n            <label for=\"phone\">Phone</label>\r\n          </div>\r\n          <div class=\"ui-g-12 ui-md-8 ui-g-nopad\">\r\n            <span class=\"md-inputfield\">\r\n              <input class=\"ui-inputtext\" formControlName=\"phone\" id=\"phone\" type=\"text\" pInputText/>\r\n              <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!orderForm.valid && showErrors\">\r\n                  {{formErrors.phone}}\r\n              </div>\r\n            </span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"ui-g-12 ui-md-6\">\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4 ui-g-nopad\">\r\n            <label for=\"description\">Work Description</label>\r\n          </div>\r\n          <div class=\"ui-g-12 ui-md-8 ui-g-nopad\">\r\n            <textarea rows=\"5\" pInputTextarea autoResize=\"autoResize\" class=\"ui-inputtextarea\"\r\n                      formControlName=\"description\" id=\"description\" type=\"text\"></textarea>\r\n          </div>\r\n        </div>\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4 ui-g-nopad\">\r\n            <label for=\"additionalNotes\">Additional notes to dispatcher</label>\r\n          </div>\r\n          <div class=\"ui-g-12 ui-md-8 ui-g-nopad\">\r\n            <textarea rows=\"5\" pInputTextarea autoResize=\"autoResize\" class=\"ui-inputtextarea\"\r\n                      formControlname=\"additionalNotes\" id=\"additionalNotes\" type=\"text\"></textarea>\r\n          </div>\r\n        </div>\r\n        <div class=\"ui-g-12\">\r\n          <div class=\"ui-g-12 ui-md-4 ui-g-nopad\">\r\n            <label for=\"transportMethodID\">Transport method</label>\r\n          </div>\r\n          <div class=\"ui-g-12 ui-md-8 ui-g-nopad\">\r\n            <span class=\"md-inputfield\">\r\n              <p-dropdown id=\"transportMethodID\" [options]=\"transportMethodsDropDown\" formControlName=\"selectedTransportMethod\"\r\n                          [autoWidth]=\"false\"></p-dropdown>\r\n              <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!orderForm.valid && showErrors\">\r\n                  {{formErrors.transportMethodID}}\r\n              </div>\r\n            </span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"ui-g-12\">\r\n        <button pButton type=\"submit\" label=\"Save\"></button>\r\n      </div>\r\n    </form>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/online-orders/work-order/work-order.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reports_reports_component__ = __webpack_require__("../../../../../src/app/reports/reports.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_work_order__ = __webpack_require__("../../../../../src/app/online-orders/work-order/models/work-order.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lookups_lookups_service__ = __webpack_require__("../../../../../src/app/lookups/lookups.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__work_order_service__ = __webpack_require__("../../../../../src/app/online-orders/work-order/work-order.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkOrderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var WorkOrderComponent = (function () {
    function WorkOrderComponent(lookupsService, orderService, fb) {
        this.lookupsService = lookupsService;
        this.orderService = orderService;
        this.fb = fb;
        this.order = new __WEBPACK_IMPORTED_MODULE_3__models_work_order__["a" /* WorkOrder */]();
        this.showErrors = false;
        this.newOrder = true;
        this.formErrors = {
            'dateTimeofWork': '',
            'contactName': '',
            'worksiteAddress1': '',
            'worksiteAddress2': '',
            'city': '',
            'state': '',
            'zipcode': '',
            'phone': '',
            'description': '',
            'additionalNotes': '',
            'transportMethodID': ''
        };
        this.validationMessages = {
            'dateTimeofWork': { 'required': 'Date & time is required.' },
            'contactName': { 'required': 'Contact name is required.' },
            'worksiteAddress1': { 'required': 'Address is required.' },
            'worksiteAddress2': {},
            'city': { 'required': 'City is required.' },
            'state': { 'required': 'State is required.' },
            'zipcode': { 'required': 'Zip code is required.' },
            'phone': { 'required': 'Phone is required.' },
            'description': { 'required': 'Description is required.' },
            'additionalNotes': {},
            'transportMethodID': { 'required': 'skill is required.' }
        };
    }
    WorkOrderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.buildForm();
        this.lookupsService.getLookups('transportmethod')
            .subscribe(function (listData) {
            _this.transportMethods = listData;
            _this.transportMethodsDropDown = listData.map(function (l) {
                return new __WEBPACK_IMPORTED_MODULE_1__reports_reports_component__["a" /* MySelectItem */](l.text_EN, String(l.id));
            });
        }, function (error) { return _this.errorMessage = error; }, function () { return console.log('work-assignments.component: ngOnInit onCompleted'); });
        this.orderService.loadProfile()
            .subscribe(function (data) {
            _this.order = _this.mapOrderFrom(data);
            _this.buildForm();
        });
    };
    WorkOrderComponent.prototype.mapOrderFrom = function (employer) {
        var order = new __WEBPACK_IMPORTED_MODULE_3__models_work_order__["a" /* WorkOrder */]();
        order.contactName = employer.name;
        order.worksiteAddress1 = employer.address1;
        order.worksiteAddress2 = employer.address2;
        order.city = employer.city;
        order.state = employer.state;
        order.zipcode = employer.zipcode;
        return order;
    };
    WorkOrderComponent.prototype.buildForm = function () {
        var _this = this;
        this.orderForm = this.fb.group({
            'dateTimeofWork': [this.order.dateTimeofWork, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            'contactName': [this.order.contactName, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            'worksiteAddress1': [this.order.worksiteAddress1, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            'worksiteAddress2': [this.order.worksiteAddress2, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            'city': [this.order.city, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            'state': [this.order.state, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            'zipcode': [this.order.zipcode, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            'phone': [this.order.phone, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            'description': [this.order.description, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            'additionalNotes': '',
            'selectedTransportMethod': [this.order.transportMethodID, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required]
        });
        this.orderForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    WorkOrderComponent.prototype.onValueChanged = function (data) {
        var form = this.orderForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    WorkOrderComponent.prototype.loadOrder = function () {
    };
    WorkOrderComponent.prototype.saveOrder = function () {
        this.onValueChanged();
        if (this.orderForm.status === 'INVALID') {
            this.showErrors = true;
            return;
        }
        this.showErrors = false;
        var order = this.prepareOrderForSave();
        if (this.newOrder) {
            this.orderService.create(order);
        }
        else {
            this.orderService.save(order);
        }
        this.newOrder = false;
    };
    WorkOrderComponent.prototype.prepareOrderForSave = function () {
        var formModel = this.orderForm.value;
        var order = {
            dateTimeofWork: formModel.dateTimeofWork,
            contactName: formModel.contactName,
            worksiteAddress1: formModel.worksiteAddress1,
            worksiteAddress2: formModel.worksiteAddress2,
            city: formModel.city,
            state: formModel.state,
            zipcode: formModel.zipcode,
            phone: formModel.phone,
            description: formModel.description,
            additionalNotes: formModel.additionalNotes,
            transportMethodID: formModel.transportMethodID
        };
        return order;
    };
    WorkOrderComponent.prototype.clearOrder = function () {
    };
    return WorkOrderComponent;
}());
WorkOrderComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-work-order',
        template: __webpack_require__("../../../../../src/app/online-orders/work-order/work-order.component.html"),
        styles: [__webpack_require__("../../../../../src/app/online-orders/work-order/work-order.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__lookups_lookups_service__["a" /* LookupsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__lookups_lookups_service__["a" /* LookupsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__work_order_service__["a" /* WorkOrderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__work_order_service__["a" /* WorkOrderService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _c || Object])
], WorkOrderComponent);

var _a, _b, _c;
//# sourceMappingURL=work-order.component.js.map

/***/ }),

/***/ "../../../../../src/app/online-orders/work-order/work-order.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_work_order__ = __webpack_require__("../../../../../src/app/online-orders/work-order/models/work-order.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__employers_employers_service__ = __webpack_require__("../../../../../src/app/employers/employers.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkOrderService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var WorkOrderService = (function () {
    function WorkOrderService(employerService) {
        this.employerService = employerService;
        this.order = new __WEBPACK_IMPORTED_MODULE_1__models_work_order__["a" /* WorkOrder */]();
    }
    WorkOrderService.prototype.loadProfile = function () {
        return this.employerService.getEmployerBySubject();
    };
    WorkOrderService.prototype.create = function (order) {
    };
    WorkOrderService.prototype.save = function (order) {
        this.order = order;
    };
    WorkOrderService.prototype.get = function () {
        return this.order;
    };
    WorkOrderService.prototype.clear = function () {
    };
    WorkOrderService.prototype.delete = function () { };
    return WorkOrderService;
}());
WorkOrderService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__employers_employers_service__["a" /* EmployersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__employers_employers_service__["a" /* EmployersService */]) === "function" && _a || Object])
], WorkOrderService);

var _a;
//# sourceMappingURL=work-order.service.js.map

/***/ }),

/***/ "../../../../../src/app/reports/models/report.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Report; });
/**
 * Created by jcarter on 3/9/17.
 */
var Report = (function () {
    function Report() {
    }
    return Report;
}());

//# sourceMappingURL=report.js.map

/***/ }),

/***/ "../../../../../src/app/reports/models/search-inputs.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchInputs; });
/**
 * Created by jcii on 5/22/17.
 */
var SearchInputs = (function () {
    function SearchInputs() {
    }
    return SearchInputs;
}());

//# sourceMappingURL=search-inputs.js.map

/***/ }),

/***/ "../../../../../src/app/reports/models/search-options.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchOptions; });
var SearchOptions = (function () {
    function SearchOptions() {
    }
    return SearchOptions;
}());

//# sourceMappingURL=search-options.js.map

/***/ }),

/***/ "../../../../../src/app/reports/reports-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reports_component__ = __webpack_require__("../../../../../src/app/reports/reports.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_auth_guard_service__ = __webpack_require__("../../../../../src/app/shared/services/auth-guard.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportsRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var reportsRoutes = [
    {
        path: 'reports',
        component: __WEBPACK_IMPORTED_MODULE_2__reports_component__["b" /* ReportsComponent */],
        canLoad: [__WEBPACK_IMPORTED_MODULE_3__shared_services_auth_guard_service__["a" /* AuthGuardService */]]
    }
];
var ReportsRoutingModule = (function () {
    function ReportsRoutingModule() {
    }
    return ReportsRoutingModule;
}());
ReportsRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(reportsRoutes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_3__shared_services_auth_guard_service__["a" /* AuthGuardService */]
        ]
    })
], ReportsRoutingModule);

//# sourceMappingURL=reports-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/reports/reports.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/reports/reports.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-g\">\r\n  <div class=\"ui-g-12 ui-md-6\">\r\n    <p-dropdown [options]=\"reportsDropDown\" (onChange)=\"getView()\" [(ngModel)]=\"selectedReportID\" [filter]=\"true\" [style]=\"{'width':'20em'}\"></p-dropdown>\r\n    <button pButton type=\"button\" icon=\"ui-icon-sync\" (click)=\"getView()\" iconPos=\"left\"></button>\r\n    <button pButton type=\"button\" icon=\"ui-icon-edit\" (click)=\"displayDialog=true\" iconPos=\"left\"></button>\r\n  </div>\r\n  <div *ngIf=\"inputs.memberNumber === true\" class=\"ui-g-12 ui-md-6\">\r\n    <label for=\"memberNumber\">Membr number</label>\r\n    <input id=\"memberNumber\" type=\"text\" pInputText [(ngModel)]=\"o.memberNumber\" (onBlur)=\"getView()\" dataType=\"number\"/>\r\n  </div>\r\n  <div *ngIf=\"inputs.beginDate === true\" class=\"ui-g-12 ui-md-6 ui-lg-3\">\r\n    <p-calendar  placeholder=\"Start date\" (onSelect)=\"getView()\" (onBlur)=\"getView()\" [(ngModel)]=\"o.beginDate\" [showIcon]=\"true\" dataType=\"string\"></p-calendar>\r\n  </div>\r\n  <div *ngIf=\"inputs.endDate === true\" class=\"ui-g-12 ui-md-6 ui-lg-3\">\r\n    <p-calendar placeholder=\"End date\" (onSelect)=\"getView()\" (onBlur)=\"getView()\" [(ngModel)]=\"o.endDate\" [showIcon]=\"true\" dataType=\"string\"></p-calendar>\r\n  </div>\r\n</div>\r\n<p-dialog header=\"{{title}}\" [(visible)]=\"displayDescription\">\r\n  {{description}}\r\n</p-dialog>\r\n<div>\r\n<p-dataTable\r\n  #dt\r\n  [value]=\"viewData\"\r\n  sortField=\"value\"\r\n  sortOrder=\"-1\"\r\n  sortMode=\"single\"\r\n  [globalFilter]=\"gb\"\r\n  [responsive]=\"true\"\r\n  >\r\n  <p-header>\r\n    <div class=\"ui-helper-clearfix\">\r\n      <button type=\"button\" pButton icon=\"ui-icon-file-download\" iconPos=\"left\" label=\"CSV\" (click)=\"getExport(dt)\" style=\"float:left\"></button>\r\n      <input #gb type=\"text\" placeholder=\"Global search\" width=\"200\">\r\n\r\n      <button pButton type=\"button\" icon=\"ui-icon-help-outline\" (click)=\"showDescription()\" iconPos=\"left\" style=\"float:right\"></button>\r\n    </div>\r\n  </p-header>\r\n  <p-column *ngFor=\"let col of cols\" [field]=\"col.field\" [header]=\"col.header\" [sortable]=\"true\"></p-column>\r\n</p-dataTable>\r\n  <p-dialog\r\n    header=\"Report Details\"\r\n    [(visible)]=\"displayDialog\"\r\n    [responsive]=\"true\"\r\n    showEffect=\"fade\"\r\n    [modal]=\"false\"\r\n    resizable=\"true\"\r\n    width=\"1000\"\r\n  >\r\n    <div>\r\n      <div class=\"ui-g\" style=\"display:flex\">\r\n        <div class=\"ui-sm-4 ui-md-3 ui-lg-3\" style=\"flex: 0\"><label for=\"name\">Name</label></div>\r\n        <div class=\"ui-sm-8 ui-md-9 ui-lg-9\" style=\"flex: 1\"><input pInputText id=\"name\" [(ngModel)]=\"name\" style=\"width: 100%;\"/></div>\r\n      </div>\r\n      <div class=\"ui-g\" style=\"display:flex\">\r\n        <div class=\"ui-sm-4 ui-md-3 ui-lg-3\" style=\"flex: 0\"><label for=\"commonName\">Common name</label></div>\r\n        <div class=\"ui-sm-8 ui-md-9 ui-lg-9\" style=\"flex: 1\"><input pInputText id=\"commonName\" style=\"width: 100%;\" [(ngModel)]=\"selectedReport.commonName\" /></div>\r\n      </div>\r\n      <!--<div class=\"ui-g\">-->\r\n        <!--<div class=\"ui-sm-4 ui-md-3 ui-lg-2\"><label for=\"title\">Title</label></div>-->\r\n        <!--<div class=\"ui-sm-8 ui-md-9 ui-lg-10\"><input pInputText id=\"title\" [(ngModel)]=\"selectedReport.title\" /></div>-->\r\n      <!--</div>-->\r\n      <div class=\"ui-g\">\r\n        <div class=\"ui-sm-4 ui-md-3 ui-lg-3\" style=\"flex: 0\"><label for=\"description\">Description</label></div>\r\n        <div class=\"ui-sm-8 ui-md-9 ui-lg-9\" style=\"flex: 1\"><input pInputText id=\"description\" style=\"width: 100%;\" [(ngModel)]=\"selectedReport.description\" /></div>\r\n      </div>\r\n      <div class=\"ui-g\" style=\"display:flex\">\r\n        <div class=\"ui-sm-4 ui-md-3 ui-lg-3\" style=\"flex: 0\"><label for=\"sqlquery\">SQL Query</label></div>\r\n        <div class=\"ui-sm-8 ui-md-9 ui-lg-9\" style=\"flex: 1\">\r\n              <textarea pInputTextarea id=\"sqlquery\" rows=\"20\" style=\"width: 100%;\" [(ngModel)]=\"selectedReport.sqlquery\" autoResize=\"true\"></textarea>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <p-footer>\r\n      <div class=\"ui-dialog-buttonpane ui-widget-content ui-helper-clearfix\">\r\n        <!--<button type=\"button\" pButton icon=\"fa-close\" (click)=\"delete()\" label=\"Delete\"></button>-->\r\n        <!--<button type=\"button\" pButton icon=\"fa-check\" (click)=\"save()\" label=\"Save\"></button>-->\r\n      </div>\r\n    </p-footer>\r\n  </p-dialog>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/reports/reports.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reports_service__ = __webpack_require__("../../../../../src/app/reports/reports.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_search_options__ = __webpack_require__("../../../../../src/app/reports/models/search-options.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_report__ = __webpack_require__("../../../../../src/app/reports/models/report.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_search_inputs__ = __webpack_require__("../../../../../src/app/reports/models/search-inputs.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ReportsComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MySelectItem; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ReportsComponent = (function () {
    function ReportsComponent(reportsService) {
        this.reportsService = reportsService;
        this.displayDescription = false;
        this.displayDialog = false;
        this.o = new __WEBPACK_IMPORTED_MODULE_2__models_search_options__["a" /* SearchOptions */]();
        this.selectedReport = new __WEBPACK_IMPORTED_MODULE_3__models_report__["a" /* Report */]();
        this.selectedReportID = 'DispatchesByJob';
        // this.title = 'loading';
        // this.description = 'loading...';
        this.o.beginDate = '1/1/2016';
        this.o.endDate = '1/1/2017';
        this.reportsDropDown = [];
        this.reportsDropDown.push({ label: 'Select Report', value: null });
        this.inputs = new __WEBPACK_IMPORTED_MODULE_4__models_search_inputs__["a" /* SearchInputs */]();
    }
    ReportsComponent.prototype.showDescription = function () {
        this.updateDescription();
        this.displayDescription = true;
    };
    ReportsComponent.prototype.updateDescription = function () {
        var _this = this;
        this.selectedReport = this.reportList.filter(function (x) { return x.name === _this.selectedReportID; })[0];
        // TODO catch exception if not found
        this.description = this.selectedReport.description;
        this.title = this.selectedReport.title || this.selectedReport.commonName;
        this.name = this.selectedReport.name;
        this.cols = this.selectedReport.columns.filter(function (a) { return a.visible === true; });
        this.inputs = this.selectedReport.inputs;
    };
    ReportsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.reportsService.getReportList()
            .subscribe(function (listData) {
            _this.reportList = listData;
            _this.reportsDropDown = listData.map(function (r) { return new MySelectItem(r.commonName, r.name); });
            _this.getView();
        }, function (error) { return _this.errorMessage = error; }, function () { return console.log('ngOnInit onCompleted'); });
    };
    ReportsComponent.prototype.getView = function () {
        var _this = this;
        this.reportsService.getReportData(this.selectedReportID.toString(), this.o)
            .subscribe(function (data) {
            _this.viewData = data;
            _this.updateDescription();
        }, function (error) { return _this.errorMessage = error; }, function () { return console.log('getView onCompleted'); });
    };
    // getList() {
    //   this.reportsService.getReportList();
    //   console.log('getList called');
    // }
    ReportsComponent.prototype.getExport = function (dt) {
        dt.exportFilename = this.name + '_' + this.o.beginDate.toString() + '_to_' + this.o.endDate.toString();
        dt.exportCSV();
    };
    return ReportsComponent;
}());
ReportsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-reports',
        template: __webpack_require__("../../../../../src/app/reports/reports.component.html"),
        styles: [__webpack_require__("../../../../../src/app/reports/reports.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_1__reports_service__["a" /* ReportsService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__reports_service__["a" /* ReportsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__reports_service__["a" /* ReportsService */]) === "function" && _a || Object])
], ReportsComponent);

var MySelectItem = (function () {
    function MySelectItem(label, value) {
        this.label = label;
        this.value = value;
    }
    return MySelectItem;
}());

var _a;
//# sourceMappingURL=reports.component.js.map

/***/ }),

/***/ "../../../../../src/app/reports/reports.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reports_component__ = __webpack_require__("../../../../../src/app/reports/reports.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__reports_routing_module__ = __webpack_require__("../../../../../src/app/reports/reports-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_oidc_client__ = __webpack_require__("../../../../oidc-client/lib/oidc-client.min.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_oidc_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_oidc_client__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ReportsModule = (function () {
    function ReportsModule() {
        __WEBPACK_IMPORTED_MODULE_7_oidc_client__["Log"].info('reports.module.ctor called');
    }
    return ReportsModule;
}());
ReportsModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__reports_component__["b" /* ReportsComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["TabViewModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ChartModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["DataTableModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["SharedModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["CalendarModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["e" /* JsonpModule */],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ButtonModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["DropdownModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["DialogModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["InputTextareaModule"],
            __WEBPACK_IMPORTED_MODULE_6__reports_routing_module__["a" /* ReportsRoutingModule */]
        ],
        bootstrap: []
    }),
    __metadata("design:paramtypes", [])
], ReportsModule);

//# sourceMappingURL=reports.module.js.map

/***/ }),

/***/ "../../../../../src/app/reports/reports.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_oidc_client__ = __webpack_require__("../../../../oidc-client/lib/oidc-client.min.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_oidc_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_oidc_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportsService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ReportsService = (function () {
    function ReportsService(http) {
        this.http = http;
    }
    ReportsService.prototype.getReportData = function (reportName, o) {
        // TODO throw exception if report is not populated
        var params = this.encodeData(o);
        var uri = __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].dataUrl + '/api/reports';
        if (reportName) {
            uri = uri + '/' + reportName;
        }
        if (reportName && params) {
            uri = uri + '?' + params;
        }
        __WEBPACK_IMPORTED_MODULE_5_oidc_client__["Log"].info('reportsService.getReportData: ' + uri);
        return this.http.get(uri)
            .map(function (res) { return res['data']; })
            .catch(this.handleError);
    };
    ReportsService.prototype.getReportList = function () {
        var uri = __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].dataUrl + '/api/reports';
        __WEBPACK_IMPORTED_MODULE_5_oidc_client__["Log"].info('reportsService.getReportList: ' + uri);
        return this.http.get(uri)
            .map(function (o) { return o['data']; })
            .catch(this.handleError);
    };
    ReportsService.prototype.handleError = function (error) {
        console.error('ERROR', error);
        return Promise.reject(error.message || error);
    };
    ReportsService.prototype.encodeData = function (data) {
        return Object.keys(data).map(function (key) {
            return [key, data[key]].map(encodeURIComponent).join('=');
        }).join('&');
    };
    return ReportsService;
}());
ReportsService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["c" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["c" /* HttpClient */]) === "function" && _a || Object])
], ReportsService);

var _a;
//# sourceMappingURL=reports.service.js.map

/***/ }),

/***/ "../../../../../src/app/selective-preloading-strategy.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_of__ = __webpack_require__("../../../../rxjs/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectivePreloadingStrategy; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SelectivePreloadingStrategy = (function () {
    function SelectivePreloadingStrategy() {
        this.preloadedModules = [];
    }
    SelectivePreloadingStrategy.prototype.preload = function (route, load) {
        if (route.data && route.data['preload']) {
            // add the route path to the preloaded module array
            this.preloadedModules.push(route.path);
            // log the route path to the console
            console.log('Preloaded: ' + route.path);
            return load();
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(null);
        }
    };
    return SelectivePreloadingStrategy;
}());
SelectivePreloadingStrategy = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])()
], SelectivePreloadingStrategy);

//# sourceMappingURL=selective-preloading-strategy.js.map

/***/ }),

/***/ "../../../../../src/app/shared/handle-error.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HandleError; });
/**
 * Created by jcii on 6/2/17.
 */
var HandleError = (function () {
    function HandleError() {
    }
    HandleError.error = function (error) {
        console.error('ERROR', error);
        return Promise.reject(error.message || error);
    };
    return HandleError;
}());

//# sourceMappingURL=handle-error.js.map

/***/ }),

/***/ "../../../../../src/app/shared/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_auth_guard_service__ = __webpack_require__("../../../../../src/app/shared/services/auth-guard.service.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__("../../../../../src/app/shared/services/auth.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/shared/models/employer.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Employer; });
var Employer = (function () {
    function Employer() {
    }
    return Employer;
}());

//# sourceMappingURL=employer.js.map

/***/ }),

/***/ "../../../../../src/app/shared/services/auth-guard.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__("../../../../../src/app/shared/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_oidc_client__ = __webpack_require__("../../../../oidc-client/lib/oidc-client.min.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_oidc_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_oidc_client__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuardService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthGuardService = (function () {
    function AuthGuardService(authService, router) {
        this.authService = authService;
        this.router = router;
        __WEBPACK_IMPORTED_MODULE_3_oidc_client__["Log"].info('auth-guard.service.ctor called');
    }
    AuthGuardService.prototype.canActivate = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_3_oidc_client__["Log"].info('auth-guard.service.canActivate: called');
        var isLoggedIn = this.authService.isLoggedInObs();
        isLoggedIn.subscribe(function (loggedin) {
            __WEBPACK_IMPORTED_MODULE_3_oidc_client__["Log"].info('auth-guard.service.canActivate isLoggedInObs:' + loggedin);
            if (!loggedin) {
                __WEBPACK_IMPORTED_MODULE_3_oidc_client__["Log"].info('auth-guard.service.canActivate NOT loggedIn: url:' + _this.router.url);
                _this.authService.redirectUrl = _this.router.url;
                _this.router.navigate(['unauthorized']);
            }
        });
        return isLoggedIn;
    };
    return AuthGuardService;
}());
AuthGuardService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _b || Object])
], AuthGuardService);

var _a, _b;
//# sourceMappingURL=auth-guard.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/services/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_oidc_client__ = __webpack_require__("../../../../oidc-client/lib/oidc-client.min.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_oidc_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_oidc_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AuthService = (function () {
    function AuthService(http) {
        var _this = this;
        this.http = http;
        this.mgr = new __WEBPACK_IMPORTED_MODULE_3_oidc_client__["UserManager"](__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].oidc_client_settings);
        this.userLoadededEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.loggedIn = false;
        __WEBPACK_IMPORTED_MODULE_3_oidc_client__["Log"].info('auth.serive.ctor: called');
        this.mgr.getUser()
            .then(function (user) {
            if (user) {
                __WEBPACK_IMPORTED_MODULE_3_oidc_client__["Log"].info('auth.service.getUser.callback user:' + JSON.stringify(user));
                _this.loggedIn = true;
                _this.currentUser = user;
                _this.userLoadededEvent.emit(user);
            }
            else {
                _this.loggedIn = false;
            }
        })
            .catch(function (err) {
            _this.loggedIn = false;
        });
        this.mgr.events.addUserLoaded(function (user) {
            _this.currentUser = user;
            _this.loggedIn = !(user === undefined);
            __WEBPACK_IMPORTED_MODULE_3_oidc_client__["Log"].info('auth.service.ctor.event: addUserLoaded: ', user);
        });
        this.mgr.events.addUserUnloaded(function (e) {
            if (!__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].production) {
                __WEBPACK_IMPORTED_MODULE_3_oidc_client__["Log"].info('auth.service.ctor.event: addUserUnloaded');
            }
            _this.loggedIn = false;
        });
    }
    AuthService.prototype.isLoggedInObs = function () {
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].fromPromise(this.mgr.getUser()).map(function (user) {
            if (user) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    AuthService.prototype.clearState = function () {
        this.mgr.clearStaleState().then(function () {
            __WEBPACK_IMPORTED_MODULE_3_oidc_client__["Log"].info('auth.service.clearStateState success');
        }).catch(function (e) {
            __WEBPACK_IMPORTED_MODULE_3_oidc_client__["Log"].error('auth.service.clearStateState error', e.message);
        });
    };
    AuthService.prototype.getUser = function () {
        var _this = this;
        this.mgr.getUser().then(function (user) {
            _this.currentUser = user;
            __WEBPACK_IMPORTED_MODULE_3_oidc_client__["Log"].info('auth.service.getUser returned: ' + JSON.stringify(user));
            _this.userLoadededEvent.emit(user);
        }).catch(function (err) {
            __WEBPACK_IMPORTED_MODULE_3_oidc_client__["Log"].error('auth.service.getUser returned: ' + JSON.stringify(err));
        });
    };
    AuthService.prototype.removeUser = function () {
        var _this = this;
        this.mgr.removeUser().then(function () {
            _this.userLoadededEvent.emit(null);
            __WEBPACK_IMPORTED_MODULE_3_oidc_client__["Log"].info('auth.service.removeUser: user removed');
        }).catch(function (err) {
            __WEBPACK_IMPORTED_MODULE_3_oidc_client__["Log"].error('auth.service.removeUser returned: ' + JSON.stringify(err));
        });
    };
    AuthService.prototype.startSigninMainWindow = function () {
        this.mgr.signinRedirect({ data: 'some data' }).then(function () {
            console.log('signinRedirect done');
        }).catch(function (err) {
            __WEBPACK_IMPORTED_MODULE_3_oidc_client__["Log"].error('auth.service.startSigninMainWindow returned: ' + JSON.stringify(err));
        });
    };
    AuthService.prototype.endSigninMainWindow = function (url) {
        this.mgr.signinRedirectCallback(url).then(function (user) {
            console.log('signed in', user);
        }).catch(function (err) {
            __WEBPACK_IMPORTED_MODULE_3_oidc_client__["Log"].error('auth.service.endSigninMainWindow returned: ' + JSON.stringify(err));
        });
    };
    AuthService.prototype.startSignoutMainWindow = function () {
        var _this = this;
        this.mgr.getUser().then(function (user) {
            return _this.mgr.signoutRedirect({ id_token_hint: user.id_token }).then(function (resp) {
                console.log('signed out', resp);
                setTimeout(5000, function () {
                    console.log('testing to see if fired...');
                });
            }).catch(function (err) {
                __WEBPACK_IMPORTED_MODULE_3_oidc_client__["Log"].error('auth.service.startSignoutMainWindow returned: ' + JSON.stringify(err));
            });
        });
    };
    ;
    AuthService.prototype.endSignoutMainWindow = function () {
        this.mgr.signoutRedirectCallback().then(function (resp) {
            console.log('signed out', resp);
        }).catch(function (err) {
            __WEBPACK_IMPORTED_MODULE_3_oidc_client__["Log"].error('auth.service.endSignoutMainWindow returned: ' + JSON.stringify(err));
        });
    };
    ;
    AuthService.prototype._setAuthHeaders = function (user) {
        this.authHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        this.authHeaders.append('Authorization', user.token_type + ' ' + user.access_token);
        if (this.authHeaders.get('Content-Type')) {
        }
        else {
            this.authHeaders.append('Content-Type', 'application/json');
        }
    };
    AuthService.prototype._setRequestOptions = function (options) {
        if (this.loggedIn) {
            this._setAuthHeaders(this.currentUser);
        }
        if (options) {
            options.headers.append(this.authHeaders.keys[0], this.authHeaders.values[0]);
        }
        else {
            options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: this.authHeaders });
        }
        return options;
    };
    return AuthService;
}());
AuthService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _a || Object])
], AuthService);

var _a;
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/services/token.interceptor.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_service__ = __webpack_require__("../../../../../src/app/shared/services/auth.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TokenInterceptor; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TokenInterceptor = (function () {
    function TokenInterceptor(auth) {
        this.auth = auth;
    }
    TokenInterceptor.prototype.intercept = function (request, next) {
        request = request.clone({
            setHeaders: {
                Authorization: "Bearer " + this.auth.currentUser.access_token
            }
        });
        return next.handle(request);
    };
    return TokenInterceptor;
}());
TokenInterceptor = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__auth_service__["a" /* AuthService */]) === "function" && _a || Object])
], TokenInterceptor);

var _a;
//# sourceMappingURL=token.interceptor.js.map

/***/ }),

/***/ "../../../../../src/app/work-orders/work-orders-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__work_orders_component__ = __webpack_require__("../../../../../src/app/work-orders/work-orders.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_auth_guard_service__ = __webpack_require__("../../../../../src/app/shared/services/auth-guard.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkOrdersRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var woRoutes = [
    {
        path: 'work-orders',
        component: __WEBPACK_IMPORTED_MODULE_2__work_orders_component__["a" /* WorkOrdersComponent */],
        canLoad: [__WEBPACK_IMPORTED_MODULE_3__shared_services_auth_guard_service__["a" /* AuthGuardService */]]
    }
];
var WorkOrdersRoutingModule = (function () {
    function WorkOrdersRoutingModule() {
    }
    return WorkOrdersRoutingModule;
}());
WorkOrdersRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(woRoutes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_3__shared_services_auth_guard_service__["a" /* AuthGuardService */]
        ]
    })
], WorkOrdersRoutingModule);

//# sourceMappingURL=work-orders-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/work-orders/work-orders.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/work-orders/work-orders.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\r\n  work-orders works!\r\n</p>\r\n<p-dataTable\r\n  #dt\r\n  [value]=\"orders\"\r\n  >\r\n  <p-header>\r\n    \r\n  </p-header>\r\n  <p-column field=\"paperOrderNum\" header=\"Order #\"></p-column>\r\n  <p-column field=\"dateTimeOfWork\" header=\"Time needed\"></p-column>\r\n  <p-column field=\"statusEN\" header=\"Status\"></p-column>\r\n  <p-column field=\"transportMethodEN\" header=\"Trans. method\"></p-column>\r\n  <p-column field=\"\" header=\"Worker count\"></p-column>\r\n  <p-column field=\"contactName\" header=\"Contact name\"></p-column>\r\n  <p-column field=\"address\" header=\"Address\"></p-column>\r\n  <p-column field=\"zipcode\" header=\"Zipcode\"></p-column>\r\n</p-dataTable>"

/***/ }),

/***/ "../../../../../src/app/work-orders/work-orders.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__work_orders_service__ = __webpack_require__("../../../../../src/app/work-orders/work-orders.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkOrdersComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WorkOrdersComponent = (function () {
    function WorkOrdersComponent(workOrderService) {
        this.workOrderService = workOrderService;
    }
    WorkOrdersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.workOrderService.getOrders()
            .subscribe(function (data) {
            _this.orders = data;
        });
    };
    return WorkOrdersComponent;
}());
WorkOrdersComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-work-orders',
        template: __webpack_require__("../../../../../src/app/work-orders/work-orders.component.html"),
        styles: [__webpack_require__("../../../../../src/app/work-orders/work-orders.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_1__work_orders_service__["a" /* WorkOrdersService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__work_orders_service__["a" /* WorkOrdersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__work_orders_service__["a" /* WorkOrdersService */]) === "function" && _a || Object])
], WorkOrdersComponent);

var _a;
//# sourceMappingURL=work-orders.component.js.map

/***/ }),

/***/ "../../../../../src/app/work-orders/work-orders.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__work_orders_component__ = __webpack_require__("../../../../../src/app/work-orders/work-orders.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__work_orders_routing_module__ = __webpack_require__("../../../../../src/app/work-orders/work-orders-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_primeng_primeng__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkOrdersModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var WorkOrdersModule = (function () {
    function WorkOrdersModule() {
    }
    return WorkOrdersModule;
}());
WorkOrdersModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["DataTableModule"],
            __WEBPACK_IMPORTED_MODULE_3__work_orders_routing_module__["a" /* WorkOrdersRoutingModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__work_orders_component__["a" /* WorkOrdersComponent */]]
    })
], WorkOrdersModule);

//# sourceMappingURL=work-orders.module.js.map

/***/ }),

/***/ "../../../../../src/app/work-orders/work-orders.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_handle_error__ = __webpack_require__("../../../../../src/app/shared/handle-error.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkOrdersService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var WorkOrdersService = (function () {
    function WorkOrdersService(http) {
        this.http = http;
    }
    WorkOrdersService.prototype.getOrders = function () {
        var uri = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].dataUrl + '/api/workorders';
        return this.http.get(uri)
            .map(function (o) { return o['data']; })
            .catch(__WEBPACK_IMPORTED_MODULE_3__shared_handle_error__["a" /* HandleError */].error);
    };
    return WorkOrdersService;
}());
WorkOrdersService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpClient */]) === "function" && _a || Object])
], WorkOrdersService);

var _a;
//# sourceMappingURL=work-orders.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true,
    dataUrl: 'https://api.machetessl.org',
    authUrl: 'https://identity.machetessl.org/id',
    oidc_client_settings: {
        authority: 'https://identity.machetessl.org/id',
        client_id: 'machete-ui-cloud-test',
        redirect_uri: 'https://test.machetessl.org/V2/authorize',
        post_logout_redirect_uri: 'https://test.machetessl.org/V2',
        response_type: 'id_token token',
        scope: 'openid email roles api profile',
        silent_redirect_uri: 'https://test.machetessl.org/V2/silent-renew.html',
        automaticSilentRenew: true,
        accessTokenExpiringNotificationTime: 4,
        // silentRequestTimeout:10000,
        filterProtocolClaims: true,
        loadUserInfo: true
    }
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_chart_js_dist_Chart_bundle_min_js__ = __webpack_require__("../../../../chart.js/dist/Chart.bundle.min.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_chart_js_dist_Chart_bundle_min_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_chart_js_dist_Chart_bundle_min_js__);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[1]);
//# sourceMappingURL=main.bundle.js.map