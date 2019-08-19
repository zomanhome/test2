describe("Session Limits List Api", function() {
  var service, httpBackend, log, rootScope;

  var backendData = [{ id: 0, sessionLimit: 1 }, { id: 1, sessionLimit: 2 }];

  beforeEach(module("sw.user.management"));

  beforeEach(inject(function(
    sessionLimitsListApi,
    $httpBackend,
    $log,
    $rootScope
  ) {
    service = sessionLimitsListApi;
    httpBackend = $httpBackend;
    rootScope = $rootScope;

    log = $log;

    httpBackend.whenGET("/smc/rest/user/context/permissions").respond(200);
    httpBackend.whenGET("/smc/rest/session").respond(200);
  }));

  it("verify the service is exists", function() {
    expect(service).toBeDefined();
  });

  describe("getAllSessionLimits method", function() {
    it("should be able to get data success", function() {
      var config = { data: backendData };
      httpBackend
        .whenGET("/smc-users/rest/v1/roles/sessionLimit")
        .respond(config);
      var resolveSpy = jasmine.createSpy("resolve");
      service.getAllSessionLimits().then(resolveSpy, undefined);
      httpBackend.flush();

      rootScope.$digest();
      expect(resolveSpy).toHaveBeenCalledWith(jasmine.objectContaining(config));
    });

    it("should be able to get data failure", function() {
      httpBackend
        .expectGET("/smc-users/rest/v1/roles/sessionLimit")
        .respond(500);
      var rejectSpy = jasmine.createSpy("reject");

      service.getAllSessionLimits().then(undefined, rejectSpy);
      httpBackend.flush();

      rootScope.$digest();
      expect(rejectSpy).toHaveBeenCalled();
    });
  });

  describe("updateSessionLimits method", function() {
    it("should be able to update data success", function() {
      var config = { data: backendData };
      httpBackend
        .whenPUT("/smc-users/rest/v1/roles/sessionLimit")
        .respond(config);
      var resolveSpy = jasmine.createSpy("resolve");
      service.updateSessionLimits().then(resolveSpy, undefined);
      httpBackend.flush();

      rootScope.$digest();
      expect(resolveSpy).toHaveBeenCalledWith(jasmine.objectContaining(config));
    });

    it("should be able to update data failure", function() {
      httpBackend
        .expectPUT("/smc-users/rest/v1/roles/sessionLimit")
        .respond(500);
      var rejectSpy = jasmine.createSpy("reject");

      service.updateSessionLimits().then(undefined, rejectSpy);
      httpBackend.flush();

      rootScope.$digest();
      expect(rejectSpy).toHaveBeenCalled();
    });
  });
});
