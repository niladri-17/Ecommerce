declare global {
  var rootPath: string;
  var appRoot: string;
  namespace Express {
    export interface Request {
      ip: string;
      user?: {
        id: string;
      };
      //will not be there if you skip isAuthorize()
      //   scope?: (typeof constants.SCOPES)[number]
    }
  }
}
