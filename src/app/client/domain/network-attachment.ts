/**
 * Created by cghislai on 5/23/17.
 */

export interface NetworkAttachmentJson {
  Network: {
    ID: string;
    Version: {
      Index: number
    };
    CreatedAt: string;
    UpdatedAt: string;
    Spec: {
      Name: string;
      Labels: { [key: string]: string };
      DriverConfiguration: any,
      IPAMOptions: {
        Driver: any,
        Configs: { Subnet: string, Gateway: string }[];
      }
    },
    DriverState: {
      Name: string;
      Options: { [key: string]: string };
    },
    IPAMOptions: {
      Driver: {
        Name: string;
      },
      Configs: { Subnet: string, Gateway: string }[];
    }
  };
  Addresses: string[];
}
