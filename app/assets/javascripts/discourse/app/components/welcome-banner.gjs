import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { service } from "@ember/service";
import { htmlSafe } from "@ember/template";
import { modifier } from "ember-modifier";
import DButton from "discourse/components/d-button";
import PluginOutlet from "discourse/components/plugin-outlet";
import SearchMenu, { focusSearchInput } from "discourse/components/search-menu";
import bodyClass from "discourse/helpers/body-class";
import { prioritizeNameFallback } from "discourse/lib/settings";
import { applyValueTransformer } from "discourse/lib/transformer";
import { i18n } from "discourse-i18n";

export default class WelcomeBanner extends Component {
  @service router;
  @service siteSettings;
  @service currentUser;
  @service appEvents;
  @service search;

  @tracked inViewport = true;

  checkViewport = modifier((element) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        this.search.welcomeBannerSearchInViewport = entry.isIntersecting;
      },
      { threshold: 1.0 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  });

  handleKeyboardShortcut = modifier(() => {
    const cb = (appEvent) => {
      if (
        (appEvent.type === "search" || appEvent.type === "page-search") &&
        this.search.welcomeBannerSearchInViewport
      ) {
        focusSearchInput("welcome-banner-search-term");
        appEvent.event.preventDefault();
      }
    };
    this.appEvents.on("header:keyboard-trigger", cb);
    return () => this.appEvents.off("header:keyboard-trigger", cb);
  });

  get displayForRoute() {
    return this.siteSettings.top_menu
      .split("|")
      .any(
        (menuItem) => `discovery.${menuItem}` === this.router.currentRouteName
      );
  }

  get headerText() {
    if (!this.currentUser) {
      return i18n("welcome_banner.header.anonymous_members", {
        site_name: this.siteSettings.title,
      });
    }

    return i18n("welcome_banner.header.logged_in_members", {
      preferred_display_name: prioritizeNameFallback(
        this.currentUser.name,
        this.currentUser.username
      ),
    });
  }

  get shouldDisplay() {
    const enabled = applyValueTransformer(
      "site-setting-enable-welcome-banner",
      this.siteSettings.enable_welcome_banner
    );

    if (!enabled) {
      return false;
    }

    return this.displayForRoute;
  }

  <template>
    {{#if this.shouldDisplay}}
      {{#if this.search.welcomeBannerSearchInViewport}}
        {{bodyClass "welcome-banner--visible"}}
      {{/if}}

      <div
        class="welcome-banner"
        {{this.checkViewport}}
        {{this.handleKeyboardShortcut}}
      >
        <div class="custom-search-banner welcome-banner__inner-wrapper">
          <div class="custom-search-banner-wrap welcome-banner__wrap">
            <h1 class="welcome-banner__title">{{htmlSafe this.headerText}}</h1>
            <PluginOutlet @name="welcome-banner-below-headline" />
            <div class="search-menu welcome-banner__search-menu">
              <DButton
                @icon="magnifying-glass"
                @title="search.open_advanced"
                @href="/search?expanded=true"
                class="search-icon"
              />
              <SearchMenu
                @location="welcome-banner"
                @searchInputId="welcome-banner-search-term"
              />
            </div>
            <PluginOutlet @name="welcome-banner-below-input" />
          </div>
        </div>
      </div>
    {{/if}}
  </template>
}
