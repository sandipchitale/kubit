import { Injectable } from '@angular/core';

import * as electron from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import * as k8s from 'k8s';
import * as jsyaml from 'js-yaml';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { calcBindingFlags } from '@angular/core/src/view/util';

@Injectable()
export class KubitService {
  readonly kubeConfigFile = path.join(os.homedir(), '.kube', 'config');
  kubeConfig: any = {};
  namespace: any;

  namespaceSubject = new Subject<any>();

  kubeApi: any;
  kubeApiBatch: any;
  kubeApiBeta: any;

  connected = false;

  constructor() {
    this.kubeConfig = this.getKubeConfig();
  }

  getKubeConfig() {
    var config = jsyaml.safeLoad(fs.readFileSync(this.kubeConfigFile));
    return config || {};
  }

  getContexts() {
    return this.kubeConfig.contexts;
  }

  getCurrentContextName(): string {
    return this.kubeConfig['current-context'];
  }

  getCurrentContext() {
    const currentContextName = this.getCurrentContextName();
    return this.kubeConfig.contexts.find(aContext => {
      return aContext.name === currentContextName;
    });
  }

  getClusters() {
    return this.kubeConfig.clusters;
  }

  getCurrentCluster() {
    const currentContext = this.getCurrentContext();
    return this.kubeConfig.clusters.find(aCluster => {
      return aCluster.name === currentContext.context.cluster;
    });
  }

  get namespaceObservable() : Observable<any> {
    return this.namespaceSubject;
  }

  getCurrentNamespace() {
    return this.namespace;
  }

  setCurrentNamespace(namespace) {
    this.namespace = namespace;
    this.namespaceSubject.next(namespace);
  }

  setCurrentContext(context) {
    this.kubeConfig['current-context'] = context;
    fs.writeFileSync(this.kubeConfigFile, jsyaml.safeDump(this.kubeConfig));
  }

  connect(contextName, connectedCallback) {
    this.kubeConfig = this.getKubeConfig();
    const connectConfig: any = {
      auth: {}
    };
    const foundContext = this.kubeConfig.contexts.find(function(aContext) {
      return aContext.name === contextName;
    });
    if (!foundContext) throw new Error('Cannot find context' + contextName);
    const contextClusterName = foundContext.context.cluster;
    const contextUser = foundContext.context.user;
    const contextCluster = this.kubeConfig.clusters.find(function(aCluster) {
      return aCluster.name === contextClusterName;
    });
    if (contextCluster) {
      connectConfig.endpoint = contextCluster.cluster.server;
      const cad = contextCluster.cluster['certificate-authority-data'];
      if (cad) {
        connectConfig.auth.caCert = Buffer.from(cad, 'base64').toString('ascii');
      }
      const ca = contextCluster.cluster['certificate-authority'];
      if (ca) {
        connectConfig.auth.caCert = fs.readFileSync(ca);
      }
    }
    const user = this.kubeConfig.users.find(function(e) {
      return e.name === contextUser;
    });
    if (user) {
      const ccd = user.user['client-certificate-data'];
      if (ccd) {
        connectConfig.auth.clientCert = Buffer.from(ccd, 'base64').toString('ascii');
      }
      const cc = user.user['client-certificate'];
      if (cc) {
        connectConfig.auth.clientCert = fs.readFileSync(cc);
      }
      const ckd = user.user['client-key-data'];
      if (ckd) {
        connectConfig.auth.clientKey = Buffer.from(ckd, 'base64').toString('ascii');
      }
      const ck = user.user['client-key'];
      if (ck) {
        connectConfig.auth.clientKey = fs.readFileSync(ck);
      }
      const ut = user.user.token;
      if (ut) {
        connectConfig.auth.token = ut;
      }
      const uun = user.user.username;
      if (uun) {
        connectConfig.auth.username = uun;
      }
      const upw = user.user.password;
      if (upw) {
        connectConfig.auth.password = upw;
      }
      const ap = user.user['auth-provider'];
      if (ap && ap.config && ap.config['access-token']) {
        connectConfig.strictSSL = false;
        connectConfig.auth.token = ap.config['access-token'];
      }
    }
    connectConfig.version = '/api/v1';
    this.kubeApi = k8s.api(connectConfig);
    connectConfig.version = '/apis/batch/v1';
    this.kubeApiBatch = k8s.api(connectConfig);
    connectConfig.version = '/apis/extensions/v1beta1';
    this.kubeApiBeta = k8s.api(connectConfig);
    this.checkConnected(connectedCallback);
  }

  checkConnected(connectedCallback) {
    this.kubeApi.get(
      'componentstatuses',
      (e) => {
        connectedCallback && connectedCallback(true);
        this.connected = true;
      },
      (e) => {
        connectedCallback && connectedCallback(false);
        this.connected = false;
      },
      100
    );
  }

  isConnected(): boolean {
    // TODO
    return true;
  }

  getApiByKind(apiName) {
    if ('jobs' == apiName) {
      return this.kubeApiBatch;
    }
    return 'deployments' == apiName ||
      'replicasets' == apiName ||
      'daemonsets' == apiName ||
      'horizontalpodautoscalers' == apiName ||
      'ingresses' == apiName
      ? this.kubeApiBeta
      : this.kubeApi;
  }
}
