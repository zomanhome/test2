// TODO: ! need to persist the domain Name in the URL for bookmarking

/*!
 LandingPage
 !*/
angular
  .module("Login", [
    "ngRoute",
    "ui.bootstrap",
    "lc.interceptors",
    "component.lcI18n",
    "component.lcForm",
    "sw.directives",
    "sw.global.login.i18n",
    "sw.global.authentication",
    "sw.password.management",
    "sw.userProfile.management"
  ])
  .config(LandingPageConfig);

LandingPageConfig.$inject = ["$httpProvider"];

function LandingPageConfig($httpProvider) {
  "use strict";
  // Register interceptors
  $httpProvider.interceptors.push("DefaultErrorInterceptor");
}

/*!
 SMC
 !*/
angular
  .module("StealthWatch", [
    "ngCookies",
    "ngRoute",
    "ui.bootstrap",
    "mgcrea.ngStrap.popover",
    "component.lcI18n",
    "sw.global.authentication",
    "sw.global.i18n",
    "smartTable.table",
    "sw.analyze.flows",
    "sw.analyze.proxy",
    "sw.annotate.customApplications",
    "sw.annotate.networkClassification",
    "sw.dashboards.enterprise",
    "sw.deploy.integrations.authenticationServices.activeDirectory",
    "sw.deploy.integrations.pxgrid",
    "sw.deploy.integrations.tetration",
    "sw.deploy.integrations.pcapAppliance",
    "sw.deploy.systemManagement.jobManagement",
    "sw.deploy.systemManagement.softwareManagement",
    "sw.deploy.systemManagement.softwareUpdates",
    "sw.deploy.systemManagement.udpdManagement",
    "sw.deploy.systemManagement.udpdManagement.forwardingRules",
    "sw.detect.alarms",
    "sw.global",
    "sw.global.authorization",
    "sw.global.config",
    "sw.global.system",
    "sw.global.externalLookUp",
    "sw.global.notification",
    "sw.global.session",
    "sw.global.headerNotifications",
    "lc.interceptors",
    "sw.monitor.host",
    "sw.monitor.hosts",
    "sw.monitor.hostGroups",
    "sw.monitor.user",
    "sw.monitor.users",
    "sw.monitor.interfaces",
    "sw.monitor.copyrightInfringement",
    "sw.monitor.hostSearch",
    "sw.monitor.topPeers",
    "sw.deploy.integrations.pcapAppliance.searchResults",
    "sw.topAlarmingHosts",
    "sw.alarmTrendCategory",
    "component.lcPanel",
    "component.lcList",
    "component.lcUtil",
    "component.lcTree",
    "component.lcCharts",
    "component.lcForm",
    "component.lcPill",
    "component.lcContextMenu",
    "sw.feature.toggles",
    "sw.policy.management",
    "sw.policy.management.contextMenu",
    "sw.user.management",
    "sw.host.group.management",
    "sw.host.groups.service",
    "sw.permissions",
    "sw.cloud.dashboard",
    "sw.protected.sessions",
    "kendo.directives"
  ])
  .config(StealthwatchAppConfig);

StealthwatchAppConfig.$inject = [
  "authRouteProvider",
  "$httpProvider",
  "$locationProvider",
  "$qProvider",
  "$routeProvider"
];

function StealthwatchAppConfig(
  authRouteProvider,
  $httpProvider,
  $locationProvider,
  $qProvider,
  $routeProvider
) {
  "use strict";

  $locationProvider.html5Mode(false).hashPrefix("");
  $qProvider.errorOnUnhandledRejections(false);

  function domainResolverFactory() {
    return [
      "DomainResolver",
      function(domainResolver) {
        return domainResolver.initialize();
      }
    ];
  }

  authRouteProvider
    .only()
    .when("/settings", { redirectTo: "/settings/system" })
    .when("/settings/updates", {
      templateUrl: "partials/settings/_software-updates.html",
      controller: "SoftwareUpdatesCtrl",
      resolve: { resolveData: domainResolverFactory() }
    })
    .when("/externallookup", {
      templateUrl: "partials/externalLookUp/_external-look-up.html",
      controller: "externalLookUpController",
      permissions: "externalLookupConfiguration",
      allowFailOver: false,
      resolve: { resolveData: domainResolverFactory() },
      reloadOnSearch: false
    })
    .when("/customapplications", {
      templateUrl: "partials/customapplications/_custom-applications.html",
      controller: "CustomAppCtrl",
      permissions: "applications",
      allowFailOver: false,
      resolve: { resolveData: domainResolverFactory() }
    })
    .when("/anc", {
      templateUrl: "partials/list/_list-view-classification.html",
      controller: "ClassificationListCtrl",
      permissions: "networkClassification",
      allowFailOver: false,
      resolve: { resolveData: domainResolverFactory() }
    })
    .when("/settings/system", {
      templateUrl: "partials/settings/_active-directory.html",
      controller: "ActiveDirectoryCtrl",
      permissions: "activeDirectory",
      allowFailOver: false,
      resolve: { resolveData: domainResolverFactory() }
    })
    .when("/settings/pxgrid", {
      templateUrl: "partials/pxgrid/_pxgrid-config.html",
      controller: "PxGridConfigCtrl",
      controllerAs: "pxGridVm",
      permissions: "ciscoISEConfiguration",
      allowFailOver: false,
      resolve: { resolveData: domainResolverFactory() }
    })
    .when("/settings/tetration", {
      templateUrl: "partials/tetration/_config.html",
      controller: "tetrationConfigsCtrl",
      permissions: "tetrationConfiguration",
      controllerAs: "tetrationVm",
      resolve: { resolveData: domainResolverFactory() }
    })
    .when("/settings/externalLookUp", {
      templateUrl: "partials/externalLookUp/_weblink-config.html",
      controller: "WeblinkConfigCtrl",
      permissions: "externalLookupConfiguration",
      allowFailOver: false,
      resolve: { resolveData: domainResolverFactory() }
    })
    .when("/settings/packetAnalyzer", {
      templateUrl: "partials/pcapAppliance/_pcapAppliance-config.html",
      controller: "PCAPConfigCtrl",
      permissions: "packetAnalyzerConfiguration",
      allowFailOver: false,
      resolve: { resolveData: domainResolverFactory() }
    })
    .when("/settings/systemmanagement", {
      permissions: "centralManagement",
      allowFailOver: false,
      redirectTo: function() {
        window.location.replace("/central-mgmt/#!/update/");
      }
    })
    .when("/settings/udpdconfiguration", {
      templateUrl: "partials/systemManagement/_udpdConfig.html",
      controller: "UdpdConfigurationCtrl",
      permissions: "udpDirectorConfiguration",
      allowFailOver: false,
      resolve: { resolveData: domainResolverFactory() }
    })

    .when("/smc", { redirectTo: "/smc.html#/dashboard" })
    .when("/dashboard", {
      templateUrl: "partials/_dashboard.html",
      controller: "DashboardCtrl",
      resolve: { resolveData: domainResolverFactory() }
    })
    .when("/alarmdashboard", {
      templateUrl: "partials/alarms/_dashboard.html",
      controller: "AlarmDashboardCtrl",
      resolve: { resolveData: domainResolverFactory() },
      reloadOnSearch: false
    })
    .when("/alarmlist", {
      templateUrl: "partials/list/_list-view-alarm.html",
      controller: "AlarmListCtrl",
      resolve: { resolveData: domainResolverFactory() },
      reloadOnSearch: false
    })
    .when("/eventalarmlist", {
      templateUrl: "partials/list/_list-view-alarm.html",
      controller: "EventAlarmListCtrl",
      resolve: { resolveData: domainResolverFactory() },
      reloadOnSearch: false
    })
    .when("/relationshipalarmlist", {
      templateUrl: "partials/list/_list-view-relationship-alarm.html",
      controller: "RelationshipAlarmListCtrl",
      controllerAs: "relationshipAlarmsVm",
      resolve: { resolveData: domainResolverFactory() },
      reloadOnSearch: false
    })
    .when("/hostentity/:ip_address", {
      redirectTo: function(routeParams, path, search) {
        return "/host/" + routeParams.ip_address;
      }
    })
    .when("/host/:ipAddress", {
      templateUrl: "partials/host/_host-report.html",
      controller: "HostReportCtrl",
      controllerAs: "hostReportVm",
      resolve: { resolveData: domainResolverFactory() }
    })
    .when("/hostHistory/:ipAddress", {
      templateUrl: "partials/host/_host-history.html",
      controller: "HostHistoryCtrl",
      controllerAs: "hostHistoryVm",
      resolve: { resolveData: domainResolverFactory() }
    })
    .when("/securityevents/:sourceIpAddress", {
      templateUrl: "partials/list/_list-view-securityevent.html",
      controller: "SecurityEventsListCtrl",
      resolve: { resolveData: domainResolverFactory() },
      reloadOnSearch: false
    })
    .when("/hostlistview", {
      templateUrl: "partials/list/_list-view-host.html",
      controller: "HostListCtrl",
      resolve: { resolveData: domainResolverFactory() },
      reloadOnSearch: false
    })
    .when("/hostgroupsview", {
      templateUrl: "partials/monitor/hostgroups/_host-groups-report.html",
      controller: "HostGroupsReportCtrl",
      resolve: { resolveData: domainResolverFactory() },
      reloadOnSearch: false
    })
    .when("/userentity/:username*", {
      templateUrl: "partials/entity/_entity-view-user.html",
      controller: "UserEntityCtrl",
      permissions: "monitorUsers",
      resolve: { resolveData: domainResolverFactory() }
    })
    .when("/userlistview", {
      templateUrl: "partials/list/_list-view-user.html",
      controller: "UserListCtrl",
      permissions: "monitorUsers",
      resolve: { resolveData: domainResolverFactory() },
      reloadOnSearch: false
    })
    .when("/interfaces", {
      templateUrl: "partials/interfaces/_interfaces-monitor.html",
      controller: "InterfacesMonitorCtrl",
      permissions: "monitorInterfaces",
      resolve: { resolveData: domainResolverFactory() }
    })
    .when("/hostsearch", {
      templateUrl: "partials/hostSearch/_hostSearch.html",
      controller: "HostSearchCtrl",
      permissions: "hostSearch",
      resolve: { resolveData: domainResolverFactory() }
    })

    .when("/topPeers/:searchId/:jobId", {
      templateUrl: "partials/topPeers/_topPeers.html",
      controller: "TopPeersCtrl",
      resolve: { resolveData: domainResolverFactory() }
    })
    .when("/alarminghosts", {
      templateUrl: "partials/list/_list-view-host.html",
      controller: "AlarmingHostsCtrl",
      resolve: { resolveData: domainResolverFactory() },
      reloadOnSearch: false
    })
    .when("/jobmanagement", {
      templateUrl: "partials/jobmanagement/_jobmanagement.html",
      controller: "JobListCtrl",
      permissions: "jobManagement",
      resolve: { resolveData: domainResolverFactory() }
    })
    .when("/flowAnalysis", { redirectTo: "flowAnalysis/search" })
    .when("/flowAnalysis/search", {
      templateUrl: "partials/flowanalysis/_flow-search.html",
      controller: "FlowSearchController",
      controllerAs: "flowSearchVm",
      permissions: "flowSearch",
      resolve: { resolveData: domainResolverFactory() },
      reloadOnSearch: false
    })
    .when("/flowAnalysis/queries", {
      templateUrl: "partials/flowanalysis/_flow-queries.html",
      controller: "FlowQueryListCtrl",
      permissions: "saveSearch",
      resolve: {
        resolveDomain: domainResolverFactory(),
        resolvedSession: [
          "SessionResolver",
          function(SessionResolver) {
            return SessionResolver();
          }
        ]
      },
      reloadOnSearch: false
    })
    .when("/flowAnalysis/results/:queryId/:resultsId", {
      templateUrl: "partials/flowanalysis/_flow-results.html",
      controller: "FlowResultsController",
      controllerAs: "flowResultsVm",
      resolve: { resolveData: domainResolverFactory() },
      reloadOnSearch: false
    })
    .when("/flowAnalysis/results/:queryId/:resultsId/:searchType", {
      templateUrl: "partials/flowanalysis/_flow-results.html",
      controller: "FlowResultsController",
      controllerAs: "flowResultsVm",
      resolve: { resolveData: domainResolverFactory() },
      reloadOnSearch: false
    })
    .when("/flowAnalysis/simpleresults/:queryId/:resultsId", {
      templateUrl: "partials/flowanalysis/_flow-results.html",
      controller: "FlowResultsController",
      controllerAs: "flowResultsVm",
      resolve: { resolveData: domainResolverFactory() },
      reloadOnSearch: false
    })
    .when("/flowAnalysis/results", {
      templateUrl: "partials/flowanalysis/_flow-saved-results.html",
      controller: "FlowResultListCtrl",
      permissions: "saveResults",
      resolve: { resolveData: domainResolverFactory() },
      reloadOnSearch: false
    })
    .when("/packetQuery", {
      templateUrl: "partials/pcapAppliance/_pcap-filter-criteria.html",
      controller: "CreatePacketSearchJobCtrl",
      permissions: "packetAnalyzerConfiguration",
      allowFailOver: false,
      resolve: { resolveData: domainResolverFactory() },
      reloadOnSearch: false
    })
    .when("/flowproxy", {
      templateUrl: "partials/analyze/proxy/_flow-proxy-records.html",
      controller: "FlowProxyRecordsCtrl",
      resolve: { resolveData: domainResolverFactory() },
      reloadOnSearch: false
    })
    .when("/copyrightInfringement", {
      templateUrl:
        "partials/analyze/copyrightInfringement/_copyrightInfringement.html",
      controller: "CopyrightInfringementCtrl",
      permissions: "copyrightInfringement",
      resolve: { resolveData: domainResolverFactory() }
    })
    .when("/searchResults/:searchId/:jobId", {
      templateUrl:
        "partials/pcapAppliance/searchResults/_packet_analyzer_search_results.html",
      controller: "SearchResultsCtrl",
      permissions: "packetAnalyzerConfiguration",
      allowFailOver: false,
      resolve: { resolveData: domainResolverFactory() }
    })
    .when("/forwardingRules/:ipAddress/:id", {
      templateUrl: "partials/systemManagement/_udpdForwardingRules.html",
      controller: "ForwardingRulesCtrl",
      permissions: "udpDirectorConfiguration",
      allowFailOver: false,
      resolve: { resolveData: domainResolverFactory() }
    })
    .when("/noDomainAccess", {
      templateUrl: "partials/global/_no-domain-access.html",
      controller: "domainAccessCtrl",
      resolve: { resolveData: domainResolverFactory() }
    })
    .otherwise({ redirectTo: $routeProvider });

  // Register interceptors
  $httpProvider.interceptors.push("DefaultErrorInterceptor");

  //Removing this as it was causing issues with templates and http requests to cancel out with status -1
  //$httpProvider.interceptors.push('ProcessingIndicatorInterceptor');
}
