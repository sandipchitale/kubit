import { Component, OnInit } from "@angular/core";
import { shell } from 'electron';
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  Params,
  PRIMARY_OUTLET
} from "@angular/router";
import "rxjs/add/operator/filter";

import { interpolate } from '../utils/interpolate.js';

const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";
const ROUTE_DATA_ICONIC: string = "iconic";
const ROUTE_DATA_HELP_URL: string = "helpUrl";

interface IBreadcrumb {
  label: string;
  params: Params;
  url: string;
  iconic: string;
  helpUrl: string;
}

@Component({
  selector: 'ku-breadcrumb',
  templateUrl: "./kubit-breadcrumb.component.html",
  styleUrls: ["./kubit-breadcrumb.component.scss"]
})
export class KubitBreadcrumbComponent implements OnInit {
  public breadcrumbs: IBreadcrumb[];

  /**
   * @class DetailComponent
   * @constructor
   */
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.breadcrumbs = [];
  }

  /**
   * Let's go!
   *
   * @class DetailComponent
   * @method ngOnInit
   */
  ngOnInit() {
    //subscribe to the NavigationEnd event
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(event => {
        //set breadcrumbs
        let root: ActivatedRoute = this.activatedRoute.root;
        this.breadcrumbs = this.getBreadcrumbs(root);
      });
  }

  /**
   * Returns array of IBreadcrumb objects that represent the breadcrumb
   *
   * @class DetailComponent
   * @method getBreadcrumbs
   * @param {ActivateRoute} route
   * @param {string} url
   * @param {IBreadcrumb[]} breadcrumbs
   */
  private getBreadcrumbs(
    route: ActivatedRoute,
    url: string = "",
    breadcrumbs: IBreadcrumb[] = []
  ): IBreadcrumb[] {
    //get the child routes
    let children: ActivatedRoute[] = route.children;

    //return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    //iterate over each children
    for (let child of children) {
      //verify primary route
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      //verify the custom data property "breadcrumb" is specified on the route
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      if (!child.snapshot.data[ROUTE_DATA_BREADCRUMB]) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      //get the route's URL segment
      let routeURL: string = child.snapshot.url
        .map(segment => segment.path)
        .join("/");

      //append route URL to URL
      url += `/${routeURL}`;

      let label = child.snapshot.data[ROUTE_DATA_BREADCRUMB];
      if (label) {
        label = interpolate(label, child.snapshot.params, '');
      }
      //add breadcrumb
      let breadcrumb: IBreadcrumb = {
        label: label,
        params: child.snapshot.params,
        url: url,
        iconic: child.snapshot.data[ROUTE_DATA_ICONIC],
        helpUrl: child.snapshot.data[ROUTE_DATA_HELP_URL]
      };
      breadcrumbs.push(breadcrumb);

      //recursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }

  private showHelp(helpUrl: string) {
    if (helpUrl) {
      shell.openExternal(helpUrl);
    }
  }
}
