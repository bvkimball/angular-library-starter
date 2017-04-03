import { AfterContentInit, Component, Inject } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';

import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ng2-page-scroll';
import { DOCUMENT } from '@angular/platform-browser';
PageScrollConfig.defaultDuration = 11;
PageScrollConfig.defaultScrollOffset = 70;

@Component({
    selector: 'app-demo',
    templateUrl: './app.component.html'
})
export class AppComponent implements AfterContentInit {

    public constructor(private route: ActivatedRoute, private router: Router, private pageScrollService: PageScrollService,
        @Inject(DOCUMENT) private document: any) {
    }

    // almost same logic exists in top-menu component
    public ngAfterContentInit(): any {
        const getUrl = (router: Router) => router.routerState.snapshot.url.slice(0, router.routerState.snapshot.url.indexOf('#'));
        let _prev = getUrl(this.router);
        const justDoIt = (event: any): void => {
            if (!(event instanceof NavigationEnd)) {
                return;
            }

            const _cur = getUrl(this.router);
            if (typeof PR !== 'undefined' && _prev !== _cur) {
                _prev = _cur;
                // google code-prettify
                PR.prettyPrint();
            }

            const hash = this.route.snapshot.fragment;
            if (hash) {
                const pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleDirectionInstance(this.document, `#${hash}`, true);
                this.pageScrollService.start(pageScrollInstance);
            }
        };

        this.router.events.subscribe((event: any) => setTimeout(() => justDoIt(event), 50));
    }
}
