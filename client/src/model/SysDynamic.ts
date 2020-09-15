export class SysDynamic {
  disk: {
    percent: number
    free: number
    used: number
  };
  cpu: {
    percent: number,
    temperature: number,
    currentSpeed: number
  };
  mem: {
    percent: number
    free: number,
    used: number,
  };
}
