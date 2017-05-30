/**
 * Created by cghislai on 5/22/17.
 */

export interface EndPointJson {
  Spec: { Mode: string },
  VirtualIPs: { NetworkID: string, Addr: string }[]
}
