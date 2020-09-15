export class SystemInfo {
  percentMemArray: Array<number>; // used ram
  percentCpuArray: Array<number>; // used cpu
  uptime: string; // the uptime of the system
  totalDisk: number; // total memory
  totalMem: number; // 1, 5 and 15 minutes load average
  lastNetworkStat: NetworkInfo;
  geoHostInfo: GeoHostInfo;
  cpuInfo: string; // describes the CPUs installed
  osInfo: OsInfo;
  homeDir: string;
  hostName: string;
}
