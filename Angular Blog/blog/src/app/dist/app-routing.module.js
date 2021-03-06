"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var not_found_component_1 = require("./not-found/not-found.component");
var article_list_component_1 = require("./article-list/article-list.component");
var about_component_1 = require("./about/about.component");
var profile_component_1 = require("./profile/profile.component");
var new_article_component_1 = require("./new-article/new-article.component");
var routes = [
    { path: '', component: article_list_component_1.ArticleListComponent },
    { path: 'profile', component: profile_component_1.ProfileComponent },
    { path: 'about', component: about_component_1.AboutComponent },
    { path: 'articles', component: article_list_component_1.ArticleListComponent },
    { path: 'article/new', component: new_article_component_1.NewArticleComponent, pathMatch: 'full' },
    { path: '**', component: not_found_component_1.NotFoundComponent }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
