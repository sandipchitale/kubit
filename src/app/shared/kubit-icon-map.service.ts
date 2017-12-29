import { Injectable } from '@angular/core';

const kubitIconMap = {
  'menu' : 'fa-bars',
  'maximizeRestore': 'fa-window-maximize',
  'hide' : 'fa-times',
  'help' : 'fa-info',
  'github' : 'fa-github',
  'search' : 'fa-search',
  'code' : 'fa-code',
  'dashboard' : 'fa-bar-chart',
  'cluster': 'fa-th',
  'namespace': 'fa-tags',
  'node': 'fa-cube',
  'persistentvolume': 'fa-database',
  'secret': 'fa-user-secret',
  'persistentvolumeclaim': 'fa-database',
  'configmap': 'fa-map-o',
  'deployment': 'fa-cloud',
  'replicaset': 'fa-th-large',
  'pod' : 'fa-cubes',
  'endpoint' : 'fa-plug',
  'service': 'fa-cog',
  'ingress': 'fa-link',
  'job': 'fa-cogs',
};

@Injectable()
export class KubitIconMapService {

  constructor() { }

  iconFor(iconicEntity: string): string {
    const icon = kubitIconMap[iconicEntity];
    return icon || 'fa-question';
  }
}
